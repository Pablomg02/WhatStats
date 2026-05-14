import type { SerializedError } from '@/core/errors';

export function ErrorState({ error, onRetry }: { error: SerializedError; onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-4">
      <div className="text-sm font-semibold text-red-700">No se pudo calcular esta stat</div>
      <div className="text-xs text-red-600">{error.message}</div>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-2 rounded bg-red-600 px-3 py-1 text-xs font-medium text-white hover:bg-red-700"
        >
          Reintentar
        </button>
      )}
    </div>
  );
}
