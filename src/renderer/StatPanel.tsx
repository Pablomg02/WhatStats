import type { StatResult } from '@/core/types/stat-result';
import { renderers } from './renderers';

interface StatPanelProps {
  result: StatResult;
}

export function StatPanel({ result }: StatPanelProps) {
  const Renderer = renderers[result.kind] as React.ComponentType<{ data: unknown }>;
  if (!Renderer) {
    return <div className="text-sm text-red-600">Tipo de resultado no soportado: {result.kind}</div>;
  }
  return <Renderer data={result.data} />;
}
