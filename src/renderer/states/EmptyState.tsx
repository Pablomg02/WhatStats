export function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-lg border border-dashed border-ws-border bg-ws-surface p-6 text-center text-sm text-ws-muted">
      {message}
    </div>
  );
}
