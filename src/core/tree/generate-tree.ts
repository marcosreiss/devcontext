// src/core/tree/generate-tree.ts
export function generateTree(paths: string[]) {
  const lines: string[] = [];

  const sorted = [...paths].sort();

  for (const path of sorted) {
    const parts = path.split("/");

    const depth = parts.length - 1;

    const indent = "│   ".repeat(depth);

    lines.push(`${indent}├── ${parts.at(-1)}`);
  }

  return lines.join("\n");
}
