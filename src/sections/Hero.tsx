"use client";
import React from 'react';
import Logo from '@/components/Logo';

const Hero: React.FC = () => {
  const scrollToCalendar = () => {
    const el = document.getElementById('agenda');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="bg-[#fff7eb] pt-6 pb-4 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <Logo />
        </div>

        {/* Hero Title */}
        <h1 className="text-center text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-serif font-extrabold text-[#262a2e] leading-tight max-w-5xl mx-auto mb-8">
          Aumenta tu facturación <span className="text-[#b91c1c]">hasta un 60%</span> con un{' '}
          <span className="text-[#b91c1c]">recepcionista IA a medida</span> implementado en{' '}
          <span className="text-[#b91c1c]">solo 7 días</span>
        </h1>

        {/* Subtitle CTA */}
        <p className="font-sans font-normal text-center text-lg md:text-xl text-[#262a2e] opacity-90 max-w-3xl mx-auto mb-12 leading-relaxed">
          Tu recepcionista IA atiende 24/7, no se cansa, no pide vacaciones, ni aumentos. Agenda una{' '}
          <span className="text-[#b91c1c] font-semibold">demostración gratis</span> hoy mismo y prepárate para sorprenderte con los resultados.
        </p>

        {/* Scroll indicator */}
        <div className="flex justify-center">
          <button
            onClick={scrollToCalendar}
            aria-label="Ir a la sección de agendamiento"
            className="animate-bounce bg-[#033754] text-white rounded-full p-4.5 shadow-md hover:bg-opacity-90 transition-all duration-300 border border-[#033754]/10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
