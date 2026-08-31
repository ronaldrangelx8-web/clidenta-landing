"use client";
import React from 'react';
import { Bot, MessageCircle, CalendarDays, Users, Wallet, FolderOpen, Pill } from 'lucide-react';

/**
 * Diagrama radial: la IA en el centro, conectada con cada dato de la clínica.
 * Es una ilustración conceptual (no un screenshot). Las líneas "fluyen" hacia
 * el núcleo para comunicar que la IA se alimenta de todo el sistema.
 */
const NODES = [
  { icon: MessageCircle, label: 'WhatsApp', x: 50, y: 14 },
  { icon: CalendarDays, label: 'Agenda', x: 81, y: 32 },
  { icon: Users, label: 'Pacientes', x: 81, y: 68 },
  { icon: Wallet, label: 'Finanzas', x: 50, y: 86 },
  { icon: FolderOpen, label: 'Historias', x: 19, y: 68 },
  { icon: Pill, label: 'Recetas', x: 19, y: 32 },
];

export default function AiHubDiagram() {
  return (
    <div className="relative w-full max-w-[360px] mx-auto aspect-square">
      {/* Conectores */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {NODES.map((n) => (
          <line
            key={n.label}
            x1="50"
            y1="50"
            x2={n.x}
            y2={n.y}
            className="hub-line"
            stroke="currentColor"
            strokeWidth="0.5"
          />
        ))}
      </svg>

      {/* Nodos satélite */}
      {NODES.map((n) => (
        <div
          key={n.label}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
        >
          <div className="h-14 w-14 rounded-full bg-white/[0.07] border border-white/15 backdrop-blur-sm flex items-center justify-center text-teal-100 shadow-sm">
            <n.icon size={22} strokeWidth={1.6} />
          </div>
          <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 text-[11px] font-medium text-teal-100/70 whitespace-nowrap">
            {n.label}
          </span>
        </div>
      ))}

      {/* Núcleo IA */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <span className="absolute inset-0 rounded-full bg-gold/20 motion-safe:animate-ping" />
        <div className="relative h-20 w-20 rounded-full bg-gradient-to-br from-white/25 to-white/5 border border-white/25 ring-1 ring-gold/40 flex items-center justify-center text-white shadow-lg shadow-black/20">
          <Bot size={34} strokeWidth={1.6} />
        </div>
      </div>
    </div>
  );
}
