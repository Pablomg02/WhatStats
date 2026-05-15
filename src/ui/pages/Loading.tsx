import { useSessionStore } from '@/state/session';
import { PageLayout } from '../layout/PageLayout';

export function Loading() {
  const error = useSessionStore((s) => s.parseError);

  return (
    <PageLayout>
      <div className="flex flex-col items-center justify-center gap-5 py-24 text-center">
        {!error ? (
          <>
            <div className="relative flex h-16 w-16 items-center justify-center">
              <div className="absolute inset-0 animate-spin rounded-full border-2 border-ws-green border-t-transparent" />
              <span className="text-2xl">💬</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-ws-text">Analizando tu chat…</h2>
              <p className="mt-1 text-sm text-ws-muted">
                Esto puede tardar unos segundos en chats grandes.
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-950 text-3xl">
              ⚠️
            </div>
            <div>
              <h2 className="text-lg font-bold text-red-400">No se pudo procesar el archivo</h2>
              <p className="mt-1 text-sm text-red-500">{error.message}</p>
            </div>
          </>
        )}
      </div>
    </PageLayout>
  );
}
