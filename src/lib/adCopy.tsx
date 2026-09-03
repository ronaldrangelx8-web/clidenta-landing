import React from 'react';

/**
 * Copy dinámico por anuncio.
 *
 * La landing lee `?ad=<slug>` (o `utm_content`) de la URL del anuncio y
 * renderiza el copy del Hero que corresponde a ese anuncio, para que el
 * visitante aterrice en el mismo mensaje que acaba de ver en Meta.
 *
 * Marcado ligero dentro de los textos (pensado para editarse luego desde
 * el panel admin sin tocar código):
 *   *texto*  → resaltado en color primary
 *   _texto_  → resaltado primary + subrayado decorativo (solo en el título)
 *
 * URL a pegar en el anuncio de Meta (campo "Parámetros de URL"):
 *   ad=<slug>&utm_source=facebook&utm_medium=paid&utm_content={{ad.name}}
 */

export type AdCopy = {
  /** Texto de la ficha roja superior; el país geolocalizado se agrega al final. */
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: string;
};

export const DEFAULT_COPY: AdCopy = {
  eyebrow: 'Atención odontólogos',
  title:
    'Aumenta la facturación de tu Clínica Dental *hasta un 60%* con una _Recepcionista IA_',
  subtitle:
    'Atiende tu WhatsApp 24/7, agenda citas sola y llega con tu clínica completa. Lista en *7 días*.',
  cta: 'Agendar demostración gratis',
};

/**
 * Variantes por anuncio. La clave es el slug que va en `?ad=` en la URL
 * del anuncio. EJEMPLOS — edita/añade según tus anuncios reales.
 */
export const AD_VARIANTS: Record<string, AdCopy> = {
  'whatsapp-247': {
    eyebrow: 'Atención odontólogos',
    title:
      'Tu clínica responde el WhatsApp *a las 11 de la noche* con una _Recepcionista IA_',
    subtitle:
      'Cada mensaje sin responder es un paciente que se va a otra clínica. La IA contesta y agenda sola, 24/7.',
    cta: 'Ver cómo funciona gratis',
  },
  'citas-perdidas': {
    eyebrow: 'Atención odontólogos',
    title:
      'Deja de perder pacientes por *citas sin confirmar* — tu _Recepcionista IA_ los recupera',
    subtitle:
      'Confirma, reprograma y hace seguimiento por WhatsApp sin que tu equipo levante un dedo.',
    cta: 'Agendar demostración gratis',
  },
};

/** Resuelve el copy a partir de los searchParams de la página. */
export function resolveAdCopy(
  params: Record<string, string | string[] | undefined>,
): AdCopy {
  const pick = (v: string | string[] | undefined) =>
    Array.isArray(v) ? v[0] : v;
  const slug = (pick(params.ad) || pick(params.v) || pick(params.utm_content) || '')
    .toLowerCase()
    .trim();
  return (slug && AD_VARIANTS[slug]) || DEFAULT_COPY;
}

/**
 * Convierte el marcado ligero en nodos React.
 * `highlightClass` estiliza *texto*; `_texto_` añade además el subrayado.
 */
export function renderCopy(
  text: string,
  highlightClass = 'text-primary',
): React.ReactNode[] {
  return text.split(/(\*[^*]+\*|_[^_]+_)/g).map((part, i) => {
    if (part.startsWith('*') && part.endsWith('*')) {
      return (
        <span key={i} className={highlightClass}>
          {part.slice(1, -1)}
        </span>
      );
    }
    if (part.startsWith('_') && part.endsWith('_')) {
      return (
        <span key={i} className="relative whitespace-nowrap text-primary">
          {part.slice(1, -1)}
          <span className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-primary/50" />
        </span>
      );
    }
    return part;
  });
}
