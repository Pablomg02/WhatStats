import type { ParsedDataset } from '@/core/types/dataset';
import type { ParsedMessage } from '@/core/types/message';
import type { ChatSnippetData, ChatSnippetMessage } from '@/core/types/stat-result';
import { StatError } from '@/core/errors';

export interface RandomSnippetParams {
  count: number;
}

export function computeRandomSnippet(
  dataset: ParsedDataset,
  params: RandomSnippetParams,
): ChatSnippetData {
  const count = Math.max(2, Math.min(50, Math.floor(Number(params.count) || 10)));
  const msgs = dataset.userMessages;

  if (msgs.length < count) {
    throw new StatError(
      `El chat solo tiene ${msgs.length} mensajes, no se pueden mostrar ${count}`,
      'random-snippet',
    );
  }

  const start = Math.floor(Math.random() * (msgs.length - count + 1));
  const slice = msgs.slice(start, start + count);

  const messages: ChatSnippetMessage[] = slice.map((msg, i) => {
    const prev = slice[i - 1];
    const isFirstFromAuthor = !prev || prev.autor !== msg.autor;
    const dateStr = formatDate(msg.timestamp);
    const prevDate = prev ? formatDate(prev.timestamp) : null;

    return {
      author: msg.autor ?? 'Desconocido',
      time: formatTime(msg.timestamp),
      date: dateStr !== prevDate ? dateStr : undefined,
      text: formatText(msg),
      isFirstFromAuthor,
      isMedia: msg.kind === 'media',
      isDeleted: msg.kind === 'deleted',
    };
  });

  return { messages };
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function formatText(msg: ParsedMessage): string {
  switch (msg.kind) {
    case 'media':
      return msg.mensaje || 'Multimedia';
    case 'deleted':
      return 'Se eliminó este mensaje';
    case 'poll':
      return `Encuesta: ${msg.poll?.question ?? ''}`;
    default:
      return msg.mensaje;
  }
}
