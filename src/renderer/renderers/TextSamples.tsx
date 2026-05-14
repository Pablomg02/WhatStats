import type { TextSampleData } from '@/core/types/stat-result';

export function TextSamples({ data }: { data: TextSampleData }) {
  return (
    <div className="flex flex-col gap-3">
      {data.title && <h3 className="text-sm font-semibold text-slate-700">{data.title}</h3>}
      {data.samples.map((s, i) => (
        <div key={i} className="rounded border border-slate-200 bg-slate-50 p-3">
          <div className="text-xs text-slate-500">{s.label}</div>
          <div className="mt-1 whitespace-pre-wrap text-sm text-slate-800">{s.text}</div>
        </div>
      ))}
    </div>
  );
}
