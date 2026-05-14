export type SystemEventKind =
  | 'e2e-notice'
  | 'group-created'
  | 'group-name-changed'
  | 'group-icon-changed'
  | 'group-description-changed'
  | 'member-added'
  | 'member-removed'
  | 'member-left'
  | 'member-joined-via-community'
  | 'community-added'
  | 'phone-changed'
  | 'ephemeral-toggled'
  | 'unknown-system';

export type MessageKind = 'text' | 'media' | 'deleted' | 'poll';

export interface PollOption {
  label: string;
  votes: number;
}

export interface PollContent {
  question: string;
  options: PollOption[];
}

export interface SystemEvent {
  kind: SystemEventKind;
  payload?: Record<string, unknown>;
}

export interface ParsedMessage {
  timestamp: Date;
  autor: string | null;
  mensaje: string;
  kind: MessageKind;
  isSystem: boolean;
  systemEvent?: SystemEvent;
  poll?: PollContent;
  mentions?: string[];
  hasLink?: boolean;
  isEdited?: boolean;
}
