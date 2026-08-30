"use client";
import React from 'react';
import {
  Bot, CalendarDays, ClipboardList, FolderOpen, Pill, BellRing,
  Workflow, BarChart3, Package, MessageCircle, IdCard, CheckCircle2,
} from 'lucide-react';

/**
 * Vitrina de la plataforma completa: Clidenta no es solo la recepcionista IA,
 * es el software integral de la clínica. Bento premium (teal + gold).
 */
const FEATURES = [
  {
    icon: CalendarDays,
    title: 'Agenda inteligente',
    description: 'Calendario semanal por doctor. Las citas que agenda la IA aparecen al instante, sin sobrecupos.',
  },
  {
    icon: ClipboardList,
    title: 'Odontograma premium',
    description: 'Charting por caras (M/D/V/L/O), historial versionado, periodontograma y presupuesto desde el hallazgo.',
  },
  {
    icon: FolderOpen,
    title: 'Historias y archivos',
    description: 'Fotos, audios, consentimientos y documentos de cada paciente, organizados y seguros.',
  },
  {
    icon: IdCard,
    title: 'Pacientes con DNI',
    description: 'Escribe el DNI y los datos se autocompletan con RENIEC. Alta de pacientes en segundos.',
  },
  {
    icon: Pill,
    title: 'Recetas digitales',
    description: 'Vademécum odontológico con alertas de interacciones y alergias. Lista para imprimir y firmar.',
  },
  {
    icon: BellRing,
    title: 'Recordatorios automáticos',
    description: 'Confirmaciones por WhatsApp que reducen inasistencias: citas, controles, cumpleaños y reactivación.',
  },
  {
    icon: Workflow,
    title: 'Flujos sin código',
    description: 'Diseña menús y respuestas automáticas con un editor visual. Tu WhatsApp trabaja con tus reglas.',
  },
  {
    icon: BarChart3,
    title: 'Finanzas y productividad',
    description: 'Presupuestos, pagos, comisiones por doctor y analítica clínica para decidir con números.',
  },
  {
    icon: Package,
    title: 'Inventario y laboratorio',
    description: 'Stock con alertas y trabajos de laboratorio con seguimiento. Nada se pierde en el camino.',
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
    <section id="help" className="bg-background py-20 px-4 border-t border-border/60">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-4">
          <span className="inline-block rounded-full bg-accent text-accent-foreground text-xs font-semibold tracking-wide uppercase px-4 py-1.5 mb-4">
            La plataforma completa
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-slate-900">
            Mucho más que una recepcionista:{' '}
            <span className="text-primary">todo tu consultorio en un solo lugar</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto mt-4 text-lg">
            La IA atiende y agenda; el software gestiona tu clínica de punta a punta.
            Todo conectado, todo incluido.
          </p>
        </div>

        {/* Card hero: Recepcionista IA */}
        <div className="mt-12 mb-6 rounded-2xl bg-gradient-to-br from-teal-800 to-teal-900 text-white p-8 md:p-10 shadow-md relative overflow-hidden">
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

        {/* Grid de módulos */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="bg-white border border-border rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-primary/25 transition-all duration-300 group"
            >
              <div className="h-11 w-11 rounded-xl bg-accent text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <f.icon size={22} strokeWidth={1.8} />
              </div>
              <h3 className="font-serif font-semibold text-lg text-slate-900 mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>

        {/* CRM strip */}
        <div className="rounded-2xl border border-border bg-white p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center gap-4 mb-12">
          <div className="h-11 w-11 rounded-xl bg-accent text-primary flex items-center justify-center shrink-0">
            <MessageCircle size={22} strokeWidth={1.8} />
          </div>
          <div className="flex-1">
            <h3 className="font-serif font-semibold text-lg text-slate-900">CRM de conversaciones incluido</h3>
            <p className="text-sm text-slate-600">
              WhatsApp e Instagram en una sola bandeja. Ve lo que respondió la IA, retoma cuando quieras
              y clasifica leads por etapa.
            </p>
          </div>
        </div>

        <div className="flex justify-center">
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
