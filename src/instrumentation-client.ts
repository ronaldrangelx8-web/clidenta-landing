import posthog from 'posthog-js';

// PostHog: analítica del landing (pageviews, autocapture, replay, web vitals,
// errores). Si no hay key configurada queda como no-op.
const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;

// El guard de window evita ejecutar el init cuando Next evalúa este módulo en SSR.
if (key && typeof window !== 'undefined') {
  posthog.init(key, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
    defaults: '2026-08-30',
    capture_exceptions: true,
  });

  // Atribución por anuncio (?ad=<slug>): viaja como propiedad en todos los
  // eventos de la sesión, igual que los UTM que PostHog captura solo.
  const ad = new URLSearchParams(window.location.search).get('ad');
  if (ad) {
    posthog.register({ ad_slug: ad });
  }
}

export default posthog;
