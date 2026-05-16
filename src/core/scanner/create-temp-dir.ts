// src/core/scanner/create-temp-dir.ts
import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

export async function createTempDir() {
  const id = crypto.randomUUID();

  const dir = path.join(process.cwd(), "temp", id);

  await fs.mkdir(dir, { recursive: true });

  return dir;
}
