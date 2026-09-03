import React, { Suspense } from 'react';
import Hero from '@/sections/Hero';

// Lazy loading de componentes pesados que no están en el primer pantallazo (Below the fold)
const ReviewsMarquee = React.lazy(() => import('@/sections/ReviewsMarquee'));
const PainPoints = React.lazy(() => import('@/sections/PainPoints'));
const Help = React.lazy(() => import('@/sections/Help'));
const Steps = React.lazy(() => import('@/sections/Steps'));
const Trust = React.lazy(() => import('@/sections/Trust'));
const FAQ = React.lazy(() => import('@/sections/FAQ'));
const Footer = React.lazy(() => import('@/sections/Footer'));

const Home: React.FC = () => {
  return (
    <main className="min-h-screen">
      {/* Hero se carga de inmediato para no afectar el LCP */}
      <Hero />
      
      {/* El resto de la página se carga de forma diferida para liberar el Hilo Principal y mejorar el INP */}
      <Suspense fallback={<div className="h-32 flex items-center justify-center opacity-50">Cargando...</div>}>
        <ReviewsMarquee />
        <PainPoints />
        <Help />
        <Steps />
        <Trust />
        <FAQ />
        <Footer />
      </Suspense>
    </main>
  );
};

export default Home;
