import type { ParsedDataset } from '@/core/types/dataset';
import type { KpiGridData } from '@/core/types/stat-result';
import { StatError } from '@/core/errors';

const MS_PER_DAY = 86_400_000;

export function computeLongestStreak(dataset: ParsedDataset): KpiGridData {
  const uniqueDays = Array.from(
    new Set(dataset.userMessages.map((m) => dayUtc(m.timestamp))),
  ).sort((a, b) => a - b);

  if (uniqueDays.length === 0) {
    throw new StatError('No hay mensajes para calcular la racha', 'longest-streak');
  }

  let bestLen = 1;
  let bestStart = uniqueDays[0];
  let bestEnd = uniqueDays[0];

  let currentLen = 1;
  let currentStart = uniqueDays[0];

  for (let i = 1; i < uniqueDays.length; i++) {
    const prev = uniqueDays[i - 1];
    const curr = uniqueDays[i];
    if (curr - prev === MS_PER_DAY) {
      currentLen++;
      if (currentLen > bestLen) {
        bestLen = currentLen;
        bestStart = currentStart;
        bestEnd = curr;
      }
    } else {
      currentLen = 1;
      currentStart = curr;
    }
  }

  return {
    items: [
      { label: 'Días consecutivos', value: bestLen.toLocaleString() },
      { label: 'Desde', value: formatDate(bestStart) },
      { label: 'Hasta', value: formatDate(bestEnd) },
    ],
  };
}

function dayUtc(d: Date): number {
  return Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
}

function formatDate(ms: number): string {
  return new Date(ms).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
