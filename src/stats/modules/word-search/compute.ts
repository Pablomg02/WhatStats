import type { ParsedDataset } from '@/core/types/dataset';
import type { RankingData } from '@/core/types/stat-result';
import { StatError } from '@/core/errors';

export interface WordSearchParams {
  word: string;
}

export function computeWordSearch(
  dataset: ParsedDataset,
  params: WordSearchParams,
): RankingData {
  const word = params.word?.trim();
  if (!word) {
    throw new StatError('Introduce una palabra para buscar', 'word-search');
  }

  const regex = new RegExp(`\\b${escapeRegex(word)}\\b`, 'gi');
  const perAuthor: Record<string, number> = {};
  let total = 0;

  for (const msg of dataset.userMessages) {
    if (msg.kind !== 'text' || !msg.autor) continue;
    const matches = msg.mensaje.match(regex);
    if (!matches) continue;
    perAuthor[msg.autor] = (perAuthor[msg.autor] ?? 0) + matches.length;
    total += matches.length;
  }

  if (total === 0) {
    throw new StatError(`No se encontró «${word}» en el chat`, 'word-search');
  }

  const rows = Object.entries(perAuthor)
    .map(([label, value]) => ({
      label,
      value,
      extra: `${Math.round((value / total) * 1000) / 10}%`,
    }))
    .sort((a, b) => b.value - a.value);

  return { rows, valueLabel: `«${word}»` };
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
