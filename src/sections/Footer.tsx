"use client";
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#262a2e] py-8 px-4 border-t border-[#033754]/10">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-[#fff7eb]/75 text-sm mb-3 font-sans font-normal">
          Rangel Group LLC - Todos los derechos reservados
        </p>
        <a
          href="/politicas"
          className="text-[#fff7eb]/75 text-sm underline hover:text-[#fff7eb] transition-colors"
        >
          Políticas de privacidad
        </a>
      </div>
    </footer>
  );
};

export default Footer;
