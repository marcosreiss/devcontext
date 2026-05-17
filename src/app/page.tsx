// src/app/page.tsx
"use client";

import { Loader2, UploadCloud } from "lucide-react";
import { useState } from "react";

export default function HomePage() {
  const [loading, setLoading] = useState(false);

  async function handleUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    setLoading(true);

    const formData = new FormData();

    formData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "devcontext-output.zip";

    a.click();

    window.URL.revokeObjectURL(url);

    setLoading(false);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 text-zinc-100">
      <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900/70 p-8 shadow-2xl backdrop-blur">
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-2xl bg-zinc-800 p-4">
              <UploadCloud className="size-8 text-zinc-100" />
            </div>
          </div>

          <h1 className="text-2xl font-semibold">
            Upload do Projeto
          </h1>

          <p className="mt-2 text-sm text-zinc-400">
            Envie um arquivo .zip para iniciar o processamento.
          </p>
        </div>

        <label
          htmlFor="file-upload"
          className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-700 bg-zinc-800/40 px-6 py-10 transition hover:border-zinc-500 hover:bg-zinc-800"
        >
          <input
            id="file-upload"
            type="file"
            accept=".zip"
            className="hidden"
            onChange={handleUpload}
          />

          <UploadCloud className="mb-4 size-10 text-zinc-400" />

          <span className="text-sm font-medium">
            Clique para selecionar o arquivo
          </span>

          <span className="mt-1 text-xs text-zinc-500">
            Apenas arquivos .zip
          </span>
        </label>

        {loading && (
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-zinc-300">
            <Loader2 className="size-4 animate-spin" />
            Processando arquivo...
          </div>
        )}
      </div>
    </main>
  );
}