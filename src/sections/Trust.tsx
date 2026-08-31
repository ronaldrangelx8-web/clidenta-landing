"use client";
import React from 'react';

const STATS = [
  { value: '100+', label: 'integraciones y desarrollos' },
  { value: '24/7', label: 'atención sin descanso' },
  { value: '7 días', label: 'de la firma al lanzamiento' },
];

const Trust: React.FC = () => {
  const scrollToCalendar = () => {
    const el = document.getElementById('agenda');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="trust" className="bg-background py-20 px-4 border-t border-border/60">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-slate-900 mb-10">
          ¿Por qué confiar en <span className="text-primary">Clidenta</span>?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-12">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <div className="font-serif text-3xl font-semibold text-primary mb-1">{s.value}</div>
              <div className="text-sm text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>

        <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
          Más de 100 integraciones entregadas llave en mano: tú mantienes el control de
          tus canales y tus datos, con soporte continuo de nuestro equipo.
        </p>

      </div>
    </section>
  );
};

export default Trust;
