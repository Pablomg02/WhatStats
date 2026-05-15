import { PageLayout } from '../layout/PageLayout';

export function Privacy() {
  return (
    <PageLayout>
      <article className="mx-auto max-w-2xl flex flex-col gap-16">

        {/* Hero */}
        <section className="flex flex-col gap-4 pt-4">
          <p className="text-[11px] font-bold uppercase tracking-widest text-ws-green">
            Privacidad
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
            Privacidad por diseño
          </h1>
          <p className="text-base text-ws-muted leading-relaxed max-w-lg">
            WhatStats no tiene servidores que reciban tus datos, no usa cookies y no carga
            ningún servicio de terceros. Todo el procesamiento ocurre íntegramente dentro
            de tu navegador.
          </p>
        </section>

        {/* Secciones principales */}
        <section className="flex flex-col gap-12">

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔒</span>
              <h2 className="text-xl font-bold text-ws-text">Tu chat no va a ningún sitio</h2>
            </div>
            <p className="text-sm text-ws-muted leading-relaxed pl-10">
              El análisis ocurre completamente dentro de tu navegador. El archivo que subes
              no viaja por internet ni llega a ningún servidor. En cuanto cierras o recargas
              la página, todos los datos procesados desaparecen de forma permanente.
            </p>
          </div>

          <div className="h-px bg-ws-border" />

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🖥️</span>
              <h2 className="text-xl font-bold text-ws-text">El servidor solo sirve la aplicación</h2>
            </div>
            <p className="text-sm text-ws-muted leading-relaxed pl-10">
              El servidor de WhatStats tiene una única función: entregarte la aplicación cuando
              la abres. No existe ningún canal por el que pueda recibir información tuya.
              Una vez cargada la página, el servidor no interviene en nada más.
            </p>
          </div>

          <div className="h-px bg-ws-border" />

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🚫</span>
              <h2 className="text-xl font-bold text-ws-text">Sin rastreo ni servicios externos</h2>
            </div>
            <p className="text-sm text-ws-muted leading-relaxed pl-10">
              No hay cookies, analíticas, publicidad ni scripts de terceros de ningún tipo.
              Ninguna empresa, servicio o persona ajena tiene acceso a tus conversaciones
              ni a lo que haces dentro de la aplicación.
            </p>
          </div>

          <div className="h-px bg-ws-border" />

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">👁️</span>
              <h2 className="text-xl font-bold text-ws-text">Código abierto y auditable</h2>
            </div>
            <p className="text-sm text-ws-muted leading-relaxed pl-10">
              El código fuente de WhatStats es público. Cualquier persona con conocimientos
              técnicos puede auditarlo para verificar de forma independiente todo lo que
              se describe en esta página.
            </p>
          </div>

        </section>

        {/* Cómo verificarlo */}
        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-[11px] font-bold uppercase tracking-widest text-ws-muted/60">
              Verificación independiente
            </p>
            <h2
              className="text-2xl font-extrabold"
              style={{
                background: 'linear-gradient(135deg, #25D366 0%, #00A884 60%, #E9EDEF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              ¿Cómo puedo comprobarlo?
            </h2>
            <p className="text-sm text-ws-muted leading-relaxed">
              No hace falta fiarse de nuestra palabra. Puedes verificarlo tú mismo de dos formas:
            </p>
          </div>

          <div className="flex flex-col gap-8 pl-2">
            <div className="flex flex-col gap-2">
              <p className="text-base font-semibold text-ws-text">✈️ La prueba del modo avión</p>
              <p className="text-sm text-ws-muted leading-relaxed">
                Abre WhatStats, activa el modo avión y analiza el chat. Si todo funciona igual
                sin conexión a internet, queda demostrado que ningún dato sale de tu dispositivo.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-base font-semibold text-ws-text">🛠️ Inspección del tráfico de red</p>
              <p className="text-sm text-ws-muted leading-relaxed">
                Abre las herramientas de desarrollo del navegador (F12), ve a la
                pestaña <strong className="text-ws-text">Red</strong> y sube tu archivo.
                Verás que, una vez cargada la aplicación, no se genera ninguna petición
                de red adicional. Ningún dato sale hacia ningún servidor externo.
              </p>
            </div>
          </div>
        </section>

        {/* El único riesgo */}
        <section className="flex flex-col gap-4">
          <p className="text-[11px] font-bold uppercase tracking-widest text-ws-muted/60">
            Consideración de seguridad
          </p>
          <h2 className="text-2xl font-extrabold text-amber-400">⚠️ El riesgo está en tu entorno, no en esta web</h2>
          <p className="text-sm text-ws-muted leading-relaxed">
            WhatStats no representa ningún riesgo para tu privacidad. Sin embargo, si tu
            navegador o sistema operativo no están actualizados, las vulnerabilidades de ese
            entorno podrían comprometer información sensible —contraseñas, datos bancarios u
            otros datos personales— con independencia de la aplicación que estés usando.
          </p>
          <p className="text-sm text-ws-muted leading-relaxed">
            Usa un navegador de confianza —{' '}
            <strong className="text-ws-text">Firefox, Chrome, Edge o Safari</strong> — y
            mantén tanto el navegador como el sistema operativo actualizados. Si lo haces,
            esta página no supone ningún riesgo para ti.
          </p>
        </section>

      </article>
    </PageLayout>
  );
}
