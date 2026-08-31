"use client";
import React, { useEffect, useState } from 'react';
import Logo from '@/components/Logo';
import { ArrowDown } from 'lucide-react';
import HeroLivePreview from './HeroLivePreview';

/** ISO country code → "Perú 🇵🇪" (nombre en español + bandera regional). */
function countryLabel(code: string): string {
  try {
    const name = new Intl.DisplayNames(['es'], { type: 'region' }).of(code) || code;
    const flag = code
      .toUpperCase()
      .replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)));
    // "del Perú / del Ecuador", pero "de México / de Chile"…
    const article = ['PE', 'EC'].includes(code.toUpperCase()) ? 'del' : 'de';
    return `${article} ${name} ${flag}`;
  } catch {
    return 'del Perú 🇵🇪';
  }
}

const Hero: React.FC = () => {
  // Geolocalización por IP para personalizar el badge (fallback: Perú).
  const [geo, setGeo] = useState('del Perú 🇵🇪');

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
          Atención odontólogos <span className="text-primary">{geo}</span>
        </p>

        {/* Hero Title */}
        <h1 className="text-center text-3xl sm:text-4xl md:text-5xl font-serif font-semibold text-slate-900 leading-[1.15] max-w-4xl mx-auto mb-5">
          Aumenta la facturación de tu Clínica Dental{' '}
          <span className="text-primary">hasta un 60%</span> con una{' '}
          <span className="relative whitespace-nowrap text-primary">
            Recepcionista IA
            <span className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-gold/70" />
          </span>
        </h1>

        {/* Subtitle — corto y amigable */}
        <p className="font-sans text-center text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
          Atiende tu WhatsApp 24/7, agenda citas sola y llega con tu clínica completa.
          Lista en <span className="text-primary font-semibold">7 días</span>.
        </p>

        {/* Producto real, "en vivo": la agenda de Clidenta */}
        <div className="max-w-4xl mx-auto mb-10">
          <HeroLivePreview />
        </div>

        {/* CTA con badge de urgencia */}
        <div className="flex justify-center">
          <div className="relative inline-block">
            <span className="absolute -top-2.5 -right-2.5 z-10 rounded-full bg-red-600 text-white text-[11px] font-semibold px-2.5 py-1 shadow-md motion-safe:animate-[vibrate_3s_ease-in-out_infinite]">
              Cupos limitados
            </span>
            <button
              onClick={() => scrollTo('agenda')}
              className="w-full sm:w-auto bg-primary text-primary-foreground font-semibold px-10 py-4 rounded-xl shadow-sm hover:bg-primary/90 hover:shadow transition-all duration-300 text-lg"
            >
              Agendar demostración gratis
            </button>
          </div>
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
