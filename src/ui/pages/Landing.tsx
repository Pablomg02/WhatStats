import { useNavigate, Link } from 'react-router-dom';
import { Dropzone } from '../components/Dropzone';
import { useSessionStore } from '@/state/session';
import { PageLayout } from '../layout/PageLayout';

const privacyItems = [
  {
    icon: '🔒',
    title: 'Tus datos no salen de aquí',
    desc: 'El análisis ocurre directamente en tu navegador. El archivo nunca viaja a ningún servidor.',
  },
  {
    icon: '🚫',
    title: 'Sin servidores ni bases de datos',
    desc: 'No existe ningún backend que reciba, almacene ni procese tus mensajes.',
  },
  {
    icon: '✅',
    title: 'Código abierto y auditable',
    desc: 'Puedes revisar exactamente qué hace la aplicación en cualquier momento.',
  },
];

export function Landing() {
  const navigate = useNavigate();
  const parseFile = useSessionStore((s) => s.parseFile);

  const handleFile = async (file: File) => {
    navigate('/loading');
    const text = await file.text();
    await parseFile(text);
    const phase = useSessionStore.getState().phase;
    if (phase === 'ready') navigate('/stats');
    else navigate('/');
  };

  return (
    <PageLayout>
      <div className="flex flex-col gap-14">

        {/* Hero */}
        <section className="flex flex-col items-center text-center pt-4 sm:pt-10">
          {/* Título principal */}
          <h1
            className="text-6xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight leading-none pb-2"
            style={{
              background: 'linear-gradient(135deg, #25D366 0%, #00A884 50%, #128C7E 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            WhatStats
          </h1>

          {/* Subtítulo */}
          <p className="mt-5 text-lg sm:text-xl md:text-2xl font-semibold text-ws-text/90">
            Descubre los secretos de tus conversaciones
          </p>

          {/* Descripción */}
          <p className="mt-3 max-w-md text-sm sm:text-base text-ws-muted leading-relaxed">
            Patrones, estadísticas y mucho más de tu chat de WhatsApp,{' '}
            <span className="font-semibold text-ws-green">privado y local</span>.
          </p>
        </section>

        {/* Dropzone */}
        <div className="flex flex-col gap-2">
          <Dropzone onFileSelected={handleFile} />
          <p className="text-center text-xs text-ws-muted">
            ¿No sabes obtener el fichero?{' '}
            <Link to="/how-to-export" className="text-ws-green hover:underline font-medium">
              Consulta aquí y lo tendrás en menos de 1 minuto
            </Link>
          </p>
        </div>

        {/* Sección privacidad */}
        <section id="privacidad" className="flex flex-col gap-5">
          <p className="text-center text-[11px] font-bold uppercase tracking-widest text-ws-muted/60">
            Tu privacidad, garantizada
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {privacyItems.map((item) => (
              <div key={item.title} className="flex flex-col gap-2">
                <span className="text-2xl">{item.icon}</span>
                <p className="text-sm font-semibold text-ws-text">{item.title}</p>
                <p className="text-xs text-ws-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-ws-green/80 max-w-lg mx-auto leading-relaxed">
            ✈️ <span className="font-semibold">¿No confías en la página?</span>{' '}
            Activa el modo avión y analiza tu chat sin conexión. No necesitas desactivarlo en ningún momento.
          </p>

          <p className="text-center text-xs text-ws-muted/50 max-w-sm mx-auto">
            ¿Quieres saber más sobre cómo garantizamos tu privacidad?{' '}
            <a
              href="#privacidad"
              className="text-ws-green hover:underline font-medium"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('privacidad')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Haz click aquí
            </a>
          </p>
        </section>
      </div>
    </PageLayout>
  );
}
