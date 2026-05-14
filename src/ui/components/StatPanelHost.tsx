import { useState } from 'react';
import type { AnyStatModule } from '@/stats/types';
import { useSessionStore } from '@/state/session';
import { StatPanel } from '@/renderer/StatPanel';
import { LoadingState } from '@/renderer/states/LoadingState';
import { ErrorState } from '@/renderer/states/ErrorState';

interface StatPanelHostProps {
  module: AnyStatModule;
}

export function StatPanelHost({ module }: StatPanelHostProps) {
  const panel = useSessionStore((s) => s.panels[module.id]);
  const runStat = useSessionStore((s) => s.runStat);
  const [params, setParams] = useState<Record<string, string>>({});

  const handleRun = () => {
    if (module.needsParams && module.paramsSchema) {
      const missing = module.paramsSchema.fields
        .filter((f) => f.required)
        .find((f) => !params[f.name]?.trim());
      if (missing) return;
      void runStat(module.id, params);
    } else {
      void runStat(module.id, undefined);
    }
  };

  const showInitial = !panel || panel.status === 'idle';
  const isLoading = panel?.status === 'loading';
  const isError = panel?.status === 'error' && panel.outcome && !panel.outcome.ok;
  const isSuccess = panel?.status === 'success' && panel.outcome && panel.outcome.ok;

  return (
    <section className="rounded-xl border border-ws-border bg-ws-card p-6 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-ws-text">{module.label}</h3>
        {module.description && (
          <p className="mt-1 text-sm text-ws-muted">{module.description}</p>
        )}
      </div>

      {(showInitial || (module.needsParams && !isLoading)) && (
        <div className="mb-4 flex flex-wrap items-end gap-3">
          {module.paramsSchema?.fields.map((field) => (
            <div key={field.name} className="flex flex-col">
              <label className="text-xs font-medium text-ws-muted">{field.label}</label>
              <input
                type={field.type}
                placeholder={field.placeholder}
                min={field.min}
                max={field.max}
                value={params[field.name] ?? ''}
                onChange={(e) => setParams((p) => ({ ...p, [field.name]: e.target.value }))}
                className="mt-1 rounded-md border border-ws-border bg-ws-surface px-3 py-1.5 text-sm text-ws-text placeholder-ws-muted focus:border-ws-green focus:outline-none"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleRun}
            className="rounded-md bg-ws-green px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
          >
            Ejecutar
          </button>
        </div>
      )}

      {isLoading && <LoadingState />}
      {isError && panel.outcome && !panel.outcome.ok && (
        <ErrorState error={panel.outcome.error} onRetry={handleRun} />
      )}
      {isSuccess && panel.outcome && panel.outcome.ok && (
        <>
          <StatPanel result={panel.outcome.result} />
          {module.rerollable && (
            <div className="mt-4 flex justify-center">
              <button
                type="button"
                onClick={handleRun}
                className="flex items-center gap-2 rounded-md border border-ws-border bg-ws-surface px-4 py-2 text-sm text-ws-muted transition hover:border-ws-green hover:text-ws-green"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
                Otro fragmento
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
