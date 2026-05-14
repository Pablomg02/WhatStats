import { PageLayout } from '../layout/PageLayout';

export function HowToExport() {
  return (
    <PageLayout>
      <article className="flex max-w-2xl flex-col gap-6">
        <h1 className="text-2xl font-bold text-ws-text">¿Cómo exporto mi chat de WhatsApp?</h1>

        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-ws-text">Android</h2>
          <ol className="flex flex-col gap-2 pl-5 text-sm text-ws-muted" style={{ listStyleType: 'decimal' }}>
            <li>Abre el chat que quieras analizar.</li>
            <li>Pulsa los tres puntos (⋮) → <strong className="text-ws-text">Más</strong> → <strong className="text-ws-text">Exportar chat</strong>.</li>
            <li>Elige <strong className="text-ws-text">Sin archivos multimedia</strong>.</li>
            <li>Guarda o comparte el archivo <code className="rounded bg-ws-surface px-1 py-0.5 font-mono text-ws-green">.txt</code> contigo mismo.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-ws-text">iOS</h2>
          <ol className="flex flex-col gap-2 pl-5 text-sm text-ws-muted" style={{ listStyleType: 'decimal' }}>
            <li>Abre el chat.</li>
            <li>Pulsa el nombre del chat o grupo arriba.</li>
            <li>Desliza hasta abajo y elige <strong className="text-ws-text">Exportar chat</strong>.</li>
            <li>Elige <strong className="text-ws-text">Sin archivos</strong>.</li>
            <li>Comparte el archivo <code className="rounded bg-ws-surface px-1 py-0.5 font-mono text-ws-green">.txt</code> contigo mismo.</li>
          </ol>
        </section>

        <p className="text-sm text-ws-muted">
          WhatStats acepta de momento solo el archivo{' '}
          <code className="rounded bg-ws-surface px-1 py-0.5 font-mono text-ws-green">.txt</code>. Si recibes un{' '}
          <code className="rounded bg-ws-surface px-1 py-0.5 font-mono text-ws-green">.zip</code>, descomprímelo y sube únicamente el archivo de texto.
        </p>
      </article>
    </PageLayout>
  );
}
