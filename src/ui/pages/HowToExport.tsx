import { PageLayout } from '../layout/PageLayout';

export function HowToExport() {
  return (
    <PageLayout>
      <article className="prose prose-slate max-w-none">
        <h1>¿Cómo exporto mi chat de WhatsApp?</h1>

        <h2>Android</h2>
        <ol>
          <li>Abre el chat que quieras analizar.</li>
          <li>Pulsa los tres puntos (⋮) → <strong>Más</strong> → <strong>Exportar chat</strong>.</li>
          <li>Elige <strong>Sin archivos multimedia</strong>.</li>
          <li>Guarda o comparte el archivo <code>.txt</code> contigo mismo.</li>
        </ol>

        <h2>iOS</h2>
        <ol>
          <li>Abre el chat.</li>
          <li>Pulsa el nombre del chat o grupo arriba.</li>
          <li>Desliza hasta abajo y elige <strong>Exportar chat</strong>.</li>
          <li>Elige <strong>Sin archivos</strong>.</li>
          <li>Comparte el archivo <code>.txt</code> contigo mismo.</li>
        </ol>

        <p className="text-sm text-slate-500">
          WhatStats acepta de momento solo el archivo <code>.txt</code>. Si recibes un
          <code>.zip</code>, descomprímelo y sube únicamente el archivo de texto.
        </p>
      </article>
    </PageLayout>
  );
}
