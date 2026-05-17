// src/app/page.tsx
"use client";

import {
  Loader2,
  UploadCloud,
} from "lucide-react";

import { useRef, useState } from "react";

export default function HomePage() {
  const [loading, setLoading] =
    useState(false);

  const [dragging, setDragging] =
    useState(false);

  const inputRef =
    useRef<HTMLInputElement>(null);

  async function processFile(file: File) {
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("file", file);

      const response = await fetch(
        "/api/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const blob =
        await response.blob();

      const url =
        window.URL.createObjectURL(blob);

      const a =
        document.createElement("a");

      a.href = url;

      a.download =
        file.name.replace(
          ".zip",
          ""
        ) + "-context.zip";

      a.click();

      window.URL.revokeObjectURL(url);
    } finally {
      setLoading(false);
    }
  }

  async function handleChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file =
      event.target.files?.[0];

    if (!file) return;

    await processFile(file);
  }

  async function handleDrop(
    event: React.DragEvent<HTMLDivElement>
  ) {
    event.preventDefault();

    setDragging(false);

    const file =
      event.dataTransfer.files?.[0];

    if (!file) return;

    await processFile(file);
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
            DevContext
          </h1>

          <p className="mt-2 text-sm text-zinc-400">
            Gere documentação de
            contexto automaticamente.
          </p>
        </div>

        {/** biome-ignore lint/a11y/noStaticElementInteractions: melhorar explicação */}
        {/** biome-ignore lint/a11y/useKeyWithClickEvents:melhorar explicação */}
        <div
          onDragOver={(e) => {
            e.preventDefault();

            setDragging(true);
          }}
          onDragLeave={() =>
            setDragging(false)
          }
          onDrop={handleDrop}
          onClick={() =>
            inputRef.current?.click()
          }
          className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed px-6 py-10 transition ${dragging
            ? "border-zinc-300 bg-zinc-800"
            : "border-zinc-700 bg-zinc-800/40 hover:border-zinc-500"
            }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".zip"
            className="hidden"
            onChange={handleChange}
          />

          <UploadCloud className="mb-4 size-10 text-zinc-400" />

          <span className="text-sm font-medium">
            Arraste um .zip ou clique
          </span>

          <span className="mt-1 text-xs text-zinc-500">
            Apenas arquivos .zip
          </span>
        </div>

        {loading && (
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-zinc-300">
            <Loader2 className="size-4 animate-spin" />
            Gerando documentação...
          </div>
        )}
      </div>
    </main>
  );
}