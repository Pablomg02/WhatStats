import { useMemo, useState } from 'react';
import type { WordCloudData, WordCloudWord } from '@/core/types/stat-result';

const MIN_FONT = 12;
const MAX_FONT = 38;

const PALETTE = [
  '#00A884',
  '#25D366',
  '#53BDEB',
  '#F5B638',
  '#F15C6D',
  '#A06CD5',
];

export function WordCloud({ data }: { data: WordCloudData }) {
  const groups = data.groups.filter((g) => g.words.length > 0);
  const [active, setActive] = useState(0);

  if (groups.length === 0) {
    return <div className="text-sm text-ws-muted">No hay palabras suficientes.</div>;
  }

  if (groups.length === 1) {
    return (
      <div className="flex flex-col gap-3">
        <div className="text-sm font-medium text-ws-text">{groups[0].label}</div>
        <Cloud words={groups[0].words} colorIndex={0} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {groups.map((g, i) => (
          <button
            key={g.label}
            type="button"
            onClick={() => setActive(i)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition ${
              i === active
                ? 'bg-ws-green text-white'
                : 'bg-ws-surface text-ws-muted ring-1 ring-ws-border hover:bg-ws-card hover:text-ws-text'
            }`}
          >
            {g.label}
          </button>
        ))}
      </div>
      <Cloud words={groups[active].words} colorIndex={active} />
    </div>
  );
}

function Cloud({ words, colorIndex }: { words: WordCloudWord[]; colorIndex: number }) {
  const items = useMemo(() => layoutWords(words, colorIndex), [words, colorIndex]);

  return (
    <div className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1 rounded-lg border border-ws-border bg-ws-surface px-5 py-6 leading-tight">
      {items.map((it) => (
        <span
          key={it.text}
          className="cursor-default font-semibold transition-transform hover:scale-110"
          style={{
            fontSize: `${it.fontSize}px`,
            color: it.color,
            opacity: it.opacity,
          }}
          title={`${it.text}: ${it.weight}`}
        >
          {it.text}
        </span>
      ))}
    </div>
  );
}

interface LaidOutWord {
  text: string;
  weight: number;
  fontSize: number;
  color: string;
  opacity: number;
}

function layoutWords(words: WordCloudWord[], colorIndex: number): LaidOutWord[] {
  if (words.length === 0) return [];
  const sorted = [...words].sort((a, b) => b.weight - a.weight);
  const max = sorted[0].weight;
  const min = sorted[sorted.length - 1].weight;
  const range = Math.max(1, max - min);
  const baseColor = PALETTE[colorIndex % PALETTE.length];

  return sorted.map((w, i) => {
    const norm = (w.weight - min) / range;
    const fontSize = Math.round(MIN_FONT + Math.pow(norm, 0.7) * (MAX_FONT - MIN_FONT));
    const opacity = 0.55 + 0.45 * norm;
    const color = i < 3 ? baseColor : i < 10 ? mix(baseColor, '#E9EDEF', 0.35) : '#8696A0';
    return { text: w.text, weight: w.weight, fontSize, color, opacity };
  });
}

function mix(hexA: string, hexB: string, t: number): string {
  const a = parseHex(hexA);
  const b = parseHex(hexB);
  const r = Math.round(a[0] + (b[0] - a[0]) * t);
  const g = Math.round(a[1] + (b[1] - a[1]) * t);
  const bl = Math.round(a[2] + (b[2] - a[2]) * t);
  return `rgb(${r}, ${g}, ${bl})`;
}

function parseHex(h: string): [number, number, number] {
  const s = h.replace('#', '');
  return [
    parseInt(s.slice(0, 2), 16),
    parseInt(s.slice(2, 4), 16),
    parseInt(s.slice(4, 6), 16),
  ];
}
