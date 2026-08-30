"use client";
import React from 'react';
import Logo from '@/components/Logo';
import { Sparkles, ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="bg-background pt-8 pb-6 px-4 relative overflow-hidden">
      {/* Halo suave de marca */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[420px] w-[720px] rounded-full bg-primary/5 blur-3xl" />

      <div className="max-w-5xl mx-auto relative">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Logo />
        </div>

        {/* Badge */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white px-4 py-1.5 text-xs sm:text-sm font-medium text-primary shadow-sm">
            <Sparkles size={14} className="text-gold" />
            Software de gestión dental + Recepcionista IA · Perú y LATAM
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-slate-900 leading-[1.12] max-w-4xl mx-auto mb-7">
          Aumenta tu facturación{' '}
          <span className="text-primary">hasta un 60%</span> con un{' '}
          <span className="relative whitespace-nowrap text-primary">
            recepcionista IA
            <span className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-gold/70" />
          </span>{' '}
          a medida, implementado en <span className="text-primary">solo 7 días</span>
        </h1>

        {/* Subtitle */}
        <p className="font-sans text-center text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-9 leading-relaxed">
          Atiende WhatsApp 24/7, agenda citas sola y llega con toda tu clínica integrada:
          agenda, odontograma, historias, recordatorios y finanzas en un solo lugar.
          Agenda una <span className="text-primary font-semibold">demostración gratis</span> y
          prepárate para sorprenderte.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
          <button
            onClick={() => scrollTo('agenda')}
            className="w-full sm:w-auto bg-primary text-primary-foreground font-semibold px-8 py-3.5 rounded-xl shadow-sm hover:bg-primary/90 hover:shadow transition-all duration-300 text-lg"
          >
            Agendar demostración gratis
          </button>
          <button
            onClick={() => scrollTo('help')}
            className="w-full sm:w-auto text-primary font-semibold px-8 py-3.5 rounded-xl border border-primary/20 bg-white hover:border-primary/40 hover:bg-accent/50 transition-all duration-300 text-lg"
          >
            Ver todo lo que incluye
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center">
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
