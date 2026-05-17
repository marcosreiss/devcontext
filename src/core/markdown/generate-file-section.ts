// src/core/markdown/generate-file-section.ts
import fs from "node:fs/promises";
import path from "node:path";

import { TEXT_FILE_EXTENSIONS } from "../constants/text-extensions";
import { MAX_FILE_SIZE_BYTES } from "../constants/limits";

const LANGUAGE_MAP: Record<string, string> = {
  ".ts": "ts",
  ".tsx": "tsx",
  ".js": "js",
  ".jsx": "jsx",
  ".json": "json",
  ".css": "css",
  ".html": "html",
  ".md": "md",
  ".java": "java",
  ".xml": "xml",
  ".sql": "sql",
};

export async function generateFileSection(
  absolutePath: string,
  relativePath: string,
) {
  try {
    const extension = path.extname(relativePath);

    const isTextFile = TEXT_FILE_EXTENSIONS.includes(extension);

    if (!isTextFile) {
      return `
## ${relativePath}

[binary file ignored]

`;
    }

    const stats = await fs.stat(absolutePath);

    if (stats.size > MAX_FILE_SIZE_BYTES) {
      return `
## ${relativePath}

[file too large ignored]

`;
    }

    const content = await fs.readFile(absolutePath, "utf-8");

    const lang = LANGUAGE_MAP[extension] || "txt";

    return `
## ${relativePath}

Path:
\`${relativePath}\`

\`\`\`${lang}
${content}
\`\`\`

`;
  } catch {
    return "";
  }
}
