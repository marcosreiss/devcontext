// src/core/templates/base-template.ts
export function generateBaseContext(projectName: string) {
  return `# ${projectName}

## Projeto gerado pelo DevContext

Esta documentação contém:

- Estrutura do projeto
- Arquivos agrupados
- Contexto para IA
`;
}
