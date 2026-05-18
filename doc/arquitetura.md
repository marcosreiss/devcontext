# DevContext — Documentação da Arquitetura

## Visão Geral

O DevContext é uma aplicação construída com Next.js focada na geração automática de documentação de contexto para projetos de software.

O objetivo principal é transformar projetos compactados (`.zip`) em uma documentação estruturada e amigável para consumo por IAs como:

- OpenAI ChatGPT
- Anthropic Claude
- Cursor Cursor

O sistema atualmente:

- recebe um projeto `.zip`
- extrai os arquivos
- filtra arquivos inválidos/binários
- gera árvore do projeto
- gera markdowns organizados
- disponibiliza preview web
- permite download individual ou compactado

---

# Stack Principal

## Frontend

- React 19
- Next.js 16 App Router
- TailwindCSS 4

## Backend

- Route Handlers do Next.js
- Node.js APIs (`fs`, `path`, etc.)

## Processamento

- `fast-glob`
- `adm-zip`
- `archiver`
- `ignore`

## Renderização

- `react-markdown`
- `react-syntax-highlighter`

---

# Estrutura Geral

```
src/
├── app/
├── components/
├── core/
```

A arquitetura foi separada em:

- camada de UI
- camada HTTP/API
- camada de domínio/processamento (`core`)

---

# Fluxo Geral da Aplicação

## 1. Upload do Projeto

O usuário envia um `.zip` pela interface web.

Responsável:

```
src/app/page.tsx
```

---

## 2. API de Upload

O upload é enviado para:

```
src/app/api/upload/route.ts
```

Essa rota:

- recebe o arquivo
- cria diretório temporário
- salva o zip
- extrai o conteúdo
- processa arquivos
- gera markdowns
- cria zip final
- salva em memória
- retorna metadados para UI

---

## 3. Scanner do Projeto

Responsável por:

- localizar arquivos
- ignorar lixo
- montar estrutura base

Pasta:

```
src/core/scanner/
```

---

## 4. Geração de Markdown

Responsável por:

- transformar arquivos em documentação `.md`
- gerar árvore do projeto
- agrupar por diretórios

Pasta:

```
src/core/markdown/
```

---

## 5. Output Final

Responsável por:

- criar pasta output
- compactar arquivos
- preparar downloads

Pasta:

```
src/core/output/
```

---

## 6. Armazenamento Temporário

Atualmente o sistema usa armazenamento em memória RAM.

Responsável:

```
src/core/storage/
```

No futuro:

- SQLite
- Redis
- persistência real

---

# Camadas da Aplicação

---

# `src/app`

Camada de aplicação do Next.js.

Contém:

- páginas
- rotas HTTP
- layout global

---

## `src/app/api`

Responsável pelos endpoints da aplicação.

### `upload/route.ts`

Pipeline principal da aplicação.

Fluxo:

```
Upload
→ salvar zip
→ extrair
→ scan
→ gerar markdown
→ gerar zip
→ salvar projeto
→ responder frontend
```

---

### `download/[id]/route.ts`

Responsável pelo download do `.zip` final gerado.

---

### `download-file/[id]/route.ts`

Responsável pelo download individual dos markdowns.

---

# `src/components`

Camada de UI reutilizável.

Separação feita por responsabilidade visual.

---

## `markdown-viewer.tsx`

Responsável por:

- renderizar markdown
- syntax highlight
- exibição do conteúdo

---

## `project-sidebar.tsx`

Responsável por:

- busca de arquivos
- navegação lateral
- download do zip

---

## `stack-selector.tsx`

Responsável pela seleção manual da stack do projeto.

Atualmente:

- Next.js
- React
- Node
- NestJS
- Spring

---

## `stats-card.tsx`

Cards simples de métricas do projeto.

---

# `src/core`

Camada principal de domínio/processamento.

Toda a lógica do DevContext fica aqui.

Objetivo:

- evitar lógica de negócio dentro da UI/API
- facilitar manutenção
- facilitar futuras expansões

---

# `core/scanner`

Responsável pela descoberta/processamento inicial dos arquivos.

