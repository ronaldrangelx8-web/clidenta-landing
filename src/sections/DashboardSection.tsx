"use client";
import React from 'react';
import { MessageSquare, Calendar, CheckCircle, Clock } from 'lucide-react';

const DashboardSection: React.FC = () => {
  const stats = [
    {
      id: 'msg',
      value: '247',
      label: 'Mensajes Respondidos',
      sublabel: 'Últimas 24 horas',
      icon: MessageSquare,
      color: 'text-[#033754]'
    },
    {
      id: 'appointments',
      value: '23',
      label: 'Citas Agendadas',
      sublabel: 'Automáticamente hoy',
      icon: Calendar,
      color: 'text-green-600'
    },
    {
      id: 'attendance',
      value: '95%',
      label: 'Tasa de Asistencia',
      sublabel: 'Gracias a recordatorios IA',
      icon: CheckCircle,
      color: 'text-blue-600'
    },
    {
      id: 'avail',
      value: '24/7',
      label: 'Disponibilidad',
      sublabel: 'Sin descansos ni vacaciones',
      icon: Clock,
      color: 'text-amber-600'
    }
  ];

  return (
    <section className="bg-[#fff7eb] py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white border border-[#033754]/10 rounded-lg p-8 md:p-10 shadow-sm">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#033754] bg-[#033754]/5 px-3 py-1 rounded-full">
              Panel de Control en Vivo
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-[#262a2e] mt-4">
              Gestiona tu clínica con Inteligencia
            </h2>
            <p className="text-[#262a2e]/70 mt-3 max-w-2xl mx-auto">
              Visualiza en tiempo real cómo el recepcionista IA de Clidenta optimiza la comunicación y automatiza tus consultas.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div 
                key={stat.id} 
                className="bg-[#fff7eb] border border-[#033754]/5 rounded-lg p-6 flex flex-col items-center text-center transition-all duration-300 hover:border-[#033754]/20"
              >
                <div className="p-3 bg-white rounded-full shadow-sm mb-4">
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="text-4xl font-serif font-bold text-[#262a2e] mb-1">
                  {stat.value}
                </div>
                <div className="font-serif font-semibold text-sm text-[#262a2e] mb-0.5">
                  {stat.label}
                </div>
                <div className="text-xs text-[#262a2e]/60">
                  {stat.sublabel}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardSection;
