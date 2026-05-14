import type { ParsedDataset } from '@/core/types/dataset';
import type { BarChartData } from '@/core/types/stat-result';

export interface TopWeeksParams {
  n?: string | number;
}

export function computeTopWeeks(dataset: ParsedDataset, params: TopWeeksParams): BarChartData {
  const n = clampN(params.n, 10);
  const buckets = new Map<string, number>();
  for (const msg of dataset.userMessages) {
    const monday = mondayOf(msg.timestamp);
    buckets.set(monday, (buckets.get(monday) ?? 0) + 1);
  }
  const sorted = Array.from(buckets.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, n);

  return {
    labels: sorted.map(([k]) => formatLabel(k)),
    values: sorted.map(([, v]) => v),
    xLabel: 'Semana (lunes)',
    yLabel: 'Mensajes',
  };
}

function mondayOf(d: Date): string {
  const date = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const jsDay = date.getDay();
  const offset = jsDay === 0 ? 6 : jsDay - 1;
  date.setDate(date.getDate() - offset);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function formatLabel(key: string): string {
  const [y, m, d] = key.split('-');
  return `${d}/${m}/${y.slice(2)}`;
}

function clampN(raw: unknown, fallback: number): number {
  const n = typeof raw === 'string' ? Number(raw) : typeof raw === 'number' ? raw : fallback;
  if (!Number.isFinite(n) || n <= 0) return fallback;
  return Math.min(Math.floor(n), 50);
}
