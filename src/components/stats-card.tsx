// src/components/stats-card.tsx
interface Props {
    label: string;
    value: string | number;
}

export function StatsCard({
    label,
    value,
}: Props) {
    return (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
            <div className="text-xs text-zinc-500">
                {label}
            </div>

            <div className="mt-2 text-2xl font-semibold">
                {value}
            </div>
        </div>
    );
}