import type { ParsedDataset } from '@/core/types/dataset';
import type { RankingData } from '@/core/types/stat-result';

export function computeRankingParticipants(dataset: ParsedDataset): RankingData {
  const total = dataset.userMessages.length;
  const rows = Object.entries(dataset.metadata.counts.perAuthor)
    .map(([label, value]) => {
      const pct = total ? Math.round((value / total) * 1000) / 10 : 0;
      return {
        label,
        value,
        extra: `${pct}%`,
      };
    })
    .sort((a, b) => b.value - a.value);

  return { rows, valueLabel: 'Mensajes' };
}
