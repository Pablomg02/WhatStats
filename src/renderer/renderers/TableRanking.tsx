import type { RankingData } from '@/core/types/stat-result';

export function TableRanking({ data }: { data: RankingData }) {
  const max = Math.max(...data.rows.map((r) => r.value), 1);
  return (
    <div className="flex flex-col gap-2">
      {data.rows.map((row) => (
        <div key={row.label} className="flex items-center gap-3">
          <div className="w-40 truncate text-sm text-slate-700">{row.label}</div>
          <div className="relative h-6 flex-1 overflow-hidden rounded bg-slate-100">
            <div
              className="absolute inset-y-0 left-0 bg-whatsapp-green"
              style={{ width: `${(row.value / max) * 100}%` }}
            />
          </div>
          <div className="flex w-44 flex-col items-end text-sm">
            <span className="tabular-nums text-slate-700">{row.value.toLocaleString()}</span>
            {row.extra && <span className="text-xs text-slate-500">{row.extra}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}
