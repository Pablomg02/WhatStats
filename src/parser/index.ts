import type { ParsedMessage } from '@/core/types/message';
import type { ParsedDataset, DatasetMetadata, ChatType } from '@/core/types/dataset';
import { ParseError } from '@/core/errors';
import { parseLinePrefix, hasLinePrefix } from './timestamp-parser';
import { stripInvisibleMarks, startsWithLrm, extractMentions, containsLink } from './text-normalize';
import { detectSystemEvent } from './system-events';
import { classifyContent } from './content-classifier';

// Android: " <Se editó este mensaje.>"  |  iOS: " ‎<This message was edited>"
const EDITED_RE = / ‎?<(?:Se editó este mensaje\.|This message was edited)>$/;

function stripEditedSuffix(body: string): { body: string; isEdited: boolean } {
  if (EDITED_RE.test(body)) {
    return { body: body.replace(EDITED_RE, ''), isEdited: true };
  }
  return { body, isEdited: false };
}

interface RawEntry {
  timestamp: Date;
  rawRest: string;
  lines: string[];
}

function collectRawEntries(text: string): RawEntry[] {
  const lines = text.split(/\r?\n/);
  const entries: RawEntry[] = [];
  let current: RawEntry | null = null;
  // anchorTs is the timestamp of the last accepted real entry. Lines with a parseable
  // prefix whose timestamp is strictly earlier are treated as pasted content (e.g. someone
  // quoting an older chat export) and folded into the previous real message verbatim.
  let anchorTs = -Infinity;

  for (const line of lines) {
    const prefix = parseLinePrefix(line);
    if (prefix) {
      const ts = prefix.timestamp.getTime();
      if (current && ts < anchorTs) {
        current.lines.push(line);
        continue;
      }
      if (current) entries.push(current);
      current = { timestamp: prefix.timestamp, rawRest: prefix.rest, lines: [prefix.rest] };
      anchorTs = ts;
    } else if (current) {
      current.lines.push(line);
    }
  }
  if (current) entries.push(current);
  return entries;
}

function buildMessage(entry: RawEntry): ParsedMessage {
  const fullContent = entry.lines.join('\n');
  const trimmedFirst = entry.rawRest;
  const isSystemHint = startsWithLrm(trimmedFirst);

  const colonIdx = trimmedFirst.indexOf(': ');
  const looksLikeUserMessage = !isSystemHint && colonIdx > 0 && colonIdx < 200;

  if (!looksLikeUserMessage) {
    const cleaned = stripInvisibleMarks(fullContent);
    const detection = detectSystemEvent(cleaned);
    return {
      timestamp: entry.timestamp,
      autor: detection?.actor ?? null,
      mensaje: cleaned,
      kind: 'text',
      isSystem: true,
      systemEvent: detection?.event ?? { kind: 'unknown-system' },
    };
  }

  const autor = stripInvisibleMarks(trimmedFirst.slice(0, colonIdx)).trim();
  const firstLineBody = trimmedFirst.slice(colonIdx + 2);
  const remaining = entry.lines.slice(1).join('\n');
  const body = remaining ? `${firstLineBody}\n${remaining}` : firstLineBody;

  // iOS quirk: system events (member-added, etc.) appear as "[DATE] Person: ‎event text"
  // instead of the Android format "DATE - ‎event text". Detect by LRM-prefixed body.
  if (startsWithLrm(firstLineBody)) {
    const cleanedBody = stripInvisibleMarks(firstLineBody);
    const detection = detectSystemEvent(cleanedBody);
    if (detection) {
      return {
        timestamp: entry.timestamp,
        autor: detection.actor,
        mensaje: cleanedBody,
        kind: 'text',
        isSystem: true,
        systemEvent: detection.event,
      };
    }
  }

  const { body: bodyForClassify, isEdited } = stripEditedSuffix(body);
  const classification = classifyContent(bodyForClassify);
  const cleanedBody = stripInvisibleMarks(bodyForClassify);

  return {
    timestamp: entry.timestamp,
    autor,
    mensaje: cleanedBody,
    kind: classification.kind,
    isSystem: false,
    poll: classification.poll,
    mentions: extractMentions(bodyForClassify),
    hasLink: containsLink(cleanedBody),
    isEdited: isEdited || undefined,
  };
}

function buildMetadata(mensajes: ParsedMessage[], userMessages: ParsedMessage[]): DatasetMetadata {
  if (userMessages.length === 0) {
    throw new ParseError('No se encontraron mensajes de usuario en el archivo');
  }

  const perAuthor: Record<string, number> = {};
  for (const msg of userMessages) {
    if (msg.autor) perAuthor[msg.autor] = (perAuthor[msg.autor] ?? 0) + 1;
  }

  const participantes = Object.keys(perAuthor);
  const chatType: ChatType = detectChatType(mensajes, participantes);
  const chatName = detectChatName(mensajes);

  const sortedTs = [...userMessages].sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

  return {
    chatType,
    chatName,
    firstMessage: sortedTs[0].timestamp,
    lastMessage: sortedTs[sortedTs.length - 1].timestamp,
    counts: {
      total: userMessages.length,
      perAuthor,
    },
  };
}

function detectChatType(mensajes: ParsedMessage[], participantes: string[]): ChatType {
  const hasGroupEvent = mensajes.some(
    (m) =>
      m.isSystem &&
      m.systemEvent &&
      ['group-created', 'member-added', 'member-joined-via-community', 'community-added'].includes(
        m.systemEvent.kind,
      ),
  );
  if (hasGroupEvent) return 'group';
  if (participantes.length > 2) return 'group';
  return 'individual';
}

function detectChatName(mensajes: ParsedMessage[]): string | null {
  for (const m of mensajes) {
    if (m.isSystem && m.systemEvent?.kind === 'group-created') {
      const name = m.systemEvent.payload?.groupName;
      if (typeof name === 'string') return name;
    }
    if (m.isSystem && m.systemEvent?.kind === 'community-added') {
      const name = m.systemEvent.payload?.community;
      if (typeof name === 'string') return name;
    }
  }
  return null;
}

export function parseWhatsAppTxt(text: string): ParsedDataset {
  if (!text || text.trim().length === 0) {
    throw new ParseError('El archivo está vacío');
  }

  const entries = collectRawEntries(text);
  if (entries.length === 0) {
    throw new ParseError('No se reconoció el formato del chat de WhatsApp');
  }

  const mensajes = entries.map(buildMessage);
  const userMessages = mensajes.filter((m) => !m.isSystem && m.autor);
  const metadata = buildMetadata(mensajes, userMessages);

  return {
    mensajes,
    userMessages,
    participantes: Object.keys(metadata.counts.perAuthor),
    metadata,
  };
}

export { hasLinePrefix };
