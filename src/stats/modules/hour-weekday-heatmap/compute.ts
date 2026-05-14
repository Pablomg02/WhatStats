import type { ParsedDataset } from '@/core/types/dataset';
import type { HeatmapData } from '@/core/types/stat-result';

const WEEKDAY_LABELS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

export function computeHourWeekdayHeatmap(dataset: ParsedDataset): HeatmapData {
  const counts: number[][] = Array.from({ length: 7 }, () => new Array(24).fill(0));

  for (const msg of dataset.userMessages) {
    const jsDay = msg.timestamp.getDay();
    const dayIdx = jsDay === 0 ? 6 : jsDay - 1;
    const hour = msg.timestamp.getHours();
    counts[dayIdx][hour] += 1;
  }

  const cells = [];
  for (let d = 0; d < 7; d++) {
    for (let h = 0; h < 24; h++) {
      cells.push({ x: `${String(h).padStart(2, '0')}h`, y: WEEKDAY_LABELS[d], value: counts[d][h] });
    }
  }

  return {
    cells,
    xLabels: Array.from({ length: 24 }, (_, h) => `${String(h).padStart(2, '0')}h`),
    yLabels: WEEKDAY_LABELS,
  };
}
