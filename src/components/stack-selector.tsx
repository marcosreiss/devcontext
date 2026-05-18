// src/components/stack-selector.tsx
import type { ProjectStack } from "@/core/stacks/stack-config";

import { STACK_LABELS } from "@/core/stacks/stack-config";

interface Props {
    value: ProjectStack;

    onChange: (
        stack: ProjectStack
    ) => void;
}

export function StackSelector({
    value,
    onChange,
}: Props) {
    return (
        <select
            value={value}
            onChange={(e) =>
                onChange(
                    e.target
                        .value as ProjectStack
                )
            }
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm outline-none"
        >
            {Object.entries(
                STACK_LABELS
            ).map(([key, label]) => (
                <option
                    key={key}
                    value={key}
                >
                    {label}
                </option>
            ))}
        </select>
    );
}