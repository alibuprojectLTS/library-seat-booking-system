import React from 'react';
import heroImg1 from '../../../assets/images/home-hero.jpg';
import heroImg2 from '../../../assets/images/general-section.jpg';
import heroImg3 from '../../../assets/images/computer-section.jpg';
import heroImg4 from '../../../assets/images/discussion-section.jpg';

const Hero: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden" style={{ backgroundColor: '#F1F5F9' }}>
      {/* Top Hero Carousel Area */}
      <div className="relative w-full h-[500px] lg:h-[600px]">
        {/* ✅ 4 Large full-width images rotating (Using CSS animation for simplicity) */}
        <div className="absolute inset-0 flex animate-[fadeCarousel_32s_infinite]">
          <div className="w-full h-full flex-shrink-0 bg-cover bg-center" style={{ backgroundImage: `linear-gradient(to bottom, rgba(8,40,69,0.6), rgba(8,40,69,0.9)), url(${heroImg1})` }} />
          <div className="w-full h-full flex-shrink-0 bg-cover bg-center" style={{ backgroundImage: `linear-gradient(to bottom, rgba(8,40,69,0.6), rgba(8,40,69,0.9)), url(${heroImg2})` }} />
          <div className="w-full h-full flex-shrink-0 bg-cover bg-center" style={{ backgroundImage: `linear-gradient(to bottom, rgba(8,40,69,0.6), rgba(8,40,69,0.9)), url(${heroImg3})` }} />
          <div className="w-full h-full flex-shrink-0 bg-cover bg-center" style={{ backgroundImage: `linear-gradient(to bottom, rgba(8,40,69,0.6), rgba(8,40,69,0.9)), url(${heroImg4})` }} />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 pt-20">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
            Making a difference together
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl leading-relaxed font-medium">
            Welcome to the NLS Blantyre Regional Branch Library. Access our rich digital collections, create in our computer labs, or meet our mobile library in your community.
          </p>
          <a href="/register" className="mt-8 inline-block text-white px-8 py-3 rounded-lg font-bold text-lg hover:opacity-90 transition shadow-md" style={{ backgroundColor: '#186BB1' }}>
            Register Now
          </a>
        </div>
      </div>

      {/* ✅ About Story Section (Below Images) */}
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <p className="text-gray-700 text-lg md:text-xl leading-relaxed font-medium">
          Established under the National Library Service Act of 1967, the National Library Service Board is dedicated to empowering the people of Malawi through nationwide access to educational, training, and informational resources. Believing that a reading nation is a leading nation, we are continuously evolving beyond traditional walls—moving from "bricks to clicks" to serve you better. Together, as partners in learning and growth, we are building a brighter, more informed future for Malawi.
        </p>
      </div>

      {/* Custom Keyframes for the CSS Carousel */}
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