import type { ParsedDataset } from '@/core/types/dataset';
import type { BarChartData } from '@/core/types/stat-result';

export interface TopDaysParams {
  n?: string | number;
}

export function computeTopDays(dataset: ParsedDataset, params: TopDaysParams): BarChartData {
  const n = clampN(params.n, 10);
  const buckets = new Map<string, number>();
  for (const msg of dataset.userMessages) {
    const key = dayKey(msg.timestamp);
    buckets.set(key, (buckets.get(key) ?? 0) + 1);
  }
  const sorted = Array.from(buckets.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, n);

  return {
    labels: sorted.map(([k]) => formatDayLabel(k)),
    values: sorted.map(([, v]) => v),
    xLabel: 'Día',
    yLabel: 'Mensajes',
  };
}

function dayKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function formatDayLabel(key: string): string {
  const [y, m, d] = key.split('-');
  return `${d}/${m}/${y.slice(2)}`;
}

function clampN(raw: unknown, fallback: number): number {
  const n = typeof raw === 'string' ? Number(raw) : typeof raw === 'number' ? raw : fallback;
  if (!Number.isFinite(n) || n <= 0) return fallback;
  return Math.min(Math.floor(n), 50);
}
