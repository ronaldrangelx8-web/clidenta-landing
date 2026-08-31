"use client";
import React, { useEffect, useState } from 'react';
import Logo from '@/components/Logo';
import { ArrowDown } from 'lucide-react';

/** ISO country code → "Perú 🇵🇪" (nombre en español + bandera regional). */
function countryLabel(code: string): string {
  try {
    const name = new Intl.DisplayNames(['es'], { type: 'region' }).of(code) || code;
    const flag = code
      .toUpperCase()
      .replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)));
    return `${name} ${flag}`;
  } catch {
    return 'Perú 🇵🇪';
  }
}

const Hero: React.FC = () => {
  // Geolocalización por IP para personalizar el badge (fallback: Perú).
  const [geo, setGeo] = useState('Perú 🇵🇪');

  useEffect(() => {
    fetch('https://api.country.is/')
      .then((r) => r.json())
      .then((d) => {
        if (d?.country) setGeo(countryLabel(d.country));
      })
      .catch(() => {});
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="bg-background pt-8 pb-10 px-4 relative overflow-hidden">
      {/* Halo suave de marca */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[420px] w-[720px] rounded-full bg-primary/5 blur-3xl" />

      <div className="max-w-5xl mx-auto relative">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Logo />
        </div>

        {/* Eyebrow */}
        <p className="text-center text-[12px] sm:text-[13px] font-medium tracking-[0.14em] uppercase text-slate-500 mb-6">
          Sistema de gestión dental + Recepcionista IA · <span className="text-primary">{geo}</span>
        </p>

        {/* Hero Title — corto, 2 líneas máx en desktop */}
        <h1 className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] font-serif font-semibold text-slate-900 leading-[1.12] max-w-3xl mx-auto mb-5">
          Aumenta tu facturación <span className="text-primary">hasta un 60%</span> con una{' '}
          <span className="relative whitespace-nowrap text-primary">
            recepcionista IA
            <span className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-gold/70" />
          </span>
        </h1>

        {/* Subtitle — corto y amigable */}
        <p className="font-sans text-center text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
          Atiende tu WhatsApp 24/7, agenda citas sola y llega con tu clínica completa.
          Lista en <span className="text-primary font-semibold">7 días</span>.
        </p>

        {/* CTA */}
        <div className="flex justify-center mb-12">
          <button
            onClick={() => scrollTo('agenda')}
            className="w-full sm:w-auto bg-primary text-primary-foreground font-semibold px-10 py-4 rounded-xl shadow-sm hover:bg-primary/90 hover:shadow transition-all duration-300 text-lg"
          >
            Agendar demostración gratis
          </button>
        </div>

        {/* Producto real: la agenda de Clidenta */}
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl overflow-hidden ring-1 ring-slate-900/10 shadow-2xl shadow-primary/10 bg-white">
            {/* Barra de navegador */}
            <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 border-b border-slate-200/80">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 flex-1 max-w-xs bg-white rounded-md text-[11px] text-slate-400 px-3 py-1 border border-slate-200">
                app.clidenta.net
              </span>
            </div>
            <img
              src="/screens/agenda.png"
              alt="Agenda semanal de Clidenta con citas agendadas por la IA"
              className="w-full block"
              loading="eager"
            />
          </div>
          <p className="text-center text-sm text-slate-400 mt-3">
            Tu agenda real: las citas que cierra la IA aparecen al instante.
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => scrollTo('agenda')}
            aria-label="Ir a la sección de agendamiento"
            className="animate-bounce text-primary/50 hover:text-primary transition-colors"
          >
            <ArrowDown size={22} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
