import * as Comlink from 'comlink';
import type { StatsWorkerApi } from './stats.worker';

let workerInstance: Worker | null = null;
let apiInstance: Comlink.Remote<StatsWorkerApi> | null = null;

export function getStatsWorker(): Comlink.Remote<StatsWorkerApi> {
  if (!apiInstance) {
    workerInstance = new Worker(new URL('./stats.worker.ts', import.meta.url), { type: 'module' });
    apiInstance = Comlink.wrap<StatsWorkerApi>(workerInstance);
  }
  return apiInstance;
}

export function terminateStatsWorker(): void {
  workerInstance?.terminate();
  workerInstance = null;
  apiInstance = null;
}
