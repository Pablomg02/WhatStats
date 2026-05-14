import type { TextSampleData } from '@/core/types/stat-result';

export function TextSamples({ data }: { data: TextSampleData }) {
  return (
    <div className="flex flex-col gap-3">
      {data.title && <h3 className="text-sm font-semibold text-ws-text">{data.title}</h3>}
      {data.samples.map((s, i) => (
        <div key={i} className="rounded border border-ws-border bg-ws-surface p-3">
          <div className="text-xs text-ws-muted">{s.label}</div>
          <div className="mt-1 whitespace-pre-wrap text-sm text-ws-text">{s.text}</div>
        </div>
      ))}
    </div>
  );
}
