# DevContext

DevContext é uma ferramenta para geração automática de documentação de contexto para projetos de software.

A aplicação recebe um projeto compactado (`.zip`), processa sua estrutura e gera arquivos markdown organizados para facilitar o consumo por IAs como:

- ChatGPT
- Claude
- Cursor
- outras LLMs

O objetivo do projeto é reduzir o trabalho manual de preparação de contexto durante implementação de features, onboarding técnico e análise de código.

---

# Funcionalidades

- Upload de projetos `.zip`
- Extração automática
- Geração de árvore do projeto
- Geração de markdowns organizados por pasta
- Preview da documentação na interface
- Download individual de arquivos
- Export completo em `.zip`
- Seleção manual de stack
- Ignorar arquivos binários
- Limite de tamanho para arquivos grandes
- Busca de arquivos gerados
- Syntax highlight para código

---

# Stack

## Frontend

- Next.js 16
- React 19
- TailwindCSS 4

## Backend

- Route Handlers do Next.js
- Node.js

## Bibliotecas principais

- fast-glob
- adm-zip
- archiver
- react-markdown
- react-syntax-highlighter

---

# Como executar

## Instalar dependências

```
npm install
```

---

## Rodar projeto

```
npm run dev
```

---

# Fluxo da Aplicação

```
Upload ZIP
→ Extração
→ Scan do projeto
→ Filtragem
→ Geração da árvore
→ Geração dos markdowns
→ Compactação
→ Preview web
→ Download
```

---

# Estrutura Principal

```
src/
├── app/
├── components/
├── core/
```

## `app`

Camada do Next.js responsável pelas páginas e APIs.

## `components`

Componentes reutilizáveis da interface.

## `core`

Camada principal de processamento e regras de negócio.

---

# Organização do Core

```
core/
├── cleanup/
├── constants/
├── markdown/
├── output/
├── scanner/
├── stacks/
├── storage/
├── templates/
├── tree/
└── types/
```

---

# Objetivos Futuros

- Persistência com SQLite
- Histórico de projetos
- Templates avançados por stack
- Export otimizado para IA
- Streaming de progresso
- Background workers
- Parser inteligente por framework
- Modo CLI/Desktop

---

# Estado Atual

O projeto atualmente já possui:

- pipeline funcional completo
- geração automática de documentação
- visualização integrada
- arquitetura modular e escalável

A estrutura foi planejada para permitir evolução gradual sem necessidade de refactors grandes.

---

# Licença

MIT
