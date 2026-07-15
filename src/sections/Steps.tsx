"use client";
import React from 'react';
import { FileText, PhoneCall, Rocket } from 'lucide-react';

const Steps: React.FC = () => {
  const scrollToCalendar = () => {
    const el = document.getElementById('agenda');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const steps = [
    {
      number: '1',
      title: 'Sesión de Diagnóstico',
      description: 'Analizamos tus canales actuales de atención, flujos de preguntas frecuentes y tu sistema de agenda o calendario.',
      icon: FileText,
    },
    {
      number: '2',
      title: 'Entrenamiento y Desarrollo',
      description: 'Cargamos la información de tus servicios, configuramos las reglas del asistente y diseñamos las respuestas con tono de marca.',
      icon: PhoneCall,
    },
    {
      number: '3',
      title: 'Lanzamiento en 7 Días',
      description: 'Conectamos a tu nuevo recepcionista IA a tu número de WhatsApp o sitio web, listo para capturar y agendar clientes 24/7.',
      icon: Rocket,
    },
  ];

  return (
    <section id="steps" className="bg-[#fff7eb] py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-[#262a2e] text-center mb-16">
          Lo hacemos en 3 simples pasos
        </h2>

        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="text-center px-4 flex flex-col items-center">
              <div className="text-7xl font-serif font-bold text-[#033754] mb-4 opacity-30">{step.number}</div>
              <div className="flex justify-center mb-4 p-3 bg-[#033754]/5 rounded-full text-[#033754]">
                <step.icon className="w-8 h-8" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-serif font-semibold text-[#262a2e] mb-3">{step.title}</h3>
              <p className="text-[#262a2e]/80 leading-relaxed max-w-sm">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
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

export default Steps;
