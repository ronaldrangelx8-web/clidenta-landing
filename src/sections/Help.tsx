"use client";
import React from 'react';
import AiHubDiagram from './AiHubDiagram';

/**
 * Vitrina de la plataforma: card hero de la IA con diagrama de conexión,
 * dos módulos estrella con captura real y una grilla de módulos.
 */
const MODULES = [
  { title: 'Historias y archivos', description: 'Fotos, audios y documentos de cada paciente.' },
  { title: 'Pacientes en segundos', description: 'Ficha completa con autocompletado de datos.' },
  { title: 'Recetas digitales', description: 'Vademécum con alertas de interacciones.' },
  { title: 'Recordatorios automáticos', description: 'Confirmaciones por WhatsApp, menos inasistencias.' },
  { title: 'Automatización sin código', description: 'Respuestas y menús automáticos, listos al instante.' },
  { title: 'Finanzas y productividad', description: 'Presupuestos, pagos y comisiones por doctor.' },
  { title: 'Inventario y laboratorio', description: 'Stock con alertas y trabajos con seguimiento.' },
  { title: 'CRM de conversaciones', description: 'WhatsApp e Instagram en una sola bandeja.' },
];

const AI_BULLETS = [
  'Responde WhatsApp en segundos, 24/7, con la voz de tu clínica',
  'Conoce a cada paciente: saldo, tratamientos pendientes y próxima cita',
  'Agenda, reagenda y confirma citas directo en tu calendario',
  'Deriva a tu equipo humano cuando la conversación lo necesita',
];

/** Captura de producto con marco de navegador. */
function Shot({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="rounded-2xl overflow-hidden ring-1 ring-slate-900/10 shadow-xl shadow-primary/5 bg-white">
      <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 border-b border-slate-200/80">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
      </div>
      <img src={src} alt={alt} className="w-full block" loading="lazy" />
    </div>
  );
}

const Help: React.FC = () => {
  const scrollToCalendar = () => {
    const el = document.getElementById('agenda');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="help" className="bg-background py-24 px-4 border-t border-border/60">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-slate-900 leading-tight">
            Mucho más que una recepcionista:{' '}
            <span className="text-primary">todo tu consultorio en un solo lugar</span>
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto mt-5 text-lg">
            La IA atiende y agenda; el software gestiona el resto.
          </p>
        </div>

        {/* Card hero: Recepcionista IA con diagrama de conexión */}
        <div className="mb-16 rounded-2xl bg-gradient-to-br from-teal-800 to-teal-900 text-white p-8 md:p-10 shadow-md relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/5 blur-2xl" />
          <div className="grid md:grid-cols-2 gap-10 items-center relative">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-teal-200/80 mb-4">
                La estrella del sistema
              </p>
              <h3 className="font-serif text-2xl md:text-3xl font-semibold mb-3">
                Recepcionista IA 24/7
              </h3>
              <p className="text-teal-100/90 leading-relaxed mb-6">
                No es un chatbot genérico: vive dentro de tu software y se conecta con
                cada dato de tu clínica — precios, horarios, pacientes y tratamientos.
              </p>
              <ul className="divide-y divide-white/10">
                {AI_BULLETS.map((b) => (
                  <li key={b} className="py-2.5 text-sm text-teal-50/90 leading-relaxed first:pt-0 last:pb-0">
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <AiHubDiagram />
              <p className="text-center text-sm text-teal-100/60 mt-8">
                Un solo cerebro, conectado con todo tu consultorio.
              </p>
            </div>
          </div>
        </div>

        {/* Módulo estrella 1: odontograma (imagen derecha) */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-16">
          <div>
            <h3 className="font-serif text-2xl md:text-3xl font-semibold text-slate-900 mb-3">
              Un odontograma que <span className="text-primary">da gusto usar</span>
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Marca condiciones por caras, guarda versiones con historial y presupuesta
              desde el hallazgo con un click. Incluye periodontograma.
            </p>
          </div>
          <Shot src="/screens/odontograma.png" alt="Odontograma digital de Clidenta con condiciones marcadas" />
        </div>

        {/* Módulo estrella 2: recepcionista (imagen izquierda) */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-16">
          <div className="md:order-2">
            <h3 className="font-serif text-2xl md:text-3xl font-semibold text-slate-900 mb-3">
              Mira cuánto <span className="text-primary">trabaja tu IA</span>
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Citas agendadas, conversaciones atendidas y mensajes respondidos, en vivo.
              Tu recepcionista también rinde cuentas.
            </p>
          </div>
          <div className="md:order-1">
            <Shot src="/screens/recepcionista.png" alt="Panel de la Recepcionista IA con métricas de citas y conversaciones" />
          </div>
        </div>

        {/* Grilla de módulos — cards */}
        <div className="border-t border-slate-200 pt-14 mb-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {MODULES.map((m, i) => (
              <div
                key={m.title}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-primary/25"
              >
                <span className="font-serif text-xl text-primary/70 tabular-nums select-none mb-3">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-serif text-base font-semibold text-slate-900 leading-snug group-hover:text-primary transition-colors">
                  {m.title}
                </h3>
                <p className="text-[13px] text-slate-500 mt-1.5 leading-relaxed">
                  {m.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={scrollToCalendar}
            className="bg-primary text-primary-foreground font-semibold px-8 py-3.5 rounded-xl shadow-sm hover:bg-primary/90 hover:shadow transition-all duration-300 text-lg"
          >
            Agendar demostración gratis
          </button>
        </div>

      </div>
    </section>
  );
};

export default Help;
