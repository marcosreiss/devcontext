// src/core/markdown/generate-folder-markdowns.ts
import fs from "node:fs/promises";
import path from "node:path";

import type { ProjectFile } from "../types/project-file";
import { generateFileSection } from "./generate-file-section";

export async function generateFolderMarkdowns(
  files: ProjectFile[],
  outputDir: string,
) {
  const grouped = new Map<string, ProjectFile[]>();

  for (const file of files) {
    const folder = path.dirname(file.relativePath);

    if (!grouped.has(folder)) {
      grouped.set(folder, []);
    }

    grouped.get(folder)?.push(file);
  }

  for (const [folder, folderFiles] of grouped) {
    let markdown = `# ${folder}\n\n`;

    for (const file of folderFiles) {
      markdown += await generateFileSection(
        file.absolutePath,
        file.relativePath,
      );
    }

    const safeName =
      folder.replaceAll("\\", "_").replaceAll("/", "_").replaceAll(":", "") ||
      "root";

    const outputFile = path.join(outputDir, `${safeName}.md`);

    await fs.writeFile(outputFile, markdown);
  }
}
