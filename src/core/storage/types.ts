// src/core/storage/types.ts
export interface GeneratedFile {
  id: string;
  name: string;
  content: string;
}

export interface GeneratedProject {
  id: string;
  projectName: string;
  zipPath: string;
  files: GeneratedFile[];
}
