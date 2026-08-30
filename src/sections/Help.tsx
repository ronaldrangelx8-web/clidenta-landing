"use client";
import React from 'react';
import { Bot, CheckCircle2 } from 'lucide-react';

/**
 * Vitrina de la plataforma: card hero para la Recepcionista IA + índice
 * editorial numerado de los módulos (tipografía, no cajitas — premium).
 */
const MODULES = [
  {
    title: 'Agenda inteligente',
    description: 'Calendario semanal por doctor. Las citas que agenda la IA aparecen al instante, sin sobrecupos.',
  },
  {
    title: 'Odontograma premium',
    description: 'Charting por caras, historial versionado, periodontograma y presupuesto desde el hallazgo.',
  },
  {
    title: 'Historias y archivos',
    description: 'Fotos, audios, consentimientos y documentos de cada paciente, organizados y seguros.',
  },
  {
    title: 'Pacientes con DNI',
    description: 'Escribe el DNI y los datos se autocompletan con RENIEC. Alta de pacientes en segundos.',
  },
  {
    title: 'Recetas digitales',
    description: 'Vademécum odontológico con alertas de interacciones y alergias. Lista para imprimir y firmar.',
  },
  {
    title: 'Recordatorios automáticos',
    description: 'Confirmaciones por WhatsApp que reducen inasistencias: citas, controles, cumpleaños y reactivación.',
  },
  {
    title: 'Flujos sin código',
    description: 'Diseña menús y respuestas automáticas con un editor visual. Tu WhatsApp trabaja con tus reglas.',
  },
  {
    title: 'Finanzas y productividad',
    description: 'Presupuestos, pagos, comisiones por doctor y analítica clínica para decidir con números.',
  },
  {
    title: 'Inventario y laboratorio',
    description: 'Stock con alertas y trabajos de laboratorio con seguimiento. Nada se pierde en el camino.',
  },
  {
    title: 'CRM de conversaciones',
    description: 'WhatsApp e Instagram en una sola bandeja. Ve lo que respondió la IA y retoma cuando quieras.',
  },
];

const AI_BULLETS = [
  'Responde WhatsApp en segundos, 24/7, con la voz de tu clínica',
  'Conoce a cada paciente: saldo, tratamientos pendientes y próxima cita',
  'Agenda, reagenda y confirma citas directo en tu calendario',
  'Deriva a tu equipo humano cuando la conversación lo necesita',
];

const Help: React.FC = () => {
  const scrollToCalendar = () => {
    const el = document.getElementById('agenda');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="help" className="bg-background py-24 px-4 border-t border-border/60">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-14">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">
            La plataforma completa
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-slate-900 leading-tight">
            Mucho más que una recepcionista:{' '}
            <span className="text-primary">todo tu consultorio en un solo lugar</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto mt-5 text-lg">
            La IA atiende y agenda; el software gestiona tu clínica de punta a punta.
            Todo conectado, todo incluido.
          </p>
        </div>

        {/* Card hero: Recepcionista IA */}
        <div className="mb-16 rounded-2xl bg-gradient-to-br from-teal-800 to-teal-900 text-white p-8 md:p-10 shadow-md relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-gold to-transparent" />
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/5 blur-2xl" />
          <div className="grid md:grid-cols-2 gap-8 items-center relative">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-11 w-11 rounded-xl bg-white/10 flex items-center justify-center">
                  <Bot size={24} />
                </div>
                <span className="rounded-full bg-gold text-white text-[11px] font-semibold tracking-wide uppercase px-3 py-1">
                  La estrella
                </span>
              </div>
              <h3 className="font-serif text-2xl md:text-3xl font-semibold mb-3">
                Recepcionista IA 24/7
              </h3>
              <p className="text-teal-100/90 leading-relaxed">
                No es un chatbot genérico: vive dentro de tu software y conoce tu clínica,
                tus precios, tus horarios y a tus pacientes.
              </p>
            </div>
            <ul className="space-y-3">
              {AI_BULLETS.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-gold mt-0.5 shrink-0" />
                  <span className="text-teal-50/95">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Índice editorial de módulos */}
        <div className="grid md:grid-cols-2 gap-x-16 border-t border-slate-200">
          {MODULES.map((m, i) => (
            <div
              key={m.title}
              className="group grid grid-cols-[2.75rem_1fr] gap-x-2 py-7 border-b border-slate-200"
            >
              <span className="font-serif text-[15px] text-gold tabular-nums pt-[3px] select-none">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="font-serif text-xl md:text-[1.35rem] font-semibold text-slate-900 group-hover:text-primary transition-colors duration-200">
                  {m.title}
                </h3>
                <p className="text-[15px] text-slate-500 mt-1.5 leading-relaxed max-w-md">
                  {m.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-14">
          <button
            onClick={scrollToCalendar}
            className="bg-primary text-primary-foreground font-semibold px-8 py-3.5 rounded-xl shadow-sm hover:bg-primary/90 hover:shadow transition-all duration-300 text-lg"
          >
            Quiero verlo funcionando en mi clínica
          </button>
        </div>

      </div>
    </section>
  );
};

export default Help;
