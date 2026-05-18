// src/core/storage/memory-store.ts
import type { GeneratedProject } from "./types";

const projects = new Map<string, GeneratedProject>();

export function saveProject(project: GeneratedProject) {
  projects.set(project.id, project);
}

export function getProject(id: string) {
  return projects.get(id);
}
