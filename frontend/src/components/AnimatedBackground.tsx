import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';

const AnimatedBackground: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [animateBg, setAnimateBg] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setAnimateBg((p) => !p), 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 relative overflow-hidden">
      {/* Circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-0 left-0 w-64 h-64 rounded-full bg-blue-500 opacity-10 transition-all duration-5000 ease-in-out ${
            animateBg ? 'translate-x-10 translate-y-10' : '-translate-x-6 -translate-y-6'
          }`}
        />
        <div
          className={`absolute bottom-0 right-0 w-96 h-96 rounded-full bg-blue-600 opacity-10 transition-all duration-5000 ease-in-out ${
            animateBg ? '-translate-x-10 -translate-y-10' : 'translate-x-6 translate-y-6'
          }`}
        />
        <div
          className={`absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-blue-400 opacity-10 transition-all duration-3000 ease-in-out ${
            animateBg ? 'scale-110' : 'scale-100'
          }`}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>

      <style>
        {`
          .duration-3000 { transition-duration: 3000ms; }
          .duration-5000 { transition-duration: 5000ms; }
        `}
      </style>
    </div>
  );
};

export default AnimatedBackground;