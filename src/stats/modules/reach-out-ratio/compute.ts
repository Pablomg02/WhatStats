import type { ParsedDataset } from '@/core/types/dataset';
import type { RankingData } from '@/core/types/stat-result';
import { StatError } from '@/core/errors';

export interface ReachOutRatioParams {
  hours?: string | number;
}

const DEFAULT_HOURS = 48;

export function computeReachOutRatio(
  dataset: ParsedDataset,
  params: ReachOutRatioParams,
): RankingData {
  const thresholdMs = parseHours(params.hours) * 3_600_000;

  const sorted = [...dataset.userMessages]
    .filter((m) => m.autor)
    .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

  if (sorted.length < 2) {
    throw new StatError('Se necesitan al menos 2 mensajes', 'reach-out-ratio');
  }

  const perAuthor: Record<string, number> = {};
  let total = 0;

  for (let i = 1; i < sorted.length; i++) {
    const gap = sorted[i].timestamp.getTime() - sorted[i - 1].timestamp.getTime();
    if (gap < thresholdMs) continue;
    const autor = sorted[i].autor as string;
    perAuthor[autor] = (perAuthor[autor] ?? 0) + 1;
    total += 1;
  }

  if (total === 0) {
    throw new StatError(
      `No se encontraron silencios mayores de ${parseHours(params.hours)}h`,
      'reach-out-ratio',
    );
  }

  for (const participante of dataset.participantes) {
    if (!(participante in perAuthor)) perAuthor[participante] = 0;
  }

  const rows = Object.entries(perAuthor)
    .map(([label, value]) => ({
      label,
      value,
      extra: `${Math.round((value / total) * 1000) / 10}%`,
    }))
    .sort((a, b) => b.value - a.value);

  return { rows, valueLabel: `Aperturas tras silencio (${total} silencios)` };
}

function parseHours(raw: unknown): number {
  const n = typeof raw === 'string' ? Number(raw) : typeof raw === 'number' ? raw : DEFAULT_HOURS;
  if (!Number.isFinite(n) || n <= 0) return DEFAULT_HOURS;
  return Math.min(n, 24 * 60);
}
