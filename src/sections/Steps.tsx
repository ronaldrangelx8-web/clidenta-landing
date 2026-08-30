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
      description: 'Conectamos tu nuevo recepcionista IA a tu WhatsApp con tu clínica ya montada en el software, listo para capturar y agendar pacientes 24/7.',
      icon: Rocket,
    },
  ];

  return (
    <section id="steps" className="bg-background py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-slate-900 text-center mb-16">
          Lo hacemos en <span className="text-primary">3 simples pasos</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative bg-white border border-border rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 text-center flex flex-col items-center"
            >
              <div className="absolute top-6 right-7 font-serif text-5xl font-semibold text-gold/25 select-none">
                {step.number}
              </div>
              <div className="flex justify-center mb-5 p-3.5 bg-accent rounded-2xl text-primary">
                <step.icon className="w-8 h-8" strokeWidth={1.6} />
              </div>
              <h3 className="text-xl font-serif font-semibold text-slate-900 mb-3">{step.title}</h3>
              <p className="text-slate-600 leading-relaxed max-w-sm">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <button
            onClick={scrollToCalendar}
            className="bg-primary text-primary-foreground font-semibold px-8 py-3.5 rounded-xl shadow-sm hover:bg-primary/90 hover:shadow transition-all duration-300 text-lg"
          >
            Quiero más información
          </button>
        </div>
      </div>
    </section>
  );
};

export default Steps;
