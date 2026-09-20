import React from 'react';

const partners = [
  'Blantyre City Council',
  'Ministry of Education',
  'National Library',
  'PayChangu',
];

const Partners: React.FC = () => (
  <div className="bg-gray-50 flex flex-col items-center justify-center py-10 mt-2">
    <h3 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-6 tracking-tight">
      Our Partners
    </h3>

    <div className="w-full overflow-hidden relative">
      <div className="flex animate-marquee space-x-12 mb-4 md:space-x-40">
        {partners.concat(partners).map((p, index) => (
          <div
            key={index}
            className="flex-shrink-0 px-4 py-2 text-base md:text-lg font-extrabold text-gray-700 tracking-wider whitespace-nowrap"
          >
            {p}
          </div>
        ))}
      </div>
    </div>

    <style>
      {`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 25s linear infinite;
        }
      `}
    </style>
  </div>
);

export default Partners;