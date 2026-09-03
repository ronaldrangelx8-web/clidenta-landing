import LandingPage from '@/components/LandingPage';
import { DEFAULT_COPY, fetchAdCopy } from '@/lib/adCopy';

// Variante de la landing por anuncio (el middleware reescribe /?ad=<slug> aquí).
// ISR: la primera visita de cada slug se renderiza una vez y queda cacheada;
// las siguientes se sirven estáticas y se regeneran en background cada 60s,
// así el copy editado en el admin tarda ≤1 min en reflejarse sin costar TTFB.
export const revalidate = 60;

export default async function AdLanding({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const copy = /^[a-z0-9-]{1,60}$/.test(slug)
    ? await fetchAdCopy(slug)
    : DEFAULT_COPY;
  return <LandingPage copy={copy} />;
}
