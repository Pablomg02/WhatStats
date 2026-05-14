import type { ParsedDataset } from '@/core/types/dataset';
import type { StatResult } from '@/core/types/stat-result';
import { StatError, serializeError, type SerializedError } from '@/core/errors';
import type { AnyStatModule } from './types';

export interface StatRunSuccess {
  ok: true;
  result: StatResult;
}

export interface StatRunFailure {
  ok: false;
  error: SerializedError;
}

export type StatRunOutcome = StatRunSuccess | StatRunFailure;

export function runStat(
  module: AnyStatModule,
  dataset: ParsedDataset,
  params: unknown,
): StatRunOutcome {
  try {
    const result = module.compute(dataset, params as never);
    return { ok: true, result };
  } catch (err) {
    const wrapped =
      err instanceof StatError ? err : new StatError(`Error en stat '${module.id}'`, module.id, err);
    return { ok: false, error: serializeError(wrapped, module.id) };
  }
}
