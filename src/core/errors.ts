export class ParseError extends Error {
  constructor(message: string, public readonly line?: number) {
    super(message);
    this.name = 'ParseError';
  }
}

export class StatError extends Error {
  constructor(message: string, public readonly statId?: string, public readonly cause?: unknown) {
    super(message);
    this.name = 'StatError';
  }
}

export interface SerializedError {
  name: string;
  message: string;
  statId?: string;
}

export function serializeError(err: unknown, statId?: string): SerializedError {
  if (err instanceof StatError) {
    return { name: err.name, message: err.message, statId: err.statId ?? statId };
  }
  if (err instanceof Error) {
    return { name: err.name, message: err.message, statId };
  }
  return { name: 'UnknownError', message: String(err), statId };
}
