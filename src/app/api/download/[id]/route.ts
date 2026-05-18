// src/app/api/download/[id]/route.ts
import fs from "node:fs/promises";

import { getProject } from "@/core/storage/memory-store";

export async function GET(
  _: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  },
) {
  const { id } = await context.params;

  const project = getProject(id);

  if (!project) {
    return Response.json({ error: "Projeto não encontrado" }, { status: 404 });
  }

  const buffer = await fs.readFile(project.zipPath);

  return new Response(buffer, {
    headers: {
      "Content-Type": "application/zip",

      "Content-Disposition": `attachment; filename="${project.projectName}-context.zip"`,
    },
  });
}
