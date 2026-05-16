import fg from "fast-glob";
import path from "node:path";
import ignore from "ignore";

import { IGNORED_PATHS } from "../constants/ignored-paths";
import type { ProjectFile } from "../types/project-file";

export async function getProjectFiles(
  projectPath: string,
): Promise<ProjectFile[]> {
  const ig = ignore();

  ig.add(IGNORED_PATHS);

  const files = await fg("**/*", {
    cwd: projectPath,
    onlyFiles: true,
    dot: true,
    absolute: true,
  });

  return files
    .filter((file) => {
      const relative = path.relative(projectPath, file);

      return !ig.ignores(relative);
    })
    .map((file) => ({
      absolutePath: file,
      relativePath: path.relative(projectPath, file),
    }));
}
