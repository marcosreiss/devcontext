// src/app/api/download-file/[id]/route.ts
import { getProject } from "@/core/storage/memory-store";

export async function GET(
  req: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  },
) {
  const { id } = await context.params;

  const fileId = new URL(req.url).searchParams.get("fileId");

  const project = getProject(id);

  if (!project || !fileId) {
    return Response.json({ error: "Arquivo não encontrado" }, { status: 404 });
  }

  const file = project.files.find((f) => f.id === fileId);

  if (!file) {
    return Response.json({ error: "Arquivo não encontrado" }, { status: 404 });
  }

  return new Response(file.content, {
    headers: {
      "Content-Type": "text/markdown",

      "Content-Disposition": `attachment; filename="${file.name}"`,
    },
  });
}
