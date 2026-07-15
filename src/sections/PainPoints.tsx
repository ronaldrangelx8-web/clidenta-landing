"use client";
import React, { useState, useEffect, useRef } from 'react';

interface Message {
  sender: 'user' | 'ai';
  text: string;
  time: string;
}

const PainPoints: React.FC = () => {
  const painPoints = [
    'Tus pacientes escriben a las 11 PM. Nadie responde. Agendan con tu competencia.',
    'Tu secretaria confirma citas todo el día. Los pacientes en sala esperan sin atención.',
    'Urgencia dental a las 3 AM. Tu respuesta llega 8 horas después. Esos $500 se fueron.',
    'Te escriben por WhatsApp. Respondes horas tarde. Ese prospecto ya agendó con otro.',
    'Cero seguimiento a tus clientes. Sin un sistema de gestión, los pacientes se pierden y no vuelven.',
  ];

  const scrollToCalendar = () => {
    const el = document.getElementById('agenda');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const chatBodyRef = useRef<HTMLDivElement>(null);

  // WhatsApp Simulator logic
  const conversationSteps: { type: 'message' | 'typing'; message?: Message; duration: number }[] = [
    { type: 'message', message: { sender: 'user', text: 'Hola, quiero agendar una limpieza dental para mañana', time: '11:42 PM' }, duration: 1800 },
    { type: 'typing', duration: 1200 },
    { type: 'message', message: { sender: 'ai', text: '¡Hola! 😊 Con gusto te ayudo. Revisando la agenda de mañana...', time: '11:42 PM' }, duration: 1500 },
    { type: 'typing', duration: 2000 },
    { type: 'message', message: { sender: 'ai', text: 'Tengo estos horarios disponibles:\n\n🕒 10:30 AM\n🕒 3:00 PM\n🕒 4:30 PM\n\n¿Cuál te queda mejor?', time: '11:42 PM' }, duration: 2000 },
    { type: 'message', message: { sender: 'user', text: '4:30 PM perfecto', time: '11:43 PM' }, duration: 1500 },
    { type: 'typing', duration: 1500 },
    { type: 'message', message: { sender: 'ai', text: '✅ ¡Listo! Cita agendada:\n\n📅 Mañana miércoles\n🕒 4:30 PM\n🦷 Limpieza dental\n\nTe enviaré un recordatorio 24h antes. ¡Te esperamos!', time: '11:43 PM' }, duration: 1800 },
    { type: 'message', message: { sender: 'user', text: 'Wow, ¡a esta hora y me respondieron! Gracias 🙌', time: '11:44 PM' }, duration: 1500 },
    { type: 'typing', duration: 1000 },
    { type: 'message', message: { sender: 'ai', text: '¡Siempre disponible para ti! 24/7, los 365 días. Cualquier duda, escríbenos. 💙', time: '11:44 PM' }, duration: 4000 },
  ];

  const [isTyping, setIsTyping] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  const visibleMessages = conversationSteps
    .slice(0, stepIndex + 1)
    .filter((step) => step.type === 'message' && step.message)
    .map((step) => step.message as Message);

  // Auto-scroll to bottom on new messages or typing
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [visibleMessages.length, isTyping]);

  useEffect(() => {
    let timer: any;

    const runStep = () => {
      if (stepIndex >= conversationSteps.length) {
        // Reset after completion
        timer = setTimeout(() => {
          setIsTyping(false);
          setStepIndex(0);
        }, 3000);
        return;
      }

      const currentStep = conversationSteps[stepIndex];

      if (currentStep.type === 'typing') {
        setIsTyping(true);
        timer = setTimeout(() => {
          setIsTyping(false);
          setStepIndex((prev) => prev + 1);
        }, currentStep.duration);
      } else if (currentStep.type === 'message') {
        setIsTyping(false);
        timer = setTimeout(() => {
          setStepIndex((prev) => prev + 1);
        }, currentStep.duration);
      }
    };

    runStep();

    return () => clearTimeout(timer);
  }, [stepIndex]);

  return (
    <section id="pain-points" className="bg-[#033754] py-20 px-4 text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-center mb-16">
          Esto te está pasando <span className="text-[#ff6b4a]">ahora mismo</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Pain points list */}
          <div className="space-y-6">
            {painPoints.map((point, index) => (
              <div key={index} className="flex items-start gap-4">
                <span className="text-[#fff7eb] bg-white/10 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">✕</span>
                <p className="text-white/90 text-lg leading-relaxed">{point}</p>
              </div>
            ))}
          </div>

          {/* WhatsApp Chat Simulator */}
          <div className="flex justify-center w-full max-w-md mx-auto">
            <div className="w-full bg-[#efeae2] rounded-2xl overflow-hidden shadow-2xl border border-gray-300/50 text-gray-800 flex flex-col h-[500px]">
              
              {/* WhatsApp Header */}
              <div className="bg-[#075e54] text-white px-4 py-3.5 flex items-center gap-3 shadow-md">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/30 to-white/10 flex items-center justify-center text-lg">
                  🦷
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm">Recepcionista IA · Clínica Dental</div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <span className="text-[10px] text-white/80">en línea</span>
                  </div>
                </div>
              </div>

              {/* Time Stamp */}
              <div className="flex justify-center py-2">
                <span className="bg-white/80 text-[10px] text-gray-600 px-3 py-1 rounded-full shadow-sm">11:42 PM · Hoy</span>
              </div>

              {/* Chat Body */}
              <div ref={chatBodyRef} className="flex-1 px-3 pb-3 overflow-y-auto space-y-2 flex flex-col justify-start scroll-smooth">
                
                {visibleMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`max-w-[80%] rounded-lg p-2.5 text-[13px] shadow-sm relative ${
                      msg.sender === 'user'
                        ? 'bg-[#d9fdd3] self-end rounded-tr-none'
                        : 'bg-white self-start rounded-tl-none'
                    }`}
                    style={{ animation: 'fadeInUp 0.3s ease-out' }}
                  >
                    <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>
                    <span className="text-[9px] text-gray-600 float-right mt-1 ml-2 flex items-center gap-1">
                      {msg.time}
                      {msg.sender === 'user' && <span className="text-blue-500">✓✓</span>}
                    </span>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="bg-white max-w-[70px] rounded-lg rounded-tl-none p-3 shadow-sm self-start flex gap-1.5 justify-center items-center">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                )}
              </div>

              {/* WhatsApp Footer input mockup */}
              <div className="bg-[#f0f2f5] p-2.5 flex items-center gap-2 border-t border-gray-200">
                <div className="text-gray-500 text-lg">😊</div>
                <div className="flex-1 bg-white rounded-full px-4 py-2 text-xs text-gray-500">
                  Escribe un mensaje...
                </div>
                <div className="w-9 h-9 rounded-full bg-[#075e54] flex items-center justify-center text-white text-sm">
                  🎤
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-16">
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

export default PainPoints;
