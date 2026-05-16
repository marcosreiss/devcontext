// src/app/api/upload/route.ts
import fs from "node:fs/promises";
import path from "node:path";

import { createTempDir } from "@/core/scanner/create-temp-dir";
import { extractZip } from "@/core/scanner/extract-zip";
import { getProjectFiles } from "@/core/scanner/get-project-files";

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

    return Response.json({
      success: true,
      totalFiles: files.length,
      files,
    });
  } catch (error) {
    console.error(error);

    return Response.json({ error: "Erro interno" }, { status: 500 });
  }
}
