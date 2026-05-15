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
    <section className="rounded-2xl border border-ws-border bg-ws-card overflow-hidden shadow-sm">
      {/* Gradient accent */}
      <div
        className="h-0.5"
        style={{ background: 'linear-gradient(90deg, rgba(37,211,102,0.7) 0%, rgba(0,168,132,0.3) 60%, transparent 100%)' }}
      />

      <div className="p-5 sm:p-6">
        {/* Header */}
        <div className="mb-5">
          <h3 className="text-lg font-bold text-ws-text">{module.label}</h3>
          {module.description && (
            <p className="mt-1 text-sm text-ws-muted leading-relaxed">{module.description}</p>
          )}
        </div>

        {/* Params + run button */}
        {(showInitial || (module.needsParams && !isLoading)) && (
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
            {module.paramsSchema?.fields.map((field) => (
              <div key={field.name} className="flex flex-col">
                <label className="text-xs font-semibold text-ws-muted">{field.label}</label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  min={field.min}
                  max={field.max}
                  value={params[field.name] ?? ''}
                  onChange={(e) => setParams((p) => ({ ...p, [field.name]: e.target.value }))}
                  className="mt-1 rounded-lg border border-ws-border bg-ws-surface px-3 py-2 text-sm text-ws-text placeholder-ws-muted/60 focus:border-ws-green focus:outline-none transition"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={handleRun}
              className="w-full rounded-lg px-5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:w-auto"
              style={{ background: 'linear-gradient(135deg, #25D366 0%, #00A884 100%)' }}
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
              <div className="mt-5 flex justify-center">
                <button
                  type="button"
                  onClick={handleRun}
                  className="flex items-center gap-2 rounded-lg border border-ws-border bg-ws-surface px-4 py-2 text-sm font-medium text-ws-muted transition hover:border-ws-green hover:text-ws-green"
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
      </div>
    </section>
  );
}
