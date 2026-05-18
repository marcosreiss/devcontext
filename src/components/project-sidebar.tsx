// src/components/project-sidebar.tsx
"use client";

import {
    Download,
    FileText,
    Search,
} from "lucide-react";

import { useMemo, useState } from "react";

interface FileItem {
    id: string;
    name: string;
    downloadUrl: string;
}

interface Props {
    files: FileItem[];

    onSelect: (url: string) => void;

    downloadUrl: string;
}

export function ProjectSidebar({
    files,
    onSelect,
    downloadUrl,
}: Props) {
    const [search, setSearch] =
        useState("");

    const filtered = useMemo(() => {
        return files.filter((file) =>
            file.name
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                )
        );
    }, [files, search]);

    return (
        <>
            <a
                href={downloadUrl}
                className="mb-4 flex items-center justify-center gap-2 rounded-xl bg-zinc-100 px-4 py-3 text-sm font-medium text-zinc-900 transition hover:bg-zinc-300"
            >
                <Download className="size-4" />
                Download ZIP
            </a>

            <div className="relative mb-4">
                <Search className="absolute left-3 top-3 size-4 text-zinc-500" />

                <input
                    placeholder="Buscar arquivo..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-2 pl-10 pr-3 text-sm outline-none"
                />
            </div>

            <div className="space-y-2">
                {filtered.map((file) => (
                    <button
                        key={file.id}
                        type="button"
                        onClick={() =>
                            onSelect(
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
    );
}