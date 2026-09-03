import LandingPage from '@/components/LandingPage';
import { DEFAULT_COPY } from '@/lib/adCopy';

// La home es 100% estática: se pre-renderiza en build y se sirve al instante
// aunque el backend o el propio servidor estén lentos. Los visitantes que
// llegan de un anuncio (?ad=/?v=/?utm_content=) son reescritos por el
// middleware a /a/[slug], que resuelve su copy con ISR.
export default function Home() {
  return <LandingPage copy={DEFAULT_COPY} />;
}
