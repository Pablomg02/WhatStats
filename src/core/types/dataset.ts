import type { ParsedMessage } from './message';

export type ChatType = 'group' | 'individual';

export interface DatasetMetadata {
  chatType: ChatType;
  chatName: string | null;
  firstMessage: Date;
  lastMessage: Date;
  counts: {
    total: number;
    perAuthor: Record<string, number>;
  };
}

export interface ParsedDataset {
  mensajes: ParsedMessage[];
  userMessages: ParsedMessage[];
  participantes: string[];
  metadata: DatasetMetadata;
}
