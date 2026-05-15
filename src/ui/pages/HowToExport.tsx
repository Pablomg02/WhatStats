import type { ReactNode } from 'react';
import { PageLayout } from '../layout/PageLayout';

export function HowToExport() {
  return (
    <PageLayout>
      <article className="mx-auto max-w-2xl flex flex-col gap-16">

        {/* Hero */}
        <section className="flex flex-col gap-4 pt-4">
          <p className="text-[11px] font-bold uppercase tracking-widest text-ws-green">
            Guía de exportación
          </p>
          <h1
            className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #25D366 0%, #00A884 60%, #E9EDEF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            ¿Cómo exporto mi chat?
          </h1>
          <p className="text-base text-ws-muted leading-relaxed max-w-lg">
            WhatsApp permite exportar cualquier conversación directamente desde la aplicación.
            WhatStats acepta tanto el formato{' '}
            <code className="rounded bg-ws-surface px-1.5 py-0.5 font-mono text-ws-green text-xs">.txt</code>{' '}
            como el{' '}
            <code className="rounded bg-ws-surface px-1.5 py-0.5 font-mono text-ws-green text-xs">.zip</code>
            {' '}— sube directamente el archivo que recibas, sin necesidad de hacer nada más.
          </p>
        </section>

        {/* Pasos */}
        <section className="flex flex-col gap-12">

          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🤖</span>
              <h2 className="text-2xl font-bold text-ws-text">Android</h2>
            </div>
            <Steps steps={[
              'Abre la conversación que quieras analizar.',
              <span>Pulsa el icono de menú (⋮) y selecciona <strong className="text-ws-text">Más</strong> → <strong className="text-ws-text">Exportar chat</strong>.</span>,
              <span>Elige <strong className="text-ws-text">Sin archivos multimedia</strong>.</span>,
              <span>Cuando te pregunte dónde guardar, elige la carpeta <strong className="text-ws-text">Descargas</strong> — es la más fácil de encontrar después. Recuerda dónde lo guardas.</span>,
            ]} />
            <TipBox>
              <Tip icon="📤" label="Cómo subirlo">
                Abre WhatStats en el navegador, pulsa el <strong className="text-ws-text">recuadro de carga</strong> y, en el selector de archivos, navega a <strong className="text-ws-text">Descargas</strong>. Selecciona el archivo exportado y listo.
              </Tip>
              <Tip icon="🗑️" label="Cómo borrarlo después">
                Abre la app <strong className="text-ws-text">Mis archivos</strong> (o <strong className="text-ws-text">Archivos</strong> según tu móvil), ve a <strong className="text-ws-text">Descargas</strong>, mantén pulsado el archivo y selecciona <strong className="text-ws-text">Eliminar</strong>.
              </Tip>
            </TipBox>
          </div>

          <div className="h-px bg-ws-border" />

          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🍎</span>
              <h2 className="text-2xl font-bold text-ws-text">iPhone</h2>
            </div>
            <Steps steps={[
              'Abre la conversación que quieras analizar.',
              'Pulsa el nombre del chat o del grupo en la parte superior.',
              <span>Desplázate hacia abajo y selecciona <strong className="text-ws-text">Exportar chat</strong>.</span>,
              <span>Elige <strong className="text-ws-text">Sin archivos</strong>.</span>,
              <span>Cuando aparezca el menú para compartir, pulsa <strong className="text-ws-text">Guardar en Archivos</strong>. Guárdalo donde quieras — puedes dejarlo en la raíz o crear una carpeta para organizarlo. Recuerda dónde lo guardas.</span>,
            ]} />
            <TipBox>
              <Tip icon="📤" label="Cómo subirlo">
                Abre WhatStats en Safari, pulsa el <strong className="text-ws-text">recuadro de carga</strong> y se abrirá la app <strong className="text-ws-text">Archivos</strong>. Navega a la carpeta donde lo guardaste, selecciónalo y listo.
              </Tip>
              <Tip icon="🗑️" label="Cómo borrarlo después">
                Abre la app <strong className="text-ws-text">Archivos</strong>, localiza la carpeta donde guardaste el archivo, mantenlo pulsado y selecciona <strong className="text-ws-text">Eliminar</strong>.
              </Tip>
            </TipBox>
          </div>

          <div className="h-px bg-ws-border" />

          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl">💻</span>
              <h2 className="text-2xl font-bold text-ws-text">Windows / Mac</h2>
            </div>
            <Steps steps={[
              <span>Exporta el chat desde tu móvil siguiendo los pasos de <strong className="text-ws-text">Android</strong> o <strong className="text-ws-text">iPhone</strong> de arriba.</span>,
              <span>Pasa el archivo al ordenador por cualquier método fiable: un <strong className="text-ws-text">chat personal de WhatsApp</strong> (envíatelo a ti mismo), <strong className="text-ws-text">correo electrónico</strong>, <strong className="text-ws-text">Google Drive</strong>, <strong className="text-ws-text">iCloud</strong> u otro servicio similar.</span>,
              <span>Descarga el archivo en el ordenador y súbelo a WhatStats pulsando el <strong className="text-ws-text">recuadro de carga</strong>, como harías con cualquier otro archivo.</span>,
            ]} />
          </div>

        </section>

        {/* Nota formatos */}
        <section className="flex flex-col gap-3">
          <p className="text-[11px] font-bold uppercase tracking-widest text-ws-muted/60">
            Formatos compatibles
          </p>
          <p className="text-sm text-ws-muted leading-relaxed">
            Según el dispositivo y la versión de WhatsApp, el archivo exportado puede ser{' '}
            <code className="rounded bg-ws-surface px-1.5 py-0.5 font-mono text-ws-green text-xs">.txt</code>{' '}
            o{' '}
            <code className="rounded bg-ws-surface px-1.5 py-0.5 font-mono text-ws-green text-xs">.zip</code>.{' '}
            WhatStats acepta ambos formatos — no es necesario descomprimir ni modificar el
            archivo antes de subirlo.
          </p>
        </section>

      </article>
    </PageLayout>
  );
}

function Steps({ steps }: { steps: ReactNode[] }) {
  return (
    <ol className="flex flex-col gap-4">
      {steps.map((step, i) => (
        <li key={i} className="flex gap-4">
          <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-ws-green/15 text-xs font-bold text-ws-green mt-0.5">
            {i + 1}
          </span>
          <p className="text-sm text-ws-muted leading-relaxed">{step}</p>
        </li>
      ))}
    </ol>
  );
}

function TipBox({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-ws-border bg-ws-surface/50 px-5 py-4">
      {children}
    </div>
  );
}

function Tip({ icon, label, children }: { icon: string; label: string; children: ReactNode }) {
  return (
    <div className="flex gap-3">
      <span className="text-base leading-relaxed flex-shrink-0">{icon}</span>
      <p className="text-sm text-ws-muted leading-relaxed">
        <span className="font-semibold text-ws-text">{label}: </span>
        {children}
      </p>
    </div>
  );
}
