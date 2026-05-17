// src/core/tree/generate-tree.ts
export function generateTree(paths: string[]) {
  const tree: string[] = [];

  for (const filePath of paths.sort()) {
    const depth = filePath.split("/").length - 1;

    const indent = "  ".repeat(depth);

    tree.push(`${indent}├── ${filePath.split("/").pop()}`);
  }

  return tree.join("\n");
}
