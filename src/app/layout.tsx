import type { Metadata } from 'next';
import { DM_Sans, Fraunces } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' });
const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces' });

export const metadata: Metadata = {
  title: 'El Mejor Recepcionista AI para Clínicas | Clidenta',
  description:
    'Descubre Clidenta: recepcionista IA + software integral para clínicas odontológicas en Perú y LATAM. Agenda, odontograma digital, historias clínicas, recordatorios y atención por WhatsApp 24/7.',
  keywords:
    'el mejor recepcionista AI para clínicas, inteligencia artificial para consultorios, chatbot médico para WhatsApp, agenda de citas médica automatizada, asistente virtual médico, software de recepción dental, Clidenta Perú LATAM',
  authors: [{ name: 'Clidenta' }],
  robots: 'index, follow',
  alternates: {
    canonical: 'https://clidenta.com/',
  },
  openGraph: {
    title: 'El Mejor Recepcionista AI para Clínicas | Clidenta',
    description:
      'Automatiza la atención de tus pacientes con la IA más avanzada. Agenda citas y responde consultas 24/7 por WhatsApp.',
    url: 'https://clidenta.com/',
    siteName: 'Clidenta',
    images: [
      {
        url: 'https://clidenta.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Clidenta Recepcionista AI',
      },
    ],
    locale: 'es_PE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'El Mejor Recepcionista AI para Clínicas | Clidenta',
    description:
      'Automatiza la atención de tus pacientes con la IA más avanzada. Agenda citas y responde consultas 24/7 por WhatsApp.',
    images: ['https://clidenta.com/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <Script
          id="fb-pixel"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1677925763319298');
              fbq('track', 'PageView');
            `,
          }}
        />
        <Script
          id="ms-clarity"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "xiplwu054l");
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Clidenta - Recepcionista AI",
              "operatingSystem": "Web, WhatsApp",
              "applicationCategory": "BusinessApplication",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "description": "El mejor recepcionista AI para clínicas en Perú y LATAM. Automatiza agendamiento de citas y atención al paciente por WhatsApp las 24 horas.",
              "publisher": {
                "@type": "Organization",
                "name": "Clidenta"
              }
            }),
          }}
        />
      </head>
      <body className={`${dmSans.variable} ${fraunces.variable}`}>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=1677925763319298&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
        
        {children}

      </body>
    </html>
  );
}
