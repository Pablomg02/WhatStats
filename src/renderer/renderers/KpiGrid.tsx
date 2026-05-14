import type { KpiGridData } from '@/core/types/stat-result';

export function KpiGrid({ data }: { data: KpiGridData }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {data.items.map((item) => (
        <div
          key={item.label}
          className="rounded-lg border border-ws-border bg-ws-surface p-4 shadow-sm"
        >
          <div className="text-xs uppercase tracking-wide text-ws-muted">{item.label}</div>
          <div className="mt-1 text-2xl font-semibold text-ws-text">{item.value}</div>
          {item.hint && <div className="mt-1 text-xs text-ws-muted">{item.hint}</div>}
        </div>
      ))}
    </div>
  );
}
