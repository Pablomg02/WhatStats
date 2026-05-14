const LINE_PREFIX = /^(\d{1,2})\/(\d{1,2})\/(\d{2,4}),\s(\d{1,2}):(\d{2})\s-\s/;

export interface ParsedPrefix {
  timestamp: Date;
  rest: string;
}

export function parseLinePrefix(line: string): ParsedPrefix | null {
  const match = LINE_PREFIX.exec(line);
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
  return LINE_PREFIX.test(line);
}
