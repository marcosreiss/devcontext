// src/core/output/zip-output.ts
import fs from "node:fs";
import archiver from "archiver";

export async function zipOutput(sourceDir: string, outPath: string) {
  return new Promise<void>((resolve, reject) => {
    const output = fs.createWriteStream(outPath);

    const archive = archiver("zip", {
      zlib: { level: 9 },
    });

    output.on("close", () => resolve());

    output.on("error", reject);

    archive.on("error", reject);

    archive.pipe(output);

    archive.directory(sourceDir, false);

    archive.finalize();
  });
}
