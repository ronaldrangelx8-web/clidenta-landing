"use client";
import React from 'react';

const Trust: React.FC = () => {
  const scrollToCalendar = () => {
    const el = document.getElementById('agenda');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="trust" className="bg-[#fff7eb] py-20 px-4 border-t border-[#033754]/5">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-[#262a2e] mb-8">
          ¿Por qué confiar en Clidenta?
        </h2>

        <div className="max-w-4xl mx-auto space-y-6 text-left md:text-center">
          <p className="text-lg text-[#262a2e]/90 leading-relaxed max-w-3xl mx-auto">
            Nuestro equipo es experto en el diseño e integración de Inteligencia Artificial para atención y ventas, logrando una automatización fluida con las herramientas que ya utilizas en tu negocio.
          </p>

          <p className="text-lg text-[#262a2e]/90 leading-relaxed max-w-3xl mx-auto">
            Con más de 100 integraciones y desarrollos exitosos, ayudamos a negocios de servicios, clínicas y comercios a responder al instante a sus prospectos sin perder la calidez humana.
          </p>

          <p className="text-lg text-[#262a2e]/90 leading-relaxed max-w-3xl mx-auto mb-10">
            Todos nuestros desarrollos se entregan llave en mano, garantizando el control absoluto de tus canales y datos, e incluyendo soporte continuo de optimización.
          </p>
        </div>

        <div className="flex justify-center mt-10">
          <button
            onClick={scrollToCalendar}
            className="bg-[#033754] text-white font-semibold px-8 py-3.5 rounded-lg border border-[#033754] hover:bg-transparent hover:text-[#033754] transition-all duration-300 text-lg"
          >
            Quiero más información
          </button>
        </div>
      </div>
    </section>
  );
};

export default Trust;
