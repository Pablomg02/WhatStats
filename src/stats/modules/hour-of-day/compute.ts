import type { ParsedDataset } from '@/core/types/dataset';
import type { BarChartData } from '@/core/types/stat-result';

export function computeHourOfDay(dataset: ParsedDataset): BarChartData {
  const buckets = new Array(24).fill(0);
  for (const msg of dataset.userMessages) {
    buckets[msg.timestamp.getHours()]++;
  }
  return {
    labels: buckets.map((_, h) => `${String(h).padStart(2, '0')}:00`),
    values: buckets,
    xLabel: 'Hora del día',
    yLabel: 'Mensajes',
  };
}
