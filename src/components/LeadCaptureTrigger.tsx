import { ArrowRight } from "lucide-react";

const FALLBACK_WHATSAPP = "51920789569";
const FALLBACK_MESSAGE = encodeURIComponent(
  "Hola, quiero agendar una demostración gratuita de Clidenta.",
);

/**
 * CTA renderizado por el servidor. Si JavaScript todavía no cargó o falla,
 * conserva una salida funcional hacia WhatsApp; LeadCapture intercepta el
 * clic cuando está hidratado y abre el formulario sin abandonar la página.
 */
export default function LeadCaptureTrigger({ label }: { label: string }) {
  return (
    <a
      href={`https://wa.me/${FALLBACK_WHATSAPP}?text=${FALLBACK_MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      data-lead-form-trigger="primary"
      data-cta="lead-form"
      data-cta-label={label}
      className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-[0_10px_30px_-12px_hsl(var(--primary)/0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-[0_16px_35px_-14px_hsl(var(--primary)/0.7)] active:translate-y-0 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:w-auto sm:px-10"
    >
      {label}
      <ArrowRight aria-hidden="true" size={19} />
    </a>
  );
}
