"use client";
import React from 'react';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: 'Dra. Dennisse Arroyo',
    title: 'Clínica Odontológica Arroyo',
    rating: 5,
    quote: 'Nuestra clínica está sumamente satisfecha con Clidenta. La forma en que la inteligencia artificial responde consultas complejas de ortodoncia es impecable. Redujimos las inasistencias en un 95% gracias a sus recordatorios automáticos.',
    experience: 'Más de 40 años de experiencia',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    id: 2,
    name: 'Dr. Miguel Dávila',
    title: 'Cirujano Dentista & Rehabilitación Estética',
    rating: 5,
    quote: 'Gracias a Clidenta logré manejar un volumen muy alto de mensajes en Instagram y WhatsApp. La IA responde al instante con tono profesional y agenda citas 24/7 sin superponer horarios. Transformó por completo nuestra captación digital.',
    experience: 'Odontología y Cirugía Estética en Lima',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    id: 3,
    name: 'Dr. Julio Zumaeta',
    title: 'Multident Especialista en Estética Dental',
    rating: 5,
    quote: 'Teníamos dudas sobre si los pacientes notarían que hablan con una IA, pero la conversación es tan natural y humana que muchos agendan felicitando a nuestra "recepcionista". La reducción del tiempo administrativo ha sido del 40%.',
    experience: 'Especialista en Diseño de Sonrisas',
    avatar: 'https://randomuser.me/api/portraits/men/67.jpg'
  },
  {
    id: 4,
    name: 'Dra. Carla Mendoza',
    title: 'Centro Dental Sonríe Lima',
    rating: 5,
    quote: 'Antes perdíamos hasta 8 pacientes por semana por no responder a tiempo. Con Clidenta, la IA atiende cada mensaje en segundos, incluso a las 2 AM. Nuestro índice de conversión de consultas a citas subió un 60% en el primer mes.',
    experience: 'Especialista en Endodoncia',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
  },
  {
    id: 5,
    name: 'Dr. Fernando Castillo',
    title: 'Implantes Dentales Perú',
    rating: 5,
    quote: 'Lo que más me impresionó fue la capacidad de Clidenta para explicar procedimientos complejos como implantes y cirugías. Los pacientes llegan mejor informados y más decididos. Ha elevado la calidad de nuestra atención digital al 100%.',
    experience: 'Cirujano Maxilofacial con 15 años',
    avatar: 'https://randomuser.me/api/portraits/men/52.jpg'
  },
  {
    id: 6,
    name: 'Dra. Valentina Ríos',
    title: 'OrthoSmile Clínica Ortodóntica',
    rating: 5,
    quote: 'Implementamos Clidenta hace 3 meses y ya no podemos imaginar volver atrás. La IA maneja más de 200 conversaciones semanales sin errores, agenda correctamente y hasta envía seguimientos post-tratamiento. Es como tener 3 recepcionistas extra.',
    experience: 'Ortodoncista certificada en Invisalign',
    avatar: 'https://randomuser.me/api/portraits/women/33.jpg'
  }
];

// Double the reviews array to ensure seamless infinite looping scroll
const duplicatedReviews = [...reviews, ...reviews, ...reviews, ...reviews];

const ReviewsMarquee: React.FC = () => {
  return (
    <section className="bg-[#fff7eb] pb-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 mb-8">
        <p className="text-center text-xl md:text-2xl font-serif text-[#262a2e] font-semibold">
          Resultados comprobados por especialistas de la salud dental
        </p>
      </div>

      {/* Infinite Scroll Container */}
      <div className="relative w-full flex items-center justify-start overflow-x-hidden py-4">
        {/* Left Gradient Shadow */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#fff7eb] to-transparent z-10 pointer-events-none" />
        
        {/* Infinite Scroll Track */}
        <div className="flex gap-6 animate-marquee whitespace-normal min-w-max hover:[animation-play-state:paused] cursor-pointer">
          {duplicatedReviews.map((review, idx) => (
            <div
              key={`${review.id}-${idx}`}
              className="w-[300px] md:w-[360px] bg-white border border-[#033754]/10 rounded-xl p-6 md:p-8 shadow-sm flex flex-col justify-between transition-transform duration-300 hover:scale-[1.02]"
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex gap-1 text-amber-500">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" className="text-amber-500" />
                    ))}
                  </div>
                  <Quote size={24} className="text-[#033754]/10" />
                </div>
                
                <p className="text-[#262a2e]/90 text-sm md:text-base leading-relaxed mb-6 font-sans font-normal">
                  "{review.quote}"
                </p>
              </div>

              <div className="border-t border-[#033754]/5 pt-4 mt-auto flex items-center gap-3">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-10 h-10 rounded-full object-cover shrink-0 shadow-md border-2 border-[#033754]/10"
                />
                <div>
                  <h3 className="font-serif font-bold text-base text-[#262a2e]">
                    {review.name}
                  </h3>
                  <p className="text-xs text-[#033754] font-medium mb-1">
                    {review.title}
                  </p>
                  <span className="inline-block text-[10px] text-[#262a2e]/75 bg-[#fff7eb] px-2.5 py-1 rounded-md border border-[#033754]/5">
                    {review.experience}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Gradient Shadow */}
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#fff7eb] to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
};

export default ReviewsMarquee;
