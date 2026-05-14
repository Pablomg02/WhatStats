import { PageLayout } from '../layout/PageLayout';

export function Privacy() {
  return (
    <PageLayout>
      <article className="prose prose-slate max-w-none">
        <h1>Privacidad y seguridad</h1>

        <p>
          WhatStats está diseñada con la privacidad como pilar fundamental. Todo el procesamiento
          ocurre en tu navegador, en tu dispositivo, y ningún dato del chat se envía a ningún
          servidor.
        </p>

        <h2>Cómo funciona técnicamente</h2>
        <ul>
          <li>El archivo se lee con la API de archivos del navegador.</li>
          <li>El parsing y las estadísticas se ejecutan en un <strong>Web Worker</strong> local.</li>
          <li>No hay backend que reciba, almacene ni procese mensajes.</li>
          <li>El código es público y auditable.</li>
        </ul>

        <h2>Buenas prácticas</h2>
        <p>
          Cuando termines tu análisis, recomendamos que borres el archivo exportado de tu
          dispositivo si no quieres dejar rastro local del chat. Recuerda que en algunos sistemas
          el archivo puede quedar en la papelera; vacíala para una limpieza completa.
        </p>
      </article>
    </PageLayout>
  );
}
