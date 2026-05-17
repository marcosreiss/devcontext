// src/app/api/upload/route.ts
import fs from "node:fs/promises";
import path from "node:path";

import { createTempDir } from "@/core/scanner/create-temp-dir";
import { extractZip } from "@/core/scanner/extract-zip";
import { getProjectFiles } from "@/core/scanner/get-project-files";

import { generateTree } from "@/core/tree/generate-tree";

import { createOutputDir } from "@/core/output/create-output-dir";

import { writeStructureMarkdown } from "@/core/markdown/write-structure-markdown";

import { generateFolderMarkdowns } from "@/core/markdown/generate-folder-markdowns";

import { zipOutput } from "@/core/output/zip-output";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file");

    if (!(file instanceof File)) {
      return Response.json({ error: "Arquivo inválido" }, { status: 400 });
    }

    const tempDir = await createTempDir();

    const zipPath = path.join(tempDir, file.name);

    const buffer = Buffer.from(await file.arrayBuffer());

    await fs.writeFile(zipPath, buffer);

    const extractedPath = path.join(tempDir, "project");

    await fs.mkdir(extractedPath);

    await extractZip(zipPath, extractedPath);

    const files = await getProjectFiles(extractedPath);

    const tree = generateTree(files.map((f) => f.relativePath));

    const outputDir = await createOutputDir(tempDir);

    await writeStructureMarkdown(outputDir, tree);

    await generateFolderMarkdowns(files, outputDir);

    const finalZip = path.join(tempDir, "devcontext-output.zip");

    await zipOutput(outputDir, finalZip);

    const zipBuffer = await fs.readFile(finalZip);

    return new Response(zipBuffer, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": 'attachment; filename="devcontext-output.zip"',
      },
    });
  } catch (error) {
    console.error(error);

    return Response.json({ error: "Erro interno" }, { status: 500 });
  }
}
