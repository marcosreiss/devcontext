# Agents Development Guide

This guide provides conventions and best practices for building AI agent applications.

---

## 1. Project Overview

- Stack/Language: **nextjs** / **typescript**
- Build tooling: **TypeScript**
- Primary focus: **Maintainability (stack default - not detected via repo scan)**

---

## 2. Stack Playbook

- Clarify if routes belong in the App Router and whether they run on the server or client.
- Use built-in data fetching helpers (Server Components, Route Handlers, Server Actions) before custom fetch logic.
- Keep shared UI and server utilities in clearly named directories to support bundler boundaries.

---

## 3. Development Standards

### Code Organization

- File structure: **App Router (app/) (stack default - not detected via repo scan)**
- Folder organization: **Feature-based folders (stack default - not detected via repo scan)**
- Naming conventions:
  - Variables & functions: **camelCase**
  - Files: **kebab-case**
  - Components/classes: **kebab-case**

### Code Style & Quality

- Code style: **Airbnb JavaScript Style Guide (stack default - not detected via repo scan)**
- Export style: **Named exports (stack default - not detected via repo scan)**
- Comments/documentation: **Minimal comments (stack default - not detected via repo scan)**

### Testing

- Unit tests: **Jest (stack default - not detected via repo scan)**
- E2E tests: **Playwright (stack default - not detected via repo scan)**

**Additional for Agents**

- Add scenario-based tests simulating conversations or workflows.
- Validate agent fallbacks (how the agent behaves when tools or APIs fail).

---

## 4. Agent-Specific Patterns

### State & Memory

- State handling: **Zustand (stack default - not detected via repo scan)**
- Data fetching: **Server Components + fetch (stack default - not detected via repo scan)**
- Memory / context strategy: define how the agent retains conversation or state.

### API Integration

- API layer: **Custom hooks (stack default - not detected via repo scan)**
- Authentication: **Auth.js (NextAuth) (stack default - not detected via repo scan)**
- Validation: **Zod (stack default - not detected via repo scan)**
- Tool usage: document which external APIs or tools the agent can call.

### Performance & Monitoring

- Logging: **Sentry (stack default - not detected via repo scan)**
- Performance focus: **Memoize heavy components (stack default - not detected via repo scan)**
- Additional concerns:
  - Monitor token usage and cost efficiency.
  - Handle API rate limits gracefully.
  - Use observability tools to track agent responses and latency.

---

## 5. Collaboration & Git

### Version Control

- Commit style: **Conventional Commits (stack default - not detected via repo scan)**
- PR rules: **Require at least one review (stack default - not detected via repo scan)**

### Team Collaboration

- Collaboration approach: **Require reviews before merging (stack default - not detected via repo scan)**

