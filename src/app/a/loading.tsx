import Logo from '@/components/Logo';
import LeadCaptureTrigger from '@/components/LeadCaptureTrigger';
import { DEFAULT_COPY } from '@/lib/adCopy';

// Red de seguridad solo para las variantes de anuncio /a/[slug] (dinámicas):
// en el primer render de un slug el visitante ve la marca en vez de una
// pantalla en blanco. La home es estática y no lo necesita — tenerlo global
// le impedía pintar el hero progresivamente.
export default function Loading() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center px-4 text-center">
        <div className="animate-pulse">
          <Logo />
        </div>
        <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
          Estamos preparando la demostración para tu clínica.
        </p>
        <div className="mt-7 w-full sm:w-auto">
          <LeadCaptureTrigger label={DEFAULT_COPY.cta} />
        </div>
      </div>
    </main>
  );
}
