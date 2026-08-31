import Hero from '@/sections/Hero';
import dynamic from 'next/dynamic';

const Agenda = dynamic(() => import('@/sections/Agenda'), { ssr: true });
const ReviewsMarquee = dynamic(() => import('@/sections/ReviewsMarquee'), { ssr: true });
const PainPoints = dynamic(() => import('@/sections/PainPoints'), { ssr: true });
const Help = dynamic(() => import('@/sections/Help'), { ssr: true });
const Steps = dynamic(() => import('@/sections/Steps'), { ssr: true });
const Trust = dynamic(() => import('@/sections/Trust'), { ssr: true });
const FAQ = dynamic(() => import('@/sections/FAQ'), { ssr: true });
const Footer = dynamic(() => import('@/sections/Footer'), { ssr: true });

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Agenda />
      <ReviewsMarquee />
      <PainPoints />
      <Help />
      <Steps />
      <Trust />
      <FAQ />
      <Footer />
    </main>
  );
}
