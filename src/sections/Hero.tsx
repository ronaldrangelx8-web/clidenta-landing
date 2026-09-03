"use client";
import React, { useEffect, useState } from 'react';
import Logo from '@/components/Logo';
import { MessageCircle } from 'lucide-react';
import HeroLivePreview from './HeroLivePreview';
import { AdCopy, DEFAULT_COPY, renderCopy } from '@/lib/adCopy';
import posthog from '@/instrumentation-client';

const WHATSAPP_NUMBER = '51920789569';
const WHATSAPP_MESSAGE =
  'Hola, vi Clidenta y quiero recibir más información y coordinar una demostración.';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

/** ISO country code → "Perú 🇵🇪" (nombre en español + bandera regional). */
function countryLabel(code: string): string {
  try {
    const name = new Intl.DisplayNames(['es'], { type: 'region' }).of(code) || code;
    const flag = code
      .toUpperCase()
      .replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)));
    // "del Perú / del Ecuador", pero "de México / de Chile"…
    const article = ['PE', 'EC'].includes(code.toUpperCase()) ? 'del' : 'de';
    return `${article} ${name} ${flag}`;
  } catch {
    return 'del Perú 🇵🇪';
  }
}

const Hero: React.FC<{ copy?: AdCopy }> = ({ copy = DEFAULT_COPY }) => {
  // Geolocalización por IP para personalizar el badge (fallback: Perú).
  const [geo, setGeo] = useState('del Perú 🇵🇪');

  useEffect(() => {
    fetch('https://api.country.is/')
      .then((r) => r.json())
      .then((d) => {
        if (d?.country) setGeo(countryLabel(d.country));
      })
      .catch(() => {});
  }, []);

  return (
    <section className="bg-background pt-8 pb-10 px-4 relative overflow-hidden">
      {/* Halo suave de marca */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[420px] w-[720px] rounded-full bg-primary/5 blur-3xl" />

      <div className="max-w-5xl mx-auto relative">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Logo />
        </div>

        {/* Eyebrow — ficha roja de alerta */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-600 text-white text-[11px] sm:text-xs font-semibold tracking-[0.12em] uppercase px-4 py-1.5 shadow-sm motion-safe:animate-[vibrate_3s_ease-in-out_infinite]">
            {copy.eyebrow} {geo}
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-center text-3xl sm:text-4xl md:text-5xl font-sans font-bold tracking-tight text-slate-900 leading-[1.15] max-w-4xl mx-auto mb-5">
          {renderCopy(copy.title)}
        </h1>

        {/* Subtitle — corto y amigable */}
        <p className="font-sans text-center text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
          {renderCopy(copy.subtitle, 'text-primary font-semibold')}
        </p>

        {/* CTA directo a WhatsApp */}
        <div className="flex justify-center mb-10">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              posthog.capture('hero_cta_clicked', {
                cta: copy.cta,
                channel: 'whatsapp',
              })
            }
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold px-10 py-4 rounded-xl shadow-sm hover:bg-primary/90 hover:shadow active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all duration-300 text-lg"
          >
            <MessageCircle aria-hidden="true" size={22} />
            Agendar por WhatsApp
          </a>
        </div>

        {/* Producto real, "en vivo": la agenda de Clidenta */}
        <div className="max-w-4xl mx-auto">
          <HeroLivePreview />
        </div>
      </div>
    </section>
  );
};

export default Hero;
