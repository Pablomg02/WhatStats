import type { RankingData } from '@/core/types/stat-result';

export function TableRanking({ data }: { data: RankingData }) {
  const max = Math.max(...data.rows.map((r) => r.value), 1);
  return (
    <div className="flex flex-col gap-2">
      {data.rows.map((row) => (
        <div key={row.label} className="flex items-center gap-2">
          <div className="w-24 truncate text-xs text-ws-text sm:w-40 sm:text-sm">{row.label}</div>
          <div className="relative h-5 flex-1 overflow-hidden rounded bg-ws-surface sm:h-6">
            <div
              className="absolute inset-y-0 left-0 rounded bg-ws-green"
              style={{ width: `${(row.value / max) * 100}%` }}
            />
          </div>
          <div className="flex w-20 flex-col items-end text-xs sm:w-36 sm:text-sm">
            <span className="tabular-nums text-ws-text">{row.value.toLocaleString()}</span>
            {row.extra && <span className="text-xs text-ws-muted">{row.extra}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}
