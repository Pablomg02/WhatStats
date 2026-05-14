import type { ParsedDataset } from '@/core/types/dataset';
import type { LineChartData } from '@/core/types/stat-result';

export function computeMonthlyActivity(dataset: ParsedDataset): LineChartData {
  if (dataset.userMessages.length === 0) {
    return { points: [], smooth: true, area: true };
  }

  const buckets = new Map<string, number>();
  for (const msg of dataset.userMessages) {
    const key = monthKey(msg.timestamp);
    buckets.set(key, (buckets.get(key) ?? 0) + 1);
  }

  const start = monthKey(dataset.metadata.firstMessage);
  const end = monthKey(dataset.metadata.lastMessage);
  const points = fillMonthRange(start, end).map((k) => ({
    x: k,
    y: buckets.get(k) ?? 0,
  }));

  return {
    points,
    smooth: true,
    area: true,
    xLabel: 'Mes',
    yLabel: 'Mensajes',
  };
}

function monthKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

function fillMonthRange(start: string, end: string): string[] {
  const [sy, sm] = start.split('-').map(Number);
  const [ey, em] = end.split('-').map(Number);
  const out: string[] = [];
  let y = sy;
  let m = sm;
  while (y < ey || (y === ey && m <= em)) {
    out.push(`${y}-${String(m).padStart(2, '0')}`);
    m++;
    if (m > 12) {
      m = 1;
      y++;
    }
  }
  return out;
}
