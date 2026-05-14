import { useNavigate } from 'react-router-dom';
import { Dropzone } from '../components/Dropzone';
import { useSessionStore } from '@/state/session';
import { PageLayout } from '../layout/PageLayout';

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
      <div className="flex flex-col gap-10">
        <section className="text-center">
          <h1 className="text-4xl font-bold text-slate-900">WhatStats</h1>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Analiza tus chats de WhatsApp y descubre patrones, rankings y estadísticas detalladas.
            <span className="block font-semibold text-whatsapp-teal">
              El análisis ocurre 100% en tu navegador. Ningún dato sale de tu dispositivo.
            </span>
          </p>
        </section>

        <Dropzone onFileSelected={handleFile} />

        <section id="privacidad" className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-semibold">Privacidad y seguridad</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-600">
            <li>El archivo nunca abandona tu dispositivo.</li>
            <li>No hay servidor que reciba, almacene ni procese los mensajes.</li>
            <li>El código es auditable.</li>
          </ul>
          <p className="mt-3 text-sm text-slate-500">
            Recomendación: borra el archivo exportado del dispositivo cuando termines el análisis si
            no quieres dejar rastro local del chat.
          </p>
        </section>
      </div>
    </PageLayout>
  );
}
