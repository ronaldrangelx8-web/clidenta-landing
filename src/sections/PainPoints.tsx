"use client";
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Video, Phone, Camera, Mic, Wifi, SignalHigh, BatteryFull } from 'lucide-react';

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
    { type: 'message', message: { sender: 'ai', text: '¡Siempre disponible para ti! 24/7, los 365 días. Cualquier duda, escríbenos. 🦷', time: '11:44 PM' }, duration: 4000 },
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
    <section id="pain-points" className="bg-gradient-to-b from-teal-800 to-teal-900 py-20 px-4 text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-center mb-16">
          Esto te está pasando <span className="text-gold">ahora mismo</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Pain points list */}
          <div className="space-y-6">
            {painPoints.map((point, index) => (
              <div key={index} className="flex items-start gap-4">
                <span className="text-amber-300 bg-white/10 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">✕</span>
                <p className="text-white/90 text-lg leading-relaxed">{point}</p>
              </div>
            ))}
          </div>

          {/* iPhone + WhatsApp Chat Simulator */}
          <div className="flex justify-center w-full">
            {/* Marco del iPhone */}
            <div className="w-[320px] sm:w-[340px] rounded-[3.2rem] bg-[#111114] p-[11px] shadow-2xl ring-1 ring-white/15">
              {/* Pantalla */}
              <div className="rounded-[2.55rem] overflow-hidden bg-[#ECE5DD] flex flex-col h-[640px] relative">

                {/* Status bar + header iOS */}
                <div className="bg-[#f6f6f6] border-b border-black/10">
                  {/* Status bar */}
                  <div className="relative flex items-center justify-between px-7 pt-3 pb-1 text-[#111114]">
                    <span className="text-[13px] font-semibold tracking-tight">11:42</span>
                    {/* Dynamic Island */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-2.5 h-[26px] w-[100px] rounded-full bg-black" />
                    <span className="flex items-center gap-1">
                      <SignalHigh size={15} strokeWidth={2.5} />
                      <Wifi size={15} strokeWidth={2.5} />
                      <BatteryFull size={18} strokeWidth={2} />
                    </span>
                  </div>

                  {/* WhatsApp header */}
                  <div className="flex items-center gap-2 px-2.5 py-2">
                    <ChevronLeft size={26} className="text-[#007AFF] shrink-0" strokeWidth={2.2} />
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-600 to-teal-800 flex items-center justify-center text-base shrink-0">
                      🦷
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-[13.5px] text-[#111114] leading-tight truncate">
                        Recepcionista IA
                      </div>
                      <div className="text-[11px] text-gray-500 leading-tight">
                        {isTyping ? 'escribiendo…' : 'en línea'}
                      </div>
                    </div>
                    <Video size={22} className="text-[#007AFF] shrink-0 mr-2" strokeWidth={1.8} />
                    <Phone size={19} className="text-[#007AFF] shrink-0 mr-1" strokeWidth={1.8} />
                  </div>
                </div>

                {/* Time Stamp */}
                <div className="flex justify-center py-2">
                  <span className="bg-white/85 text-[10px] text-gray-500 px-3 py-1 rounded-full shadow-sm">11:42 PM · Hoy</span>
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
                      <p className="whitespace-pre-line leading-relaxed text-gray-800">{msg.text}</p>
                      <span className="text-[9px] text-gray-500 float-right mt-1 ml-2 flex items-center gap-1">
                        {msg.time}
                        {msg.sender === 'user' && <span className="text-[#53BDEB]">✓✓</span>}
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

                {/* Input bar iOS */}
                <div className="bg-[#f6f6f6] border-t border-black/10 px-3 pt-2 pb-1 flex items-center gap-2.5">
                  <Camera size={22} className="text-[#007AFF] shrink-0" strokeWidth={1.8} />
                  <div className="flex-1 bg-white rounded-full border border-black/10 px-4 py-[7px] text-[12.5px] text-gray-400">
                    Escribe un mensaje...
                  </div>
                  <Mic size={21} className="text-[#007AFF] shrink-0" strokeWidth={1.8} />
                </div>

                {/* Home indicator */}
                <div className="bg-[#f6f6f6] flex justify-center pb-2 pt-1">
                  <div className="h-[4px] w-32 rounded-full bg-black/85" />
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-16">
          <button
            onClick={scrollToCalendar}
            className="bg-gold text-white font-semibold px-8 py-3.5 rounded-xl shadow-sm hover:bg-gold/90 hover:shadow transition-all duration-300 text-lg"
          >
            Quiero más información
          </button>
        </div>
      </div>
    </section>
  );
};

export default PainPoints;
