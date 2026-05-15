import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSessionStore } from '@/state/session';
import { getStatModule } from '@/stats/registry';
import { ChatHeader } from '../components/ChatHeader';
import { StatSelector } from '../components/StatSelector';
import { StatPanelHost } from '../components/StatPanelHost';
import { PageLayout } from '../layout/PageLayout';

export function Dashboard() {
  const navigate = useNavigate();
  const phase = useSessionStore((s) => s.phase);
  const metadata = useSessionStore((s) => s.metadata);
  const activeStatId = useSessionStore((s) => s.activeStatId);
  const setActiveStat = useSessionStore((s) => s.setActiveStat);
  const reset = useSessionStore((s) => s.reset);

  useEffect(() => {
    if (phase !== 'ready') navigate('/', { replace: true });
  }, [phase, navigate]);

  if (!metadata) return null;

  const activeModule = activeStatId ? getStatModule(activeStatId) : null;

  const handleReset = () => {
    reset();
    navigate('/');
  };

  return (
    <PageLayout>
      <div className="flex flex-col gap-6">
        <ChatHeader metadata={metadata} onReset={handleReset} />
        <StatSelector activeStatId={activeStatId} onSelect={setActiveStat} />

        {activeModule && <StatPanelHost module={activeModule} />}

        {!activeModule && (
          <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-ws-border bg-ws-card/40 py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-ws-surface text-3xl">
              📊
            </div>
            <div>
              <p className="text-sm font-semibold text-ws-text">Selecciona una estadística</p>
              <p className="mt-1 text-xs text-ws-muted">
                Elige una opción de arriba para empezar a explorar el chat.
              </p>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
