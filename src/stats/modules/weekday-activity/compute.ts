import type { ParsedDataset } from '@/core/types/dataset';
import type { BarChartData } from '@/core/types/stat-result';

const LABELS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

export function computeWeekdayActivity(dataset: ParsedDataset): BarChartData {
  const buckets = new Array(7).fill(0);
  for (const msg of dataset.userMessages) {
    const jsDay = msg.timestamp.getDay();
    const idx = jsDay === 0 ? 6 : jsDay - 1;
    buckets[idx]++;
  }
  return {
    labels: LABELS,
    values: buckets,
    xLabel: 'Día de la semana',
    yLabel: 'Mensajes',
  };
}
