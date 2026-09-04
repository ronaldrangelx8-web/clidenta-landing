import Image from 'next/image';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: 'Dra. Dennisse Arroyo',
    title: 'Clínica Odontológica Arroyo',
    rating: 5,
    quote: 'La IA responde consultas complejas de ortodoncia de forma impecable. Redujimos las inasistencias en un 95%.',
    experience: 'Más de 40 años de experiencia',
    avatar: '/reviews/dennisse.webp'
  },
  {
    id: 2,
    name: 'Dr. Miguel Dávila',
    title: 'Cirujano Dentista & Rehabilitación Estética',
    rating: 5,
    quote: 'La IA responde al instante en Instagram y WhatsApp, y agenda 24/7 sin superponer horarios. Transformó nuestra captación.',
    experience: 'Odontología y Cirugía Estética en Lima',
    avatar: '/reviews/miguel.webp'
  },
  {
    id: 3,
    name: 'Dr. Julio Zumaeta',
    title: 'Multident Especialista en Estética Dental',
    rating: 5,
    quote: 'La conversación es tan natural que los pacientes felicitan a nuestra «recepcionista». 40% menos tiempo administrativo.',
    experience: 'Especialista en Diseño de Sonrisas',
    avatar: '/reviews/julio.webp'
  },
  {
    id: 4,
    name: 'Dra. Carla Mendoza',
    title: 'Centro Dental Sonríe Lima',
    rating: 5,
    quote: 'Perdíamos 8 pacientes por semana por no responder a tiempo. Ahora la IA atiende en segundos, incluso a las 2 AM.',
    experience: 'Especialista en Endodoncia',
    avatar: '/reviews/carla.webp'
  },
  {
    id: 5,
    name: 'Dr. Fernando Castillo',
    title: 'Implantes Dentales Perú',
    rating: 5,
    quote: 'Explica procedimientos complejos como implantes con claridad. Los pacientes llegan mejor informados y más decididos.',
    experience: 'Cirujano Maxilofacial con 15 años',
    avatar: '/reviews/fernando.webp'
  },
  {
    id: 6,
    name: 'Dra. Valentina Ríos',
    title: 'OrthoSmile Clínica Ortodóntica',
    rating: 5,
    quote: 'Maneja más de 200 conversaciones semanales sin errores y envía seguimientos. Es como tener 3 recepcionistas extra.',
    experience: 'Ortodoncista certificada en Invisalign',
    avatar: '/reviews/valentina.webp'
  }
];

// Dos ciclos bastan para el marquee infinito y reducen a la mitad el HTML.
const duplicatedReviews = [...reviews, ...reviews];

export default function ReviewsMarquee() {
  return (
    <section className="deferred-section bg-background pb-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 mb-8">
        <p className="text-center text-xl md:text-2xl font-serif text-slate-900 font-semibold">
          Resultados comprobados por especialistas de la salud dental
        </p>
      </div>

      {/* Infinite Scroll Container */}
      <div className="relative flex w-full items-center justify-start overflow-x-auto py-4 md:overflow-x-hidden">
        {/* Left Gradient Shadow */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        
        {/* Infinite Scroll Track */}
        <div className="flex min-w-max gap-6 whitespace-normal md:animate-marquee md:cursor-pointer md:hover:[animation-play-state:paused]">
          {duplicatedReviews.map((review, idx) => (
            <div
              key={`${review.id}-${idx}`}
              aria-hidden={idx >= reviews.length}
              className="w-[300px] md:w-[360px] bg-white border border-border rounded-2xl p-6 md:p-8 shadow-sm flex flex-col justify-between transition-transform duration-300 hover:scale-[1.02]"
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex gap-1 text-primary">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" className="text-primary" />
                    ))}
                  </div>
                  <Quote size={24} className="text-primary/10" />
                </div>
                
                <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6 font-sans font-normal">
                  "{review.quote}"
                </p>
              </div>

              <div className="border-t border-border/60 pt-4 mt-auto flex items-center gap-3">
                <Image
                  src={review.avatar}
                  alt={review.name}
                  width={40}
                  height={40}
                  sizes="40px"
                  className="w-10 h-10 rounded-full object-cover shrink-0 shadow-md border-2 border-border"
                />
                <div>
                  <h3 className="font-serif font-semibold text-base text-slate-900">
                    {review.name}
                  </h3>
                  <p className="text-xs text-primary font-medium mb-1">
                    {review.title}
                  </p>
                  <span className="inline-block text-[10px] text-slate-500 bg-accent/60 px-2.5 py-1 rounded-md border border-border/60">
                    {review.experience}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Gradient Shadow */}
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
}
