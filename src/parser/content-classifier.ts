import type { MessageKind, PollContent } from '@/core/types/message';
import { stripInvisibleMarks } from './text-normalize';

const MEDIA_TOKEN = '<Multimedia omitido>';
const DELETED_TOKENS = ['Se eliminó este mensaje.', 'Eliminaste este mensaje.'];

export interface ContentClassification {
  kind: MessageKind;
  poll?: PollContent;
}

export function classifyContent(body: string): ContentClassification {
  const trimmed = body.trim();

  if (trimmed === MEDIA_TOKEN) {
    return { kind: 'media' };
  }
  if (DELETED_TOKENS.includes(trimmed)) {
    return { kind: 'deleted' };
  }
  if (trimmed.startsWith('ENCUESTA:')) {
    const poll = parsePoll(trimmed);
    if (poll) return { kind: 'poll', poll };
  }
  return { kind: 'text' };
}

function parsePoll(body: string): PollContent | null {
  const lines = stripInvisibleMarks(body)
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
  if (lines.length < 2) return null;
  if (!lines[0].startsWith('ENCUESTA:')) return null;

  const question = lines[1];
  const options: PollContent['options'] = [];

  for (let i = 2; i < lines.length; i++) {
    const m = /^OPCIÓN:\s*(.+?)\s*\((\d+)\s*votos?\)$/i.exec(lines[i]);
    if (m) {
      options.push({ label: m[1].trim(), votes: Number(m[2]) });
    }
  }

  if (options.length === 0) return null;
  return { question, options };
}
