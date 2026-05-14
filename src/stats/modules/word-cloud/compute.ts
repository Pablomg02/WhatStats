import type { ParsedDataset } from '@/core/types/dataset';
import type { WordCloudData, WordCloudGroup } from '@/core/types/stat-result';
import { StatError } from '@/core/errors';
import { STOP_WORDS, normalize } from './stop-words';

export interface WordCloudParams {
  top?: string | number;
}

const DEFAULT_TOP = 40;
const MIN_LEN = 3;
const MAX_LEN = 24;

const TOKEN_REGEX = /[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu;
const LAUGHTER_REGEX = /^(?:[jh][aeiou])+h?$/;

export function computeWordCloud(
  dataset: ParsedDataset,
  params: WordCloudParams,
): WordCloudData {
  const topN = parseTop(params.top);

  const perAuthor = new Map<string, Map<string, number>>();
  for (const p of dataset.participantes) perAuthor.set(p, new Map());

  for (const msg of dataset.userMessages) {
    if (msg.kind !== 'text' || !msg.autor) continue;
    const counts = perAuthor.get(msg.autor);
    if (!counts) continue;

    const tokens = msg.mensaje.match(TOKEN_REGEX);
    if (!tokens) continue;

    for (const raw of tokens) {
      if (raw.length < MIN_LEN || raw.length > MAX_LEN) continue;
      if (/^\d+$/.test(raw)) continue;
      const key = normalize(raw);
      if (STOP_WORDS.has(key)) continue;
      if (LAUGHTER_REGEX.test(key)) continue;
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
  }

  const groups: WordCloudGroup[] = [];
  for (const [autor, counts] of perAuthor) {
    if (counts.size === 0) continue;
    const top = [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, topN)
      .map(([text, weight]) => ({ text, weight }));
    groups.push({ label: autor, words: top });
  }

  if (groups.length === 0) {
    throw new StatError('No hay palabras suficientes para construir la nube', 'word-cloud');
  }

  return { groups };
}

function parseTop(raw: unknown): number {
  const n = typeof raw === 'string' ? Number(raw) : typeof raw === 'number' ? raw : DEFAULT_TOP;
  if (!Number.isFinite(n) || n <= 0) return DEFAULT_TOP;
  return Math.min(Math.floor(n), 150);
}
