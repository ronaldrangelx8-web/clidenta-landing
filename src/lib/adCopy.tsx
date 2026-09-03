import React from 'react';

/**
 * Copy dinámico por anuncio.
 *
 * La landing lee `?ad=<slug>` (o `utm_content`) de la URL del anuncio y
 * renderiza el copy del Hero que corresponde a ese anuncio, para que el
 * visitante aterrice en el mismo mensaje que acaba de ver en Meta.
 *
 * Los variants se crean y editan desde el panel admin (página Anuncios);
 * el backend los sirve en GET /public/landing/copy?ad=<slug>.
 *
 * Marcado ligero dentro de los textos:
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

/** Backend que sirve los copys creados desde el panel admin. */
const COPY_API_URL =
  process.env.LANDING_COPY_API_URL || 'https://api.clidenta.net';

/**
 * Resuelve el copy a partir de los searchParams de la página, consultando
 * el backend (server-side, cache 60s). Cualquier fallo → copy por defecto:
 * la landing nunca se cae por culpa del API.
 */
export async function resolveAdCopy(
  params: Record<string, string | string[] | undefined>,
): Promise<AdCopy> {
  const pick = (v: string | string[] | undefined) =>
    Array.isArray(v) ? v[0] : v;
  const slug = (pick(params.ad) || pick(params.v) || pick(params.utm_content) || '')
    .toLowerCase()
    .trim();
  if (!slug || !/^[a-z0-9-]{1,60}$/.test(slug)) return DEFAULT_COPY;

  try {
    const res = await fetch(
      `${COPY_API_URL}/public/landing/copy?ad=${encodeURIComponent(slug)}`,
      { next: { revalidate: 60 }, signal: AbortSignal.timeout(1500) },
    );
    if (!res.ok) return DEFAULT_COPY;
    const data = (await res.json()) as { copy: AdCopy | null };
    return data.copy ?? DEFAULT_COPY;
  } catch {
    return DEFAULT_COPY;
  }
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
