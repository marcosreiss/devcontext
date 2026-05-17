// src/core/markdown/generate-file-section.ts
import fs from "node:fs/promises";
import path from "node:path";

const LANGUAGE_MAP: Record<string, string> = {
  ".ts": "ts",
  ".tsx": "tsx",
  ".js": "js",
  ".jsx": "jsx",
  ".json": "json",
  ".css": "css",
  ".html": "html",
  ".md": "md",
};

export async function generateFileSection(
  absolutePath: string,
  relativePath: string,
) {
  try {
    const content = await fs.readFile(absolutePath, "utf-8");

    const extension = path.extname(relativePath);

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
