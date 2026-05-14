import type { MessageKind, PollContent } from '@/core/types/message';
import { stripInvisibleMarks } from './text-normalize';

// Android media placeholder: "<Multimedia omitido>" (ES) or "<Media omitted>" (EN).
// Covers any "<… omitido/omitida/omitted>" to stay robust across app languages.
const ANDROID_MEDIA_RE = /^<[^<>]+ omit(?:ted|ido|ida)>$/;

// iOS media: LRM + "<type> omitted/omitido/omitida" at end of body.
// Covers English ("image omitted") and Spanish ("imagen omitida", "vídeo omitido", etc.).
const IOS_MEDIA_RE =
  /‎(?:image|imagen|sticker|video|vídeo|audio|GIF|document|documento|Contact Card|location) omit(?:ted|ido|ida)$/i;

const DELETED_TOKENS = [
  // Spanish (Android)
  'Se eliminó este mensaje.',
  'Eliminaste este mensaje.',
  // English (iOS)
  'This message was deleted.',
  'You deleted this message.',
];

export interface ContentClassification {
  kind: MessageKind;
  poll?: PollContent;
}

export function classifyContent(body: string): ContentClassification {
  const trimmed = body.trim();
  const stripped = stripInvisibleMarks(trimmed);

  if (ANDROID_MEDIA_RE.test(stripped) || IOS_MEDIA_RE.test(trimmed)) {
    return { kind: 'media' };
  }
  if (DELETED_TOKENS.includes(stripped)) {
    return { kind: 'deleted' };
  }
  if (stripped.startsWith('ENCUESTA:') || stripped.startsWith('POLL:')) {
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
  if (!lines[0].startsWith('ENCUESTA:') && !lines[0].startsWith('POLL:')) return null;

  const question = lines[1];
  const options: PollContent['options'] = [];

  for (let i = 2; i < lines.length; i++) {
    // Spanish: "OPCIÓN: Label (N votos)"  |  English: "OPTION: Label (N votes)"
    const m = /^(?:OPCIÓN|OPTION):\s*(.+?)\s*\((\d+)\s*(?:votos?|votes?)\)$/i.exec(lines[i]);
    if (m) {
      options.push({ label: m[1].trim(), votes: Number(m[2]) });
    }
  }

  if (options.length === 0) return null;
  return { question, options };
}
