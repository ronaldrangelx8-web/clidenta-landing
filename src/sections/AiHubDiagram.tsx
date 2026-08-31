"use client";
import React from 'react';
import { BrainCircuit, MessageCircle, CalendarDays, Users, Wallet, FolderOpen, Pill } from 'lucide-react';

/**
 * "Orbital" de la IA: el núcleo en el centro y los datos de la clínica en órbita.
 * Se evita el patrón "hub con radios punteados" (cliché de infografía): las
 * órbitas concéntricas hacen de conexión y el núcleo lleva un halo que gira.
 */
const NODES = [
  { icon: MessageCircle, label: 'WhatsApp', x: 50, y: 11 },
  { icon: CalendarDays, label: 'Agenda', x: 83, y: 31 },
  { icon: Users, label: 'Pacientes', x: 83, y: 69 },
  { icon: Wallet, label: 'Finanzas', x: 50, y: 89 },
  { icon: FolderOpen, label: 'Historias', x: 17, y: 69 },
  { icon: Pill, label: 'Recetas', x: 17, y: 31 },
];

export default function AiHubDiagram() {
  return (
    <div className="relative w-full max-w-[360px] mx-auto aspect-square">
      {/* Glow de fondo */}
      <div className="pointer-events-none absolute inset-[18%] rounded-full bg-gold/10 blur-3xl" />

      {/* Órbitas concéntricas (no radios) */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <circle cx="50" cy="50" r="39" fill="none" stroke="white" strokeOpacity="0.1" strokeWidth="0.4" />
        <circle cx="50" cy="50" r="24" fill="none" stroke="white" strokeOpacity="0.07" strokeWidth="0.4" />
      </svg>

      {/* Nodos en órbita */}
      {NODES.map((n) => (
        <div
          key={n.label}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
        >
          <div className="h-[52px] w-[52px] rounded-2xl bg-gradient-to-b from-white/[0.12] to-white/[0.03] border border-white/12 shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-sm flex items-center justify-center text-teal-50">
            <n.icon size={22} strokeWidth={1.6} />
          </div>
          <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-[11px] font-medium tracking-wide text-teal-100/65 whitespace-nowrap">
            {n.label}
          </span>
        </div>
      ))}

      {/* Núcleo IA */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative h-24 w-24">
          {/* Glow del núcleo */}
          <div className="absolute inset-[-10px] rounded-full bg-gold/25 blur-xl" />
          {/* Halo dorado que gira */}
          <div
            className="absolute inset-0 rounded-full motion-safe:animate-[spin_7s_linear_infinite]"
            style={{
              background:
                'conic-gradient(from 0deg, transparent 0deg, rgba(201,162,39,0.7) 55deg, transparent 130deg)',
              WebkitMask:
                'radial-gradient(farthest-side, transparent calc(100% - 2.5px), #000 calc(100% - 2.5px))',
              mask: 'radial-gradient(farthest-side, transparent calc(100% - 2.5px), #000 calc(100% - 2.5px))',
            }}
          />
          {/* Anillo fino estático */}
          <div className="absolute inset-0 rounded-full ring-1 ring-white/15" />
          {/* Disco del núcleo */}
          <div className="absolute inset-[6px] rounded-full bg-gradient-to-br from-teal-600 to-teal-800 border border-white/20 flex items-center justify-center text-white shadow-lg shadow-black/30">
            <BrainCircuit size={36} strokeWidth={1.5} />
          </div>
        </div>
      </div>
    </div>
  );
}
