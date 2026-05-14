import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

export function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-ws-bg text-ws-text">
      <header className="border-b border-ws-border bg-ws-surface">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <Link to="/" className="text-lg font-semibold text-ws-green">
            WhatStats
          </Link>
          <nav className="flex gap-4 text-sm text-ws-muted">
            <Link to="/how-to-export" className="transition hover:text-ws-green">
              ¿Cómo exporto mi chat?
            </Link>
            <Link to="/privacy" className="transition hover:text-ws-green">
              Privacidad
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
    </div>
  );
}
