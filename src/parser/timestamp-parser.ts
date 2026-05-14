// Format A (Android/Spanish): "14/05/2026, 10:30 - "
const PREFIX_DASH = /^(\d{1,2})\/(\d{1,2})\/(\d{2,4}),\s(\d{1,2}):(\d{2})\s-\s/;
// Format B (iOS/English): "[2/8/22, 11:02:52] "
// iOS media/system lines are prefixed with U+200E (LRM), so the bracket may not be at position 0.
const PREFIX_BRACKET = /^[‎‏]?\[(\d{1,2})\/(\d{1,2})\/(\d{2,4}),\s(\d{1,2}):(\d{2})(?::\d{2})?\]\s/;

export interface ParsedPrefix {
  timestamp: Date;
  rest: string;
}

export function parseLinePrefix(line: string): ParsedPrefix | null {
  const match = PREFIX_DASH.exec(line) ?? PREFIX_BRACKET.exec(line);
  if (!match) return null;

  const [full, dStr, mStr, yStr, hStr, minStr] = match;
  const day = Number(dStr);
  const month = Number(mStr);
  const year = yStr.length === 2 ? 2000 + Number(yStr) : Number(yStr);
  const hour = Number(hStr);
  const minute = Number(minStr);

  const date = new Date(year, month - 1, day, hour, minute, 0, 0);
  if (Number.isNaN(date.getTime())) return null;

  return {
    timestamp: date,
    rest: line.slice(full.length),
  };
}

export function hasLinePrefix(line: string): boolean {
  return PREFIX_DASH.test(line) || PREFIX_BRACKET.test(line);
}
