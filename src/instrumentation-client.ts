// PostHog se descarga después de la carga inicial (o ante la primera
// interacción) para que la analítica no compita con el contenido principal.
const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
type PostHog = typeof import('posthog-js').default;

let posthogPromise: Promise<PostHog | null> | null = null;

function loadPostHog(): Promise<PostHog | null> {
  if (!key || typeof window === 'undefined') return Promise.resolve(null);
  if (posthogPromise) return posthogPromise;

  posthogPromise = import('posthog-js').then(({ default: posthog }) => {
    posthog.init(key, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
      defaults: '2026-08-30',
      capture_exceptions: true,
    });

    const ad = new URLSearchParams(window.location.search).get('ad');
    if (ad) posthog.register({ ad_slug: ad });

    return posthog;
  });

  return posthogPromise;
}

export function captureAnalyticsEvent(
  event: string,
  properties?: Record<string, unknown>,
) {
  void loadPostHog().then((posthog) => posthog?.capture(event, properties));
}

if (key && typeof window !== 'undefined') {
  let started = false;
  let delayedStart = 0;
  const interactionEvents: Array<keyof WindowEventMap> = ['pointerdown', 'keydown'];

  const start = () => {
    if (started) return;
    started = true;
    if (delayedStart) window.clearTimeout(delayedStart);
    interactionEvents.forEach((event) => window.removeEventListener(event, start));
    void loadPostHog();
  };

  interactionEvents.forEach((event) =>
    window.addEventListener(event, start, { once: true, passive: true }),
  );

  document.addEventListener(
    'click',
    (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const cta = target.closest<HTMLElement>('[data-cta]');
      if (!cta) return;

      captureAnalyticsEvent('hero_cta_clicked', {
        cta: cta.dataset.ctaLabel,
        channel: cta.dataset.cta,
      });
    },
    { capture: true },
  );

  window.addEventListener(
    'load',
    () => {
      delayedStart = window.setTimeout(start, 6000);
    },
    { once: true },
  );
}
