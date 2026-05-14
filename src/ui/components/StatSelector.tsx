import { statRegistry } from '@/stats/registry';

interface StatSelectorProps {
  activeStatId: string | null;
  onSelect: (id: string) => void;
}

export function StatSelector({ activeStatId, onSelect }: StatSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {statRegistry.map((stat) => {
        const active = stat.id === activeStatId;
        return (
          <button
            key={stat.id}
            type="button"
            onClick={() => onSelect(stat.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              active
                ? 'bg-whatsapp-teal text-white shadow-sm'
                : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50'
            }`}
          >
            {stat.label}
          </button>
        );
      })}
    </div>
  );
}
