export function LoadingState({ label = 'Calculando…' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12 text-ws-muted">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-ws-green border-t-transparent" />
      <span className="text-sm">{label}</span>
    </div>
  );
}
