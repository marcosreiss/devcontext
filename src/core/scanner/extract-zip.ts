// src/core/scanner/extract-zip.ts
import AdmZip from "adm-zip";

export async function extractZip(zipPath: string, outputPath: string) {
  const zip = new AdmZip(zipPath);

  zip.extractAllTo(outputPath, true);
}
