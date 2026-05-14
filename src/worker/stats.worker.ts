import * as Comlink from 'comlink';
import { parseWhatsAppTxt } from '@/parser';
import { getStatModule } from '@/stats/registry';
import { runStat, type StatRunOutcome } from '@/stats/runner';
import type { ParsedDataset } from '@/core/types/dataset';
import { serializeError } from '@/core/errors';

let dataset: ParsedDataset | null = null;
const cache = new Map<string, StatRunOutcome>();

function cacheKey(statId: string, params: unknown): string {
  return `${statId}::${JSON.stringify(params ?? null)}`;
}

const api = {
  async parse(text: string): Promise<{ ok: true; metadata: ParsedDataset['metadata']; participantes: string[] } | { ok: false; error: ReturnType<typeof serializeError> }> {
    try {
      dataset = parseWhatsAppTxt(text);
      cache.clear();
      return { ok: true, metadata: dataset.metadata, participantes: dataset.participantes };
    } catch (err) {
      return { ok: false, error: serializeError(err) };
    }
  },

  async runStat(statId: string, params: unknown): Promise<StatRunOutcome> {
    if (!dataset) {
      return { ok: false, error: { name: 'NoDataset', message: 'No hay dataset cargado', statId } };
    }
    const mod = getStatModule(statId);
    if (!mod) {
      return { ok: false, error: { name: 'UnknownStat', message: `Stat desconocida: ${statId}`, statId } };
    }
    if (!mod.rerollable) {
      const key = cacheKey(statId, params);
      const cached = cache.get(key);
      if (cached) return cached;
      const outcome = runStat(mod, dataset, params);
      cache.set(key, outcome);
      return outcome;
    }
    return runStat(mod, dataset, params);
  },

  async reset(): Promise<void> {
    dataset = null;
    cache.clear();
  },
};

export type StatsWorkerApi = typeof api;

Comlink.expose(api);
