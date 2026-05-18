// src/core/output/read-output-files.ts
import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

import type { GeneratedFile } from "../storage/types";

export async function readOutputFiles(
  outputDir: string,
): Promise<GeneratedFile[]> {
  const files = await fs.readdir(outputDir);

  const markdownFiles = files.filter((file) => file.endsWith(".md"));

  return Promise.all(
    markdownFiles.map(async (file) => {
      const content = await fs.readFile(path.join(outputDir, file), "utf-8");

      return {
        id: crypto.randomUUID(),
        name: file,
        content,
      };
    }),
  );
}
