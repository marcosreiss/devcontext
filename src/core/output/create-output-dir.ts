// src/core/output/create-output-dir.ts
import fs from "node:fs/promises";
import path from "node:path";

export async function createOutputDir(basePath: string) {
  const outputDir = path.join(basePath, "output");

  await fs.mkdir(outputDir, {
    recursive: true,
  });

  return outputDir;
}
