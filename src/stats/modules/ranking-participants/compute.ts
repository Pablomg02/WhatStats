import type { ParsedDataset } from '@/core/types/dataset';
import type { RankingData } from '@/core/types/stat-result';

export function computeRankingParticipants(dataset: ParsedDataset): RankingData {
  const total = dataset.userMessages.length;
  const chars: Record<string, number> = {};

  for (const msg of dataset.userMessages) {
    if (!msg.autor) continue;
    chars[msg.autor] = (chars[msg.autor] ?? 0) + msg.mensaje.length;
  }

  const rows = Object.entries(dataset.metadata.counts.perAuthor)
    .map(([label, value]) => {
      const pct = total ? Math.round((value / total) * 1000) / 10 : 0;
      const avgChars = value ? Math.round(((chars[label] ?? 0) / value) * 10) / 10 : 0;
      return {
        label,
        value,
        extra: `${pct}% · ${avgChars} chars/msg`,
      };
    })
    .sort((a, b) => b.value - a.value);

  return { rows, valueLabel: 'Mensajes' };
}
