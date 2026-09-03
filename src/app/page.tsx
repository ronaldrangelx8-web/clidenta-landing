import Hero from '@/sections/Hero';
import dynamic from 'next/dynamic';
import { resolveAdCopy } from '@/lib/adCopy';

const Agenda = dynamic(() => import('@/sections/Agenda'), { ssr: true });
const ReviewsMarquee = dynamic(() => import('@/sections/ReviewsMarquee'), { ssr: true });
const Footer = dynamic(() => import('@/sections/Footer'), { ssr: true });

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  // Copy del Hero según el anuncio de origen (?ad=<slug>), SSR sin parpadeo.
  const copy = resolveAdCopy(await searchParams);

  return (
    <main className="min-h-screen">
      <Hero copy={copy} />
      <Agenda />
      <ReviewsMarquee />
      <Footer />
    </main>
  );
}
