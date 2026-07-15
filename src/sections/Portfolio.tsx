"use client";
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const Portfolio: React.FC = () => {
  const scrollToCalendar = () => {
    const el = document.getElementById('agenda');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const reviews = [
    {
      id: 1,
      name: 'Dra. Dennisse Arroyo',
      title: 'Clínica Odontológica Arroyo',
      rating: 5,
      quote: 'Nuestra clínica está sumamente satisfecha con Clidenta. La forma en que la inteligencia artificial responde consultas complejas de ortodoncia e implantes es impecable. Hemos logrado reducir las inasistencias a citas en un 95% gracias a sus recordatorios automáticos.',
      experience: 'Más de 40 años de experiencia'
    },
    {
      id: 2,
      name: 'Dr. Miguel Dávila',
      title: 'Cirujano Dentista & Rehabilitación Estética',
      rating: 5,
      quote: 'Gracias a Clidenta logré manejar de forma eficiente un volumen muy alto de mensajes y comentarios en Instagram y WhatsApp. La IA responde al instante con tono profesional y agenda citas 24/7 sin superponer horarios en mi calendario clínico. Ha transformado por completo nuestra captación digital diaria.',
      experience: 'Odontología y Cirugía Estética en Lima'
    },
    {
      id: 3,
      name: 'Dr. Julio Zumaeta',
      title: 'Multident Especialista en Estética Dental',
      rating: 5,
      quote: 'Teníamos dudas sobre si los pacientes notarían que hablan con una IA, pero la conversación es tan natural y humana que muchos agendan felicitando a nuestra "recepcionista". La reducción del tiempo administrativo y el aumento de citas agendadas ha sido del 40%.',
      experience: 'Especialista en Diseño de Sonrisas'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="portfolio" className="bg-[#fff7eb] py-20 px-4 border-t border-[#033754]/5">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-[#262a2e] mt-4">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-[#262a2e]/70 mt-3">
            Descubre cómo Clidenta transforma la atención diaria de clínicas y odontólogos destacados.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative bg-white border border-[#033754]/10 rounded-lg p-8 md:p-12 shadow-sm min-h-[300px] flex flex-col justify-between">
          
          {/* Quote Icon */}
          <div className="absolute top-6 right-8 text-[#033754]/5">
            <Quote size={80} strokeWidth={1} />
          </div>

          {/* Active Review */}
          <div className="relative z-10">
            {/* Stars */}
            <div className="flex gap-1 mb-6 text-amber-500">
              {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                <Star key={i} size={18} fill="currentColor" />
              ))}
            </div>

            {/* Testimonial Quote */}
            <blockquote className="text-lg md:text-xl text-[#262a2e] font-sans font-normal italic leading-relaxed mb-8">
              "{reviews[currentIndex].quote}"
            </blockquote>

            {/* Author details */}
            <div className="border-t border-[#033754]/10 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="font-serif font-semibold text-lg text-[#262a2e]">
                  {reviews[currentIndex].name}
                </h3>
                <p className="text-sm text-[#033754] font-medium">
                  {reviews[currentIndex].title}
                </p>
              </div>
              <div className="text-xs text-[#262a2e]/75 bg-[#fff7eb] px-3 py-1.5 rounded-md border border-[#033754]/5 self-start sm:self-center">
                {reviews[currentIndex].experience}
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center mt-10 pt-4 border-t border-[#033754]/5 relative z-10">
            {/* Dots */}
            <div className="flex gap-2">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className="p-2 -m-2"
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  <div
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      currentIndex === idx ? 'bg-[#033754] w-6' : 'bg-[#033754]/20 w-2.5'
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Arrow Buttons */}
            <div className="flex gap-3">
              <button
                onClick={prevSlide}
                className="p-2.5 rounded-lg border border-[#033754]/10 text-[#033754] bg-[#fff7eb] hover:bg-[#033754] hover:text-white hover:border-[#033754] transition-all duration-300"
                aria-label="Previous slide"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextSlide}
                className="p-2.5 rounded-lg border border-[#033754]/10 text-[#033754] bg-[#fff7eb] hover:bg-[#033754] hover:text-white hover:border-[#033754] transition-all duration-300"
                aria-label="Next slide"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-12">
          <button
            onClick={scrollToCalendar}
            className="bg-[#033754] text-white font-semibold px-8 py-3.5 rounded-lg border border-[#033754] hover:bg-transparent hover:text-[#033754] transition-all duration-300 text-lg"
          >
            Quiero agendar pacientes
          </button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
