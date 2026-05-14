import type { SerializedError } from '@/core/errors';

export function ErrorState({ error, onRetry }: { error: SerializedError; onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-start gap-2 rounded-lg border border-red-900 bg-red-950 p-4">
      <div className="text-sm font-semibold text-red-400">No se pudo calcular esta stat</div>
      <div className="text-xs text-red-500">{error.message}</div>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-2 rounded bg-red-700 px-3 py-1 text-xs font-medium text-white transition hover:bg-red-600"
        >
          Reintentar
        </button>
      )}
    </div>
  );
}
