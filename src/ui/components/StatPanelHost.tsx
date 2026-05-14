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
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-900">{module.label}</h3>
        {module.description && (
          <p className="mt-1 text-sm text-slate-500">{module.description}</p>
        )}
      </div>

      {(showInitial || (module.needsParams && !isLoading)) && (
        <div className="mb-4 flex flex-wrap items-end gap-3">
          {module.paramsSchema?.fields.map((field) => (
            <div key={field.name} className="flex flex-col">
              <label className="text-xs font-medium text-slate-600">{field.label}</label>
              <input
                type={field.type}
                placeholder={field.placeholder}
                value={params[field.name] ?? ''}
                onChange={(e) => setParams((p) => ({ ...p, [field.name]: e.target.value }))}
                className="mt-1 rounded-md border border-slate-300 px-3 py-1.5 text-sm focus:border-whatsapp-teal focus:outline-none"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleRun}
            className="rounded-md bg-whatsapp-green px-4 py-2 text-sm font-medium text-white hover:bg-green-600"
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
        <StatPanel result={panel.outcome.result} />
      )}
    </section>
  );
}
