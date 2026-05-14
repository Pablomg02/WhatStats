import { create } from 'zustand';
import type { DatasetMetadata } from '@/core/types/dataset';
import type { StatRunOutcome } from '@/stats/runner';
import type { SerializedError } from '@/core/errors';
import { getStatsWorker } from '@/worker/worker-client';

export type SessionPhase = 'idle' | 'parsing' | 'ready' | 'error';

interface StatPanelState {
  status: 'idle' | 'loading' | 'success' | 'error';
  outcome?: StatRunOutcome;
}

interface SessionState {
  phase: SessionPhase;
  parseError: SerializedError | null;
  metadata: DatasetMetadata | null;
  participantes: string[];
  activeStatId: string | null;
  panels: Record<string, StatPanelState>;

  parseFile: (text: string) => Promise<void>;
  setActiveStat: (id: string | null) => void;
  runStat: (id: string, params: unknown) => Promise<void>;
  reset: () => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  phase: 'idle',
  parseError: null,
  metadata: null,
  participantes: [],
  activeStatId: null,
  panels: {},

  async parseFile(text: string) {
    set({ phase: 'parsing', parseError: null });
    const worker = getStatsWorker();
    const result = await worker.parse(text);
    if (result.ok) {
      set({
        phase: 'ready',
        metadata: result.metadata,
        participantes: result.participantes,
      });
    } else {
      set({ phase: 'error', parseError: result.error });
    }
  },

  setActiveStat(id) {
    set({ activeStatId: id });
  },

  async runStat(id, params) {
    set((s) => ({ panels: { ...s.panels, [id]: { status: 'loading' } } }));
    const worker = getStatsWorker();
    const outcome = await worker.runStat(id, params);
    set((s) => ({
      panels: {
        ...s.panels,
        [id]: { status: outcome.ok ? 'success' : 'error', outcome },
      },
    }));
  },

  reset() {
    const worker = getStatsWorker();
    void worker.reset();
    set({
      phase: 'idle',
      parseError: null,
      metadata: null,
      participantes: [],
      activeStatId: null,
      panels: {},
    });
  },
}));
