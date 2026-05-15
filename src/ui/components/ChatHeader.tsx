import type { DatasetMetadata } from '@/core/types/dataset';

interface ChatHeaderProps {
  metadata: DatasetMetadata;
  onReset: () => void;
}

export function ChatHeader({ metadata, onReset }: ChatHeaderProps) {
  const isGroup = metadata.chatType === 'group';
  const title = metadata.chatName ?? (isGroup ? 'Grupo sin nombre' : 'Conversación individual');

  return (
    <header className="rounded-2xl border border-ws-border bg-ws-card overflow-hidden shadow-sm">
      {/* Accent top bar */}
      <div
        className="h-1"
        style={{ background: 'linear-gradient(90deg, #25D366 0%, #00A884 50%, #128C7E 100%)' }}
      />

      <div className="p-5 sm:p-6">
        {/* Title row */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-ws-green/15 text-xl">
              {isGroup ? '👥' : '💬'}
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-bold uppercase tracking-widest text-ws-muted">
                {isGroup ? 'Grupo' : 'Conversación individual'}
              </div>
              <h2 className="mt-0.5 truncate text-xl font-bold text-ws-text">{title}</h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onReset}
            className="flex-shrink-0 rounded-lg border border-ws-border px-3 py-1.5 text-xs font-medium text-ws-muted transition hover:border-ws-green hover:text-ws-green"
          >
            ← Otro chat
          </button>
        </div>

        {/* KPI grid */}
        <div className="mt-5 grid grid-cols-2 gap-2 md:grid-cols-4">
          <Stat label="Mensajes" value={metadata.counts.total.toLocaleString()} />
          <Stat label="Participantes" value={Object.keys(metadata.counts.perAuthor).length} />
          <Stat label="Primer mensaje" value={formatDate(metadata.firstMessage)} />
          <Stat label="Último mensaje" value={formatDate(metadata.lastMessage)} />
        </div>

        {/* Participants */}
        <div className="mt-4 border-t border-ws-border pt-4 flex flex-wrap gap-2">
          {(() => {
            const sorted = Object.entries(metadata.counts.perAuthor).sort(([, a], [, b]) => b - a);
            const max = sorted[0]?.[1] ?? 1;
            return sorted.map(([author, count]) => {
              const ratio = count / max;
              const bgOpacity = 0.08 + ratio * 0.42;
              const textColor = ratio > 0.45 ? '#E9EDEF' : '#8696A0';
              return (
                <span
                  key={author}
                  className="rounded-full px-3 py-1 text-xs"
                  style={{ backgroundColor: `rgba(0, 168, 132, ${bgOpacity})`, color: textColor }}
                >
                  {author} · {count.toLocaleString()}
                </span>
              );
            });
          })()}
        </div>
      </div>
    </header>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-ws-border bg-ws-surface px-4 py-3">
      <div className="text-[11px] font-bold uppercase tracking-wide text-ws-muted">{label}</div>
      <div className="mt-1 text-base font-bold text-ws-text">{value}</div>
    </div>
  );
}

function formatDate(d: Date | string): string {
  const date = d instanceof Date ? d : new Date(d);
  return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
}
