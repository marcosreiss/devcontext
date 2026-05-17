// src/core/stacks/stack-config.ts
export type ProjectStack = "next" | "react" | "node" | "nestjs" | "spring";

export const STACK_LABELS: Record<ProjectStack, string> = {
  next: "Next.js",
  react: "React",
  node: "Node.js",
  nestjs: "NestJS",
  spring: "Spring",
};
