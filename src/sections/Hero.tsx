import Logo from '@/components/Logo';
import { MessageCircle } from 'lucide-react';
import HeroLivePreview from './HeroLivePreview';
import { AdCopy, DEFAULT_COPY, renderCopy } from '@/lib/adCopy';

const WHATSAPP_NUMBER = '51920789569';
const WHATSAPP_MESSAGE =
  'Hola, vi Clidenta y quiero recibir más información y coordinar una demostración.';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export default function Hero({ copy = DEFAULT_COPY }: { copy?: AdCopy }) {
  return (
    <section className="bg-background pt-8 pb-10 px-4 relative overflow-hidden">
      {/* Halo suave de marca */}
      <div className="pointer-events-none absolute -top-40 left-1/2 hidden h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl sm:block" />

      <div className="max-w-5xl mx-auto relative">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Logo />
        </div>

        {/* Eyebrow — ficha roja de alerta */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-600 text-white text-[11px] sm:text-xs font-semibold tracking-[0.12em] uppercase px-4 py-1.5 shadow-sm md:motion-safe:animate-[vibrate_3s_ease-in-out_infinite]">
            {copy.eyebrow} del Perú 🇵🇪
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="mx-auto mb-5 max-w-4xl text-center font-sans text-3xl font-bold leading-[1.15] tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
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
            data-cta="whatsapp"
            data-cta-label={copy.cta}
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold px-10 py-4 rounded-xl shadow-sm hover:bg-primary/90 hover:shadow active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all duration-300 text-lg"
          >
            <MessageCircle aria-hidden="true" size={22} />
            Agendar por WhatsApp
          </a>
        </div>

        {/* Producto real, "en vivo": la agenda de Clidenta */}
        <div className="mx-auto max-w-[300px] sm:max-w-4xl">
          <HeroLivePreview />
        </div>
      </div>
    </section>
  );
}
