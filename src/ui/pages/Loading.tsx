import { useSessionStore } from '@/state/session';
import { PageLayout } from '../layout/PageLayout';

export function Loading() {
  const error = useSessionStore((s) => s.parseError);

  return (
    <PageLayout>
      <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
        {!error ? (
          <>
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-ws-green border-t-transparent" />
            <h2 className="text-lg font-semibold text-ws-text">Analizando tu chat…</h2>
            <p className="text-sm text-ws-muted">
              Esto puede tardar unos segundos en chats grandes.
            </p>
          </>
        ) : (
          <>
            <div className="text-4xl">⚠️</div>
            <h2 className="text-lg font-semibold text-red-400">No se pudo procesar el archivo</h2>
            <p className="text-sm text-red-500">{error.message}</p>
          </>
        )}
      </div>
    </PageLayout>
  );
}
