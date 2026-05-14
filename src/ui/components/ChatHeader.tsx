import type { DatasetMetadata } from '@/core/types/dataset';

interface ChatHeaderProps {
  metadata: DatasetMetadata;
  onReset: () => void;
}

export function ChatHeader({ metadata, onReset }: ChatHeaderProps) {
  const isGroup = metadata.chatType === 'group';
  const title = metadata.chatName ?? (isGroup ? 'Grupo sin nombre' : 'Conversación individual');

  return (
    <header className="rounded-xl border border-ws-border bg-ws-card p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-wide text-ws-muted">
            {isGroup ? 'Grupo' : 'Conversación individual'}
          </div>
          <h2 className="mt-0.5 text-xl font-semibold text-ws-text">{title}</h2>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="rounded-md border border-ws-border px-3 py-1.5 text-sm text-ws-muted transition hover:border-ws-green hover:text-ws-green"
        >
          Analizar otro chat
        </button>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label="Mensajes" value={metadata.counts.total.toLocaleString()} />
        <Stat label="Participantes" value={Object.keys(metadata.counts.perAuthor).length} />
        <Stat label="Primer mensaje" value={formatDate(metadata.firstMessage)} />
        <Stat label="Último mensaje" value={formatDate(metadata.lastMessage)} />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
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
                className="rounded-full px-3 py-1 text-xs transition"
                style={{
                  backgroundColor: `rgba(0, 168, 132, ${bgOpacity})`,
                  color: textColor,
                }}
              >
                {author} · {count.toLocaleString()}
              </span>
            );
          });
        })()}
      </div>
    </header>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wide text-ws-muted">{label}</div>
      <div className="mt-0.5 text-sm font-medium text-ws-text">{value}</div>
    </div>
  );
}

function formatDate(d: Date | string): string {
  const date = d instanceof Date ? d : new Date(d);
  return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
}
