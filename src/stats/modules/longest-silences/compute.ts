import type { ParsedDataset } from '@/core/types/dataset';
import type { RankingData } from '@/core/types/stat-result';

export interface LongestSilencesParams {
  n?: string | number;
}

export function computeLongestSilences(
  dataset: ParsedDataset,
  params: LongestSilencesParams,
): RankingData {
  const n = clampN(params.n, 10);
  const sorted = [...dataset.userMessages].sort(
    (a, b) => a.timestamp.getTime() - b.timestamp.getTime(),
  );

  const gaps: { from: Date; to: Date; ms: number }[] = [];
  for (let i = 1; i < sorted.length; i++) {
    const ms = sorted[i].timestamp.getTime() - sorted[i - 1].timestamp.getTime();
    if (ms <= 0) continue;
    gaps.push({ from: sorted[i - 1].timestamp, to: sorted[i].timestamp, ms });
  }

  const top = gaps.sort((a, b) => b.ms - a.ms).slice(0, n);

  const rows = top.map((gap) => {
    const hours = Math.round((gap.ms / 3_600_000) * 10) / 10;
    return {
      label: `${formatDate(gap.from)} → ${formatDate(gap.to)}`,
      value: hours,
      extra: formatDuration(gap.ms),
    };
  });

  return { rows, valueLabel: 'Horas' };
}

function formatDate(d: Date): string {
  return d.toLocaleString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatDuration(ms: number): string {
  const totalMin = Math.floor(ms / 60_000);
  const days = Math.floor(totalMin / 1440);
  const hours = Math.floor((totalMin % 1440) / 60);
  const minutes = totalMin % 60;
  const parts: string[] = [];
  if (days) parts.push(`${days}d`);
  if (hours) parts.push(`${hours}h`);
  if (minutes) parts.push(`${minutes}m`);
  return parts.join(' ') || '0m';
}

function clampN(raw: unknown, fallback: number): number {
  const n = typeof raw === 'string' ? Number(raw) : typeof raw === 'number' ? raw : fallback;
  if (!Number.isFinite(n) || n <= 0) return fallback;
  return Math.min(Math.floor(n), 50);
}
