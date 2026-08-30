"use client";
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-teal-950 py-8 px-4 border-t border-white/10">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-teal-100/70 text-sm mb-3 font-sans">
          Rangel Group LLC · Todos los derechos reservados
        </p>
        <a
          href="/politicas"
          className="text-teal-100/70 text-sm underline hover:text-white transition-colors"
        >
          Políticas de privacidad
        </a>
      </div>
    </footer>
  );
};

export default Footer;
