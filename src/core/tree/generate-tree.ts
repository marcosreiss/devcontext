// src/core/tree/generate-tree.ts
interface TreeNode {
  name: string;

  children: Map<string, TreeNode>;

  isFile: boolean;
}

function createNode(name: string, isFile = false): TreeNode {
  return {
    name,
    children: new Map(),
    isFile,
  };
}

function insertPath(root: TreeNode, filePath: string) {
  const normalized = filePath.replaceAll("\\", "/");

  const parts = normalized.split("/");

  let current = root;

  parts.forEach((part, index) => {
    const isFile = index === parts.length - 1;

    if (!current.children.has(part)) {
      current.children.set(part, createNode(part, isFile));
    }

    const next = current.children.get(part);

    if (!next) {
      return;
    }

    current = next;
  });
}

function renderTree(node: TreeNode, prefix = ""): string[] {
  const lines: string[] = [];

  const children = Array.from(node.children.values()).sort((a, b) => {
    if (a.isFile === b.isFile) {
      return a.name.localeCompare(b.name);
    }

    return a.isFile ? 1 : -1;
  });

  children.forEach((child, index) => {
    const isLast = index === children.length - 1;

    const connector = isLast ? "└── " : "├── ";

    lines.push(`${prefix}${connector}${child.name}`);

    const nextPrefix = isLast ? `${prefix}    ` : `${prefix}│   `;

    lines.push(...renderTree(child, nextPrefix));
  });

  return lines;
}

export function generateTree(paths: string[]) {
  const root = createNode("root");

  for (const path of paths) {
    insertPath(root, path);
  }

  return renderTree(root).join("\n");
}
