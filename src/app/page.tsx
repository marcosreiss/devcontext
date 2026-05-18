// src/app/page.tsx
"use client";

import {
  Check,
  Copy,
  Loader2,
  UploadCloud,
} from "lucide-react";

import { useRef, useState } from "react";

import { MarkdownViewer } from "@/components/markdown-viewer";

import { ProjectSidebar } from "@/components/project-sidebar";

import { StatsCard } from "@/components/stats-card";

import type { ProjectStack } from "@/core/stacks/stack-config";

interface GeneratedFile {
  id: string;
  name: string;
  downloadUrl: string;
}

interface UploadResponse {
  projectName: string;
  downloadUrl: string;
  files: GeneratedFile[];
  totalFiles: number;
}

export default function HomePage() {
  const [loading, setLoading] =
    useState(false);

  const [dragging, setDragging] =
    useState(false);

  const [stack] =
    useState<ProjectStack>("next");

  const [data, setData] =
    useState<UploadResponse | null>(
      null
    );

  const [selectedFile, setSelectedFile] =
    useState("");

  const [copied, setCopied] =
    useState(false);

  const inputRef =
    useRef<HTMLInputElement>(null);

  async function processFile(file: File) {
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("file", file);

      formData.append("stack", stack);

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
        await handleFileClick(
          result.files[0].downloadUrl
        );
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

  async function handleCopy() {
    if (!selectedFile) return;

    await navigator.clipboard.writeText(
      selectedFile
    );

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto flex max-w-7xl gap-6 p-6">
        <div className="w-85 shrink-0 rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6">
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
              Gerando contexto...
            </div>
          )}

          {data && (
            <>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <StatsCard
                  label="Arquivos"
                  value={
                    data.totalFiles
                  }
                />

                <StatsCard
                  label="Markdowns"
                  value={
                    data.files.length
                  }
                />
              </div>

              <div className="mt-6">
                <ProjectSidebar
                  files={data.files}
                  onSelect={
                    handleFileClick
                  }
                  downloadUrl={
                    data.downloadUrl
                  }
                />
              </div>
            </>
          )}
        </div>

        <div className="min-h-[80vh] flex-1 overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/70">
          {selectedFile ? (
            <>
              <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">
                <div>
                  <h2 className="text-sm font-medium text-zinc-200">
                    Markdown Preview
                  </h2>

                  <p className="text-xs text-zinc-500">
                    Visualização do contexto gerado
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm transition hover:border-zinc-500"
                >
                  {copied ? (
                    <>
                      <Check className="size-4 text-green-400" />
                      Copiado
                    </>
                  ) : (
                    <>
                      <Copy className="size-4" />
                      Copiar markdown
                    </>
                  )}
                </button>
              </div>

              <div className="h-[calc(100vh-120px)] overflow-auto p-8">
                <MarkdownViewer
                  content={selectedFile}
                />
              </div>
            </>
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