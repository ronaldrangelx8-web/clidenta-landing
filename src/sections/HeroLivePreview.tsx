"use client";
import React from 'react';
import { Sparkles } from 'lucide-react';

/**
 * Captura de la agenda "en vivo": un cursor la recorre y hace click, entra un
 * toast de "cita agendada por la IA" y un indicador "En vivo" — para que se
 * sienta que la app está siendo usada en tiempo real (no un screenshot muerto).
 */
export default function HeroLivePreview() {
  return (
    <div className="relative rounded-2xl overflow-hidden ring-1 ring-slate-900/10 shadow-2xl shadow-primary/10 bg-white">
      {/* Barra de navegador */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 border-b border-slate-200/80 relative z-20">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 flex-1 max-w-[16rem] truncate bg-white rounded-md text-[11px] text-slate-400 px-3 py-1 border border-slate-200 hidden sm:block">
          app.clidenta.net
        </span>
        <span className="ml-auto inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-600">
          <span className="relative flex h-2 w-2">
            <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          En vivo
        </span>
      </div>

      {/* Captura + capa animada */}
      <div className="relative">
        <img
          src="/screens/agenda.png"
          alt="Agenda semanal de Clidenta con citas agendadas por la IA"
          className="w-full block"
          loading="eager"
        />

        {/* Cursor que recorre la agenda */}
        <div
          className="pointer-events-none absolute z-10 hidden sm:block motion-safe:animate-[hero-cursor_6s_ease-in-out_infinite]"
          style={{ left: '0%', top: '0%' }}
        >
          <span className="absolute -left-1.5 -top-1.5 h-8 w-8 rounded-full bg-primary/30 motion-safe:animate-[hero-ripple_6s_ease-in-out_infinite]" />
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none" className="relative drop-shadow-md">
            <path d="M1 1L1 12.5L4.2 9.3L6.6 14.2L8.7 13.2L6.2 8.4L10.5 8.4Z" fill="white" stroke="#0f172a" strokeWidth="1.1" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Toast: la IA agendó una cita */}
        <div className="pointer-events-none absolute bottom-3 right-3 z-10 opacity-0 motion-safe:animate-[hero-toast_6s_ease-in-out_infinite]">
          <div className="flex items-center gap-2.5 rounded-xl bg-white shadow-lg ring-1 ring-slate-900/10 px-3.5 py-2.5">
            <div className="h-8 w-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
              <Sparkles size={16} />
            </div>
            <div className="text-left">
              <p className="text-[12px] font-semibold text-slate-800 leading-tight">Cita agendada por la IA</p>
              <p className="text-[11px] text-slate-500 leading-tight">Limpieza dental · mañana 4:30 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
