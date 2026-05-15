import type { ParsedDataset } from '@/core/types/dataset';
import type { RankingData } from '@/core/types/stat-result';
import { StatError } from '@/core/errors';

export interface DoubleTextingParams {
  minutes?: string | number;
}

const DEFAULT_MIN = 15;

interface AuthorStats {
  events: number;
  burstSizesSum: number;
  burstsCounted: number;
  maxBurst: number;
  totalMessages: number;
}

export function computeDoubleTexting(
  dataset: ParsedDataset,
  params: DoubleTextingParams,
): RankingData {
  const thresholdMs = parseMinutes(params.minutes) * 60_000;

  const sorted = [...dataset.userMessages]
    .filter((m) => m.autor)
    .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

  if (sorted.length < 2) {
    throw new StatError('Se necesitan al menos 2 mensajes', 'double-texting');
  }

  const stats: Record<string, AuthorStats> = {};
  for (const p of dataset.participantes) {
    stats[p] = {
      events: 0,
      burstSizesSum: 0,
      burstsCounted: 0,
      maxBurst: 0,
      totalMessages: dataset.metadata.counts.perAuthor[p] ?? 0,
    };
  }

  let burstAuthor: string | null = null;
  let burstStartIdx = 0;
  let burstHasDoubleText = false;

  for (let i = 0; i < sorted.length; i++) {
    const autor = sorted[i].autor as string;

    if (autor !== burstAuthor) {
      if (burstAuthor !== null && burstHasDoubleText) {
        const size = i - burstStartIdx;
        const s = stats[burstAuthor];
        if (s) {
          s.burstSizesSum += size;
          s.burstsCounted += 1;
          if (size > s.maxBurst) s.maxBurst = size;
        }
      }
      burstAuthor = autor;
      burstStartIdx = i;
      burstHasDoubleText = false;
      continue;
    }

    const gap = sorted[i].timestamp.getTime() - sorted[i - 1].timestamp.getTime();
    if (gap >= thresholdMs) {
      const s = stats[autor];
      if (s) s.events += 1;
      burstHasDoubleText = true;
    }
  }

  if (burstAuthor !== null && burstHasDoubleText) {
    const size = sorted.length - burstStartIdx;
    const s = stats[burstAuthor];
    if (s) {
      s.burstSizesSum += size;
      s.burstsCounted += 1;
      if (size > s.maxBurst) s.maxBurst = size;
    }
  }

  const rows = Object.entries(stats)
    .map(([autor, s]) => {
      const rate = s.totalMessages > 0 ? (s.events / s.totalMessages) * 100 : 0;
      const avgBurst = s.burstsCounted > 0 ? s.burstSizesSum / s.burstsCounted : 0;
      return {
        label: autor,
        value: Math.round(rate * 10) / 10,
        extra: s.events
          ? `${s.events} veces · hasta ${s.maxBurst} seguidos`
          : 'Ninguno',
      };
    })
    .sort((a, b) => b.value - a.value);

  if (rows.every((r) => r.value === 0)) {
    throw new StatError(
      `Nadie hizo double-texting con un umbral de ${parseMinutes(params.minutes)} min`,
      'double-texting',
    );
  }

  return { rows, valueLabel: 'Eventos por cada 100 mensajes' };
}

function parseMinutes(raw: unknown): number {
  const n = typeof raw === 'string' ? Number(raw) : typeof raw === 'number' ? raw : DEFAULT_MIN;
  if (!Number.isFinite(n) || n <= 0) return DEFAULT_MIN;
  return Math.min(n, 60 * 24);
}
