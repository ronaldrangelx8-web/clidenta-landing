"use client";
import React from 'react';

const STATS = [
  { value: '+50', label: 'clínicas nos prefieren' },
  { value: '24/7', label: 'soporte y atención' },
  { value: '7 días', label: 'tiempo récord de implementación' },
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

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-2xl border border-border bg-white px-6 py-8 shadow-sm">
              <div className="font-serif text-4xl font-semibold text-primary mb-2">{s.value}</div>
              <div className="text-sm text-slate-500 leading-snug">{s.label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Trust;
