import { PageLayout } from '../layout/PageLayout';

export function Privacy() {
  return (
    <PageLayout>
      <article className="flex max-w-2xl flex-col gap-6">
        <h1 className="text-2xl font-bold text-ws-text">Privacidad y seguridad</h1>

        <p className="text-sm text-ws-muted">
          WhatStats está diseñada con la privacidad como pilar fundamental. Todo el procesamiento
          ocurre en tu navegador, en tu dispositivo, y ningún dato del chat se envía a ningún
          servidor.
        </p>

        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-ws-text">Cómo funciona técnicamente</h2>
          <ul className="flex flex-col gap-2 pl-5 text-sm text-ws-muted" style={{ listStyleType: 'disc' }}>
            <li>El archivo se lee con la API de archivos del navegador.</li>
            <li>El parsing y las estadísticas se ejecutan en un <strong className="text-ws-text">Web Worker</strong> local.</li>
            <li>No hay backend que reciba, almacene ni procese mensajes.</li>
            <li>El código es público y auditable.</li>
          </ul>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-ws-text">Buenas prácticas</h2>
          <p className="text-sm text-ws-muted">
            Cuando termines tu análisis, recomendamos que borres el archivo exportado de tu
            dispositivo si no quieres dejar rastro local del chat. Recuerda que en algunos sistemas
            el archivo puede quedar en la papelera; vacíala para una limpieza completa.
          </p>
        </section>
      </article>
    </PageLayout>
  );
}