---

## `create-temp-dir.ts`

Cria diretórios temporários únicos usando UUID.

---

## `extract-zip.ts`

Extrai o `.zip` enviado.

---

## `get-project-files.ts`

Responsável por:

- localizar arquivos
- ignorar diretórios inválidos
- retornar estrutura padronizada

Usa:

- `fast-glob`
- `ignore`

---

# `core/constants`

Centraliza constantes globais do sistema.

---

## `ignored-paths.ts`

Lista de caminhos ignorados.

Exemplo:

- `node_modules`
- `.next`
- `.git`

---

## `limits.ts`

Limites globais.

Atualmente:

- tamanho máximo por arquivo

---

## `text-extensions.ts`

Whitelist de extensões textuais válidas.

Usado para:

- ignorar binários
- evitar corrupção de markdown
- reduzir uso de memória

---

# `core/markdown`

Camada responsável pela geração dos arquivos markdown.

---

## `generate-file-section.ts`

Transforma um arquivo em uma seção markdown.

Também:

- ignora binários
- ignora arquivos gigantes

---

## `generate-folder-markdowns.ts`

Agrupa arquivos por diretório e gera markdowns separados.

Exemplo:

```
src_components.md
src_hooks.md
```

---

## `write-structure-markdown.ts`

Gera o `structure.md`.

---

# `core/tree`

Responsável pela geração visual da árvore do projeto.

---

## `generate-tree.ts`

Converte caminhos em estrutura visual hierárquica.

---

# `core/output`

Responsável pela saída final do processamento.

---

## `create-output-dir.ts`

Cria pasta de output.

---

## `read-output-files.ts`

Lê markdowns gerados para exibição na UI.

---

## `zip-output.ts`

Compacta a documentação final.

---

# `core/storage`

Camada de armazenamento temporário.

---

## `memory-store.ts`

Armazena:

- projetos gerados
- arquivos markdown
- caminhos dos zips

Atualmente usa:

```
Map<string,GeneratedProject>
```

---

## `types.ts`

Tipos globais do storage.

---

# `core/stacks`

Sistema preparado para contexto específico por stack.

---

## `stack-config.ts`

Define:

- stacks disponíveis
- labels da UI

---

# `core/templates`

Base para geração contextual futura.

Atualmente:

- templates simples
- estrutura inicial

Objetivo futuro:

- contexto inteligente por stack
- documentação especializada
- prompts IA-friendly

---

# Responsabilidades Arquiteturais

## UI (`components`)

Responsável apenas por:

- renderização
- interação
- estado visual

Sem lógica pesada.

---

## API (`app/api`)

Responsável apenas por:

- entrada/saída HTTP
- orquestração

Sem lógica complexa.

---

## Core (`core`)

Responsável por:

- regras
- processamento
- geração
- filesystem
- markdown
- parsing

Toda regra importante fica aqui.

---

# Decisões Arquiteturais

## 1. Separação forte de responsabilidades

Objetivo:

- escalabilidade
- legibilidade
- manutenção

---

## 2. Core desacoplado do Next.js

A pasta `core` não depende da UI.

Isso permite futuramente:

- CLI
- Electron
- Tauri
- API standalone
- worker processes

---

## 3. Stack manual

A stack é escolhida pelo usuário.

Motivo:

- evita falso positivo
- reduz complexidade
- aumenta previsibilidade

---

## 4. Ignorar binários

Necessário para:

- evitar explosão de memória
- evitar corrupção de markdown
- melhorar performance

---

# Melhorias Futuras Planejadas

## Infraestrutura

- SQLite
- persistência real
- background jobs
- workers

---

## UX

- tabs
- virtualização
- markdown editor
- progress streaming

---

## IA

- templates avançados
- contexto especializado
- resumo automático
- export otimizado para LLMs

---

# Estado Atual do Projeto

O DevContext atualmente já possui:

- pipeline funcional completo
- geração de documentação
- visualização web
- exportação
- arquitetura modular
- base pronta para expansão

O projeto já está estruturado para evoluir sem necessidade de grandes refactors arquiteturais.
