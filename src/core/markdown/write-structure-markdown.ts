// src/core/markdown/write-structure-markdown.ts
import fs from "node:fs/promises";
import path from "node:path";

export async function writeStructureMarkdown(outputDir: string, tree: string) {
  const markdown = `# Estrutura do Projeto

\`\`\`txt
${tree}
\`\`\`
`;

  await fs.writeFile(path.join(outputDir, "structure.md"), markdown);
}
