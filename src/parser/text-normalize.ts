const LRM = '‎';
const FSI = '⁨';
const PDI = '⁩';
const RLM = '‏';

export function stripInvisibleMarks(text: string): string {
  return text.replace(/[‎‏⁦⁧⁨⁩‪-‮]/g, '');
}

export function startsWithLrm(text: string): boolean {
  return text.startsWith(LRM);
}

export function extractMentions(text: string): string[] {
  const mentions: string[] = [];
  const regex = new RegExp(`@${FSI}([^${PDI}]+)${PDI}`, 'g');
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    mentions.push(match[1]);
  }
  return mentions;
}

const URL_REGEX = /https?:\/\/\S+/i;
export function containsLink(text: string): boolean {
  return URL_REGEX.test(text);
}

export const INVISIBLE = { LRM, FSI, PDI, RLM };
