import dynamic from 'next/dynamic';
import Hero from '@/sections/Hero';
import type { AdCopy } from '@/lib/adCopy';

const ReviewsMarquee = dynamic(() => import('@/sections/ReviewsMarquee'), { ssr: true });
const Footer = dynamic(() => import('@/sections/Footer'), { ssr: true });

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
