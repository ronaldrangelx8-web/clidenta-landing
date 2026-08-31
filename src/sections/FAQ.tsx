"use client";
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQ: React.FC = () => {
  const scrollToCalendar = () => {
    const el = document.getElementById('agenda');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: '¿Cómo funciona la demostración gratis?',
      answer: 'Es una reunión corta donde analizamos tus canales de atención (WhatsApp, redes, web) y cómo trabaja tu clínica. Te mostramos en vivo cómo entrenaríamos una IA que suene como tú y esté conectada con cada dato de tu clínica: agenda, precios, pacientes y tratamientos.',
    },
    {
      question: '¿Es solo un chatbot o incluye software de gestión?',
      answer: 'Clidenta es la plataforma completa de tu clínica: agenda por doctor, historias clínicas, odontograma digital con historial, recetas, recordatorios, finanzas, inventario y laboratorio. La recepcionista IA vive dentro del software, por eso conoce tus precios, horarios y pacientes — no es un bot genérico.',
    },
    {
      question: '¿En qué canales se puede integrar el recepcionista IA?',
      answer: 'Podemos integrarlo en tu número de WhatsApp Business, tus cuentas de Instagram y Facebook Messenger, o directamente como un widget de chat en tu sitio web. Las respuestas se adaptan a cada plataforma.',
    },
    {
      question: '¿Se conecta con mi calendario o CRM actual?',
      answer: 'Sí. Tu recepcionista IA agenda directamente en el calendario de Clidenta y puede sincronizarse con herramientas como Google Calendar, Outlook, Cal.com o tu CRM actual mediante integraciones personalizadas.',
    },
    {
      question: '¿Qué pasa si la IA no sabe responder una pregunta?',
      answer: 'El asistente de IA responderá con base en las reglas de tu negocio. Si detecta una solicitud compleja o si el paciente pide explícitamente hablar con una persona, transferirá el chat de inmediato a tu equipo humano notificándoles al instante.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-gradient-to-b from-teal-800 to-teal-900 py-20 px-4 text-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-center mb-16">
          Preguntas frecuentes
        </h2>

        <div className="space-y-4 mb-16">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-sm transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-accent/40 transition-colors"
              >
                <span className="text-slate-900 font-serif font-semibold text-lg">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-primary transition-transform duration-300 flex-shrink-0 ml-4 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-5 text-slate-600 leading-relaxed border-t border-border pt-4">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <button
            onClick={scrollToCalendar}
            className="bg-white text-teal-900 font-semibold px-8 py-3.5 rounded-xl shadow-sm hover:bg-teal-50 hover:shadow transition-all duration-300 text-lg"
          >
            Agendar demostración gratis
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
