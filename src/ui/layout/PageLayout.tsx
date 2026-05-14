import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

export function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <Link to="/" className="text-lg font-semibold text-whatsapp-teal">
            WhatStats
          </Link>
          <nav className="flex gap-4 text-sm text-slate-600">
            <Link to="/how-to-export" className="hover:text-whatsapp-teal">
              ¿Cómo exporto mi chat?
            </Link>
            <Link to="/privacy" className="hover:text-whatsapp-teal">
              Privacidad
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
    </div>
  );
}
