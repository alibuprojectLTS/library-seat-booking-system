import React from 'react';
import Stats from './Stats';
import heroImg1 from '../../../assets/images/home-hero.jpg';
import heroImg2 from '../../../assets/images/general-section.jpg';
import heroImg3 from '../../../assets/images/computer-section.jpg';
import heroImg4 from '../../../assets/images/discussion-section.jpg';

const Hero: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#F1F5F9]">
      {/* 1. Images (Rotating) */}
      <div className="relative w-full h-[400px] lg:h-[500px]">
        <div className="absolute inset-0 flex animate-[fadeCarousel_32s_infinite]">
          <div className="w-full h-full flex-shrink-0 bg-cover bg-center" style={{ backgroundImage: `linear-gradient(to bottom, rgba(8,40,69,0.6), rgba(8,40,69,0.9)), url(${heroImg1})` }} />
          <div className="w-full h-full flex-shrink-0 bg-cover bg-center" style={{ backgroundImage: `linear-gradient(to bottom, rgba(8,40,69,0.6), rgba(8,40,69,0.9)), url(${heroImg2})` }} />
          <div className="w-full h-full flex-shrink-0 bg-cover bg-center" style={{ backgroundImage: `linear-gradient(to bottom, rgba(8,40,69,0.6), rgba(8,40,69,0.9)), url(${heroImg3})` }} />
          <div className="w-full h-full flex-shrink-0 bg-cover bg-center" style={{ backgroundImage: `linear-gradient(to bottom, rgba(8,40,69,0.6), rgba(8,40,69,0.9)), url(${heroImg4})` }} />
        </div>
      </div>

      {/* 2. About Story */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12 text-center -mt-24">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#082845] mb-6">
            Making a difference together
          </h1>
          <p className="text-gray-700 text-lg leading-relaxed font-medium">
            Established under the National Library Service Act of 1967, the National Library Service Board is dedicated to empowering the people of Malawi through nationwide access to educational, training, and informational resources. Believing that a reading nation is a leading nation, we are continuously evolving beyond traditional walls—moving from "bricks to clicks" to serve you better.
          </p>
        </div>
      </div>

      {/* 3. Statistics (Coherent to the story) */}
      <div className="relative z-10 mb-12">
        <Stats />
      </div>

      <style>
        {`
          @keyframes fadeCarousel {
            0%, 20% { transform: translateX(0%); }
            25%, 45% { transform: translateX(-100%); }
            50%, 70% { transform: translateX(-200%); }
            75%, 95% { transform: translateX(-300%); }
            100% { transform: translateX(0%); }
          }
        `}
      </style>
    </section>
  );
};

export default Hero;