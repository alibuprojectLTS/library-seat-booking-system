import React, { useState, useEffect } from 'react';
import { Users, MapPin, CreditCard, Ticket, ChevronLeft, ChevronRight } from 'lucide-react';
import heroImg1 from '../../../assets/images/home-hero.jpg';
import heroImg2 from '../../../assets/images/general-section.jpg';
import heroImg3 from '../../../assets/images/computer-section.jpg';
import heroImg4 from '../../../assets/images/discussion-section.jpg';

interface Slide {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  bgImage: string;
}

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: Slide[] = [
    {
      title: 'Book Your Seat Online',
      description:
        'Reserve your seat in real-time at the National Library Services, Blantyre. No queues. No waiting.',
      icon: Users,
      bgImage: heroImg1,
    },
    {
      title: 'Real-Time Availability',
      description:
        'See live seat availability across Computer, General, and Discussion sections before you leave home.',
      icon: MapPin,
      bgImage: heroImg2,
    },
    {
      title: 'Pay Securely Online',
      description:
        'Complete payment in seconds with PayChangu mobile money. Your seat is locked instantly.',
      icon: CreditCard,
      bgImage: heroImg3,
    },
    {
      title: 'Digital QR Tickets',
      description:
        'Receive your digital ticket by email with a QR code. Show it at the entrance and you are in.',
      icon: Ticket,
      bgImage: heroImg4,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const goToSlide = (index: number) => setCurrentSlide(index);

  const currentSlideData = slides[currentSlide];
  const IconComponent = currentSlideData.icon;

  return (
    <section className="relative w-full h-[600px] lg:h-[700px] overflow-hidden">
      {/* Background - NO BLUE, only soft dark overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out md:m-2 md:mt-20 md:rounded-lg"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.7) 100%), url(${currentSlideData.bgImage})`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full px-4 lg:px-16">
        {/* Mobile */}
        <div className="lg:hidden flex flex-col justify-end items-center h-full pb-20">
          <div className="text-white text-center space-y-3">
            <h1 className="text-3xl font-extrabold flex justify-center items-center gap-3">
              <IconComponent className="w-8 h-8 text-blue-300 animate-pulse" />
              {currentSlideData.title}
            </h1>
            <p className="text-base max-w-2xl leading-relaxed px-4 font-medium">
              {currentSlideData.description}
            </p>
            <a
              href="/register"
              className="inline-block bg-blue-900 p-3 rounded-lg px-8 font-bold hover:bg-blue-800 transition"
            >
              Register Now
            </a>
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden lg:flex flex-row justify-center items-center h-full md:mt-24">
          <div className="flex-1 text-white text-left space-y-5">
            <h1 className="text-5xl font-extrabold flex justify-start items-center gap-4">
              <IconComponent className="w-14 h-14 text-blue-300 animate-pulse" />
              {currentSlideData.title}
            </h1>
            <p className="text-2xl max-w-2xl leading-relaxed font-medium">
              {currentSlideData.description}
            </p>
            <a
              href="/register"
              className="inline-block bg-blue-900 p-3 rounded-lg px-10 font-bold text-lg hover:bg-blue-800 transition"
            >
              Register Now
            </a>
          </div>

          <div className="flex-1 flex justify-center items-center">
            <IconComponent className="w-48 h-48 text-white/20 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-3 transition-all"
      >
        <ChevronLeft className="w-7 h-7" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-3 transition-all"
      >
        <ChevronRight className="w-7 h-7" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;