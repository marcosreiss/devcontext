// src/app/page.tsx
"use client";

import {
  Download,
  FileText,
  Loader2,
  UploadCloud,
} from "lucide-react";

import { useRef, useState } from "react";

interface GeneratedFile {
  id: string;
  name: string;
  downloadUrl: string;
}

interface UploadResponse {
  projectName: string;
  downloadUrl: string;
  files: GeneratedFile[];
}

export default function HomePage() {
  const [loading, setLoading] =
    useState(false);

  const [dragging, setDragging] =
    useState(false);

  const [data, setData] =
    useState<UploadResponse | null>(
      null
    );

  const [selectedFile, setSelectedFile] =
    useState<string | null>(null);

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

      const result =
        await response.json();

      setData(result);

      if (result.files.length > 0) {
        const firstFile =
          await fetch(
            result.files[0].downloadUrl
          );

        const content =
          await firstFile.text();

        setSelectedFile(content);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleFileClick(
    url: string
  ) {
    const response = await fetch(url);

    const content =
      await response.text();

    setSelectedFile(content);
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto flex max-w-7xl gap-6 p-6">
        <div className="w-[320px] shrink-0 rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold">
              DevContext
            </h1>

            <p className="mt-2 text-sm text-zinc-400">
              Gere contexto automático
              para IA.
            </p>
          </div>

          {/** biome-ignore lint/a11y/noStaticElementInteractions: verificar e corrigir */}
          {/** biome-ignore lint/a11y/useKeyWithClickEvents: verificar e corrigir */}
          <div
            onDragOver={(e) => {
              e.preventDefault();

              setDragging(true);
            }}
            onDragLeave={() =>
              setDragging(false)
            }
            onDrop={async (event) => {
              event.preventDefault();

              setDragging(false);

              const file =
                event.dataTransfer
                  .files?.[0];

              if (!file) return;

              await processFile(file);
            }}
            onClick={() =>
              inputRef.current?.click()
            }
            className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed px-6 py-10 transition ${dragging
              ? "border-zinc-300 bg-zinc-800"
              : "border-zinc-700 bg-zinc-800/40"
              }`}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".zip"
              className="hidden"
              onChange={async (e) => {
                const file =
                  e.target.files?.[0];

                if (!file) return;

                await processFile(file);
              }}
            />

            <UploadCloud className="mb-4 size-10 text-zinc-400" />

            <span className="text-sm font-medium">
              Upload .zip
            </span>
          </div>

          {loading && (
            <div className="mt-6 flex items-center gap-2 text-sm">
              <Loader2 className="size-4 animate-spin" />
              Processando...
            </div>
          )}

          {data && (
            <>
              <a
                href={data.downloadUrl}
                className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-zinc-100 px-4 py-3 text-sm font-medium text-zinc-900 transition hover:bg-zinc-300"
              >
                <Download className="size-4" />
                Download ZIP
              </a>

              <div className="mt-6 space-y-2">
                {data.files.map((file) => (
                  <button
                    key={file.id}
                    type="button"
                    onClick={() =>
                      handleFileClick(
                        file.downloadUrl
                      )
                    }
                    className="flex w-full items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-left text-sm transition hover:border-zinc-600"
                  >
                    <FileText className="size-4" />

                    <span className="truncate">
                      {file.name}
                    </span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="min-h-[80vh] flex-1 overflow-auto rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6">
          {selectedFile ? (
            <pre className="whitespace-pre-wrap text-sm text-zinc-300">
              {selectedFile}
            </pre>
          ) : (
            <div className="flex h-full items-center justify-center text-zinc-500">
              Nenhum arquivo selecionado
            </div>
          )}
        </div>
      </div>
    </main>
  );
}