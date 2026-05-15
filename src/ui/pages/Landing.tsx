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
          {/* Badge análisis local */}
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-ws-green/30 bg-ws-card text-xs font-semibold text-ws-green tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-ws-green-bright animate-pulse" />
            Análisis 100% local · Sin servidores · Sin cookies
          </div>

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
            Patrones ocultos, rankings, actividad y mucho más de tus chats de WhatsApp —
            de forma completamente privada.
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

          <p className="text-center text-[11px] text-ws-muted/50 max-w-sm mx-auto">
            Consejo: borra el archivo exportado cuando termines si quieres eliminar cualquier rastro local del chat.
          </p>
        </section>
      </div>
    </PageLayout>
  );
}
