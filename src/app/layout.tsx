import type { Metadata } from 'next';
import { DM_Sans, Fraunces, Lexend } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' });
const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces' });
const lexend = Lexend({ subsets: ['latin'], variable: '--font-lexend' });

export const metadata: Metadata = {
  title: 'El Mejor Recepcionista AI para Clínicas | Clidenta',
  description:
    'Descubre a Clidenta, el mejor recepcionista AI para clínicas odontológicas y médicas en Perú y LATAM. Automatiza la atención al paciente, agenda citas por WhatsApp y responde consultas 24/7 sin esfuerzo.',
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
              fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID}');
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
      <body className={`${dmSans.variable} ${fraunces.variable} ${lexend.variable}`}>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
        
        {children}

        <style dangerouslySetInnerHTML={{ __html: `
          .whatsapp-floating-btn {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 65px;
            height: 65px;
            background-color: #25d366;
            border-radius: 50%;
            box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.3s ease, background-color 0.3s ease;
          }
          .whatsapp-floating-btn:hover {
            transform: scale(1.1);
            background-color: #1ebe57;
          }
          .whatsapp-floating-btn img {
            width: 50px;
            height: 50px;
          }
        `}} />
        <a 
          href="https://wa.me/51920789569?text=Hola,%20me%20gustar%C3%ADa%20agendar%20una%20demostraci%C3%B3n%20del%20Recepcionista%20IA." 
          className="whatsapp-floating-btn" 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="Contáctanos por WhatsApp"
        >
          <img src="/whatsapp-svgrepo-com.svg" alt="WhatsApp" />
        </a>
      </body>
    </html>
  );
}
