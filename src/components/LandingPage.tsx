import Hero from '@/sections/Hero';
import ReviewsMarquee from '@/sections/ReviewsMarquee';
import Footer from '@/sections/Footer';
import type { AdCopy } from '@/lib/adCopy';

/** Composición completa de la landing; el copy del Hero varía por anuncio. */
export default function LandingPage({ copy }: { copy: AdCopy }) {
  return (
    <main className="min-h-screen">
      <Hero copy={copy} />
      <ReviewsMarquee />
      <Footer />
    </main>
  );
}
