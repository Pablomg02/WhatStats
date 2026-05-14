import type { ParsedDataset } from '@/core/types/dataset';
import type { ScatterQuadrantData } from '@/core/types/stat-result';
import { StatError } from '@/core/errors';

export interface ConversationStarterEnderParams {
  hours?: string | number;
}

const DEFAULT_HOURS = 48;

export function computeConversationStarterEnder(
  dataset: ParsedDataset,
  params: ConversationStarterEnderParams,
): ScatterQuadrantData {
  const thresholdMs = parseHours(params.hours) * 3_600_000;

  const sorted = [...dataset.userMessages]
    .filter((m) => m.autor)
    .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

  if (sorted.length < 2) {
    throw new StatError('Se necesitan al menos 2 mensajes', 'conversation-starter-ender');
  }

  const starters: Record<string, number> = {};
  const enders: Record<string, number> = {};
  for (const p of dataset.participantes) {
    starters[p] = 0;
    enders[p] = 0;
  }

  let totalSilences = 0;
  for (let i = 1; i < sorted.length; i++) {
    const gap = sorted[i].timestamp.getTime() - sorted[i - 1].timestamp.getTime();
    if (gap < thresholdMs) continue;
    const starter = sorted[i].autor as string;
    const ender = sorted[i - 1].autor as string;
    starters[starter] = (starters[starter] ?? 0) + 1;
    enders[ender] = (enders[ender] ?? 0) + 1;
    totalSilences += 1;
  }

  if (totalSilences === 0) {
    throw new StatError(
      `No se encontraron silencios mayores de ${parseHours(params.hours)}h`,
      'conversation-starter-ender',
    );
  }

  const balance = totalSilences > 0 ? 100 / dataset.participantes.length : 50;

  const points = dataset.participantes.map((label) => {
    const x = (starters[label] / totalSilences) * 100;
    const y = (enders[label] / totalSilences) * 100;
    return {
      label,
      x: Math.round(x * 10) / 10,
      y: Math.round(y * 10) / 10,
      extra: `${starters[label]} aperturas · ${enders[label]} cierres (de ${totalSilences} silencios)`,
    };
  });

  return {
    points,
    xLabel: 'Aperturas (reach-out)',
    yLabel: 'Cierres (last word)',
    xMin: 0,
    xMax: 100,
    yMin: 0,
    yMax: 100,
    xThreshold: balance,
    yThreshold: balance,
    quadrantLabels: {
      topLeft: 'Distante',
      topRight: 'Dominante',
      bottomLeft: 'Ausente',
      bottomRight: 'Ansioso',
    },
  };
}

function parseHours(raw: unknown): number {
  const n = typeof raw === 'string' ? Number(raw) : typeof raw === 'number' ? raw : DEFAULT_HOURS;
  if (!Number.isFinite(n) || n <= 0) return DEFAULT_HOURS;
  return Math.min(n, 24 * 60);
}
