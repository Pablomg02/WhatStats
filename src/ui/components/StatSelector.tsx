import { statRegistry } from '@/stats/registry';

interface StatSelectorProps {
  activeStatId: string | null;
  onSelect: (id: string) => void;
}

export function StatSelector({ activeStatId, onSelect }: StatSelectorProps) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-[11px] font-bold uppercase tracking-widest text-ws-muted/60">
        Estadísticas disponibles
      </p>
      <div className="flex flex-wrap gap-2">
        {statRegistry.map((stat) => {
          const active = stat.id === activeStatId;
          return (
            <button
              key={stat.id}
              type="button"
              onClick={() => onSelect(stat.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-150 ${
                active
                  ? 'text-white shadow-sm'
                  : 'bg-ws-surface text-ws-muted ring-1 ring-ws-border hover:bg-ws-card hover:text-ws-text hover:ring-ws-green/40'
              }`}
              style={
                active
                  ? { background: 'linear-gradient(135deg, #25D366 0%, #00A884 100%)' }
                  : undefined
              }
            >
              {stat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
