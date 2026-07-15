"use client";
import React from 'react';

const Help: React.FC = () => {
  const scrollToCalendar = () => {
    const el = document.getElementById('agenda');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const features = [
    {
      emoji: '📞',
      title: 'Atención 24/7 instantánea',
      description: 'Responde en segundos a cualquier hora, los 365 días. Cero pacientes perdidos.',
    },
    {
      emoji: '📅',
      title: 'Google Calendar sincronizado',
      description: 'Agenda, reagenda y cancela turnos automáticamente. Sin errores ni sobrecupos.',
    },
    {
      emoji: '💬',
      title: 'IA entrenada para convertir',
      description: 'Tono de vendedor experto. Maneja objeciones, envía seguimientos y cierra citas.',
    },
    {
      emoji: '🔔',
      title: 'Recordatorios automáticos',
      description: 'Confirmación por WhatsApp. Si cancelan, reagenda y llena ese espacio al instante.',
    }
  ];

  return (
    <section id="help" className="bg-[#fff7eb] py-20 px-4 border-t border-[#033754]/5">
      <div className="max-w-5xl mx-auto">
        
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-[#262a2e]">
            Tu problema.{' '}
            <span className="text-[#d9381e]">Nuestra solución.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-14">
          {features.map((item, index) => (
            <div 
              key={index} 
              className="bg-white border border-[#033754]/10 rounded-xl p-6 hover:border-[#033754]/25 hover:shadow-sm transition-all duration-300"
            >
              <div className="text-4xl mb-4">{item.emoji}</div>
              <h3 className="font-serif font-semibold text-xl text-[#262a2e] mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-[#262a2e]/75 leading-relaxed font-sans font-normal">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <button
            onClick={scrollToCalendar}
            className="bg-[#033754] text-white font-semibold px-8 py-3.5 rounded-lg border border-[#033754] hover:bg-transparent hover:text-[#033754] transition-all duration-300 text-lg font-sans"
          >
            Quiero automatizar mi clínica
          </button>
        </div>

      </div>
    </section>
  );
};

export default Help;
