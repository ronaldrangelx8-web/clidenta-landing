"use client";
import React from 'react';

const STEPS = [
  {
    number: '1',
    title: 'Sesión de diagnóstico',
    description: 'Analizamos tus canales de atención y tu agenda actual.',
  },
  {
    number: '2',
    title: 'Entrenamiento a medida',
    description: 'Cargamos tus servicios y le damos a la IA el tono de tu marca.',
  },
  {
    number: '3',
    title: 'Lanzamiento en 7 días',
    description: 'Conectamos tu WhatsApp con la clínica ya montada en el software.',
  },
];

const Steps: React.FC = () => {
  return (
    <section id="steps" className="bg-background py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-slate-900 text-center mb-16">
          Lo hacemos en <span className="text-primary">3 simples pasos</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-10 md:gap-8 border-t border-slate-200">
          {STEPS.map((step) => (
            <div key={step.number} className="pt-8 md:pr-6">
              <div className="font-serif text-5xl md:text-6xl font-semibold text-gold/80 leading-none mb-4 select-none">
                {step.number}
              </div>
              <h3 className="text-xl font-serif font-semibold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-slate-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Steps;
