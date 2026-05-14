import type { ParsedDataset } from '@/core/types/dataset';
import type { KpiGridData } from '@/core/types/stat-result';

export function computeMessageCount(dataset: ParsedDataset): KpiGridData {
  const total = dataset.userMessages.length;
  const totalWords = dataset.userMessages
    .filter((m) => m.kind === 'text')
    .reduce((acc, m) => acc + countWords(m.mensaje), 0);
  const totalMedia = dataset.userMessages.filter((m) => m.kind === 'media').length;
  const totalDeleted = dataset.userMessages.filter((m) => m.kind === 'deleted').length;
  const totalPolls = dataset.userMessages.filter((m) => m.kind === 'poll').length;

  const uniqueDays = new Set(
    dataset.userMessages.map((m) => dayKey(m.timestamp)),
  ).size;

  return {
    items: [
      { label: 'Mensajes totales', value: total.toLocaleString() },
      { label: 'Palabras totales', value: totalWords.toLocaleString() },
      { label: 'Días con actividad', value: uniqueDays.toLocaleString() },
      { label: 'Participantes', value: dataset.participantes.length },
      { label: 'Multimedia', value: totalMedia.toLocaleString() },
      { label: 'Eliminados', value: totalDeleted.toLocaleString() },
      { label: 'Encuestas', value: totalPolls.toLocaleString() },
    ],
  };
}

function dayKey(d: Date): string {
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

function countWords(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}
