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
      answer: 'Es una reunión corta donde analizamos tus canales de atención actuales (WhatsApp, Web, redes) y los flujos de preguntas frecuentes. Te mostraremos en vivo cómo estructuraríamos tu recepcionista IA. ¡Te sorprenderás de los resultados!',
    },
    {
      question: '¿En qué canales se puede integrar el recepcionista IA?',
      answer: 'Podemos integrarlo en tu número de WhatsApp Business, tus cuentas de Instagram y Facebook Messenger, o directamente como un widget de chat en tu sitio web. Las respuestas se adaptan a cada plataforma.',
    },
    {
      question: '¿Se conecta con mi calendario o CRM actual?',
      answer: 'Sí. Tu recepcionista IA puede consultar tu disponibilidad en tiempo real y agendar citas directamente en herramientas como Google Calendar, Outlook, Cal.com, Calendly o tu CRM/software administrativo mediante integraciones personalizadas.',
    },
    {
      question: '¿Qué pasa si la IA no sabe responder una pregunta?',
      answer: 'El asistente de IA responderá con base en las reglas de tu negocio. Si detecta una solicitud compleja o si el cliente pide explícitamente hablar con una persona, transferirá el chat de inmediato a tu equipo humano notificándoles al instante.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-[#033754] py-20 px-4 text-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-center mb-16">
          Preguntas frecuentes
        </h2>

        <div className="space-y-4 mb-16">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-[#fff7eb] border border-white/10 rounded-lg overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-[#fff7eb]/90 transition-colors"
              >
                <span className="text-[#262a2e] font-serif font-semibold text-lg">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#033754] transition-transform duration-300 flex-shrink-0 ml-4 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-5 text-[#262a2e]/90 leading-relaxed border-t border-[#033754]/10 pt-4">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <button
            onClick={scrollToCalendar}
            className="bg-[#fff7eb] text-[#033754] font-semibold px-8 py-3.5 rounded-lg border border-[#fff7eb] hover:bg-transparent hover:text-[#fff7eb] transition-all duration-300 text-lg"
          >
            Quiero más información
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
