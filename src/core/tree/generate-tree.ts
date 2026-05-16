// src/core/tree/generate-tree.ts
// melhorar depois para gerar uma árvore de diretórios, não apenas uma lista ordenada de caminhos
export function generateTree(paths: string[]) {
  return paths.sort().join("\n");
}
