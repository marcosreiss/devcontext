// src/core/cleanup/remove-temp-dir.ts
import fs from "node:fs/promises";

export async function removeTempDir(dir: string) {
  try {
    await fs.rm(dir, {
      recursive: true,
      force: true,
    });
  } catch {
    //
  }
}
