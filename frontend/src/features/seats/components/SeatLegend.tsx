import React from 'react';

const items = [
  { color: 'bg-emerald-100 border-emerald-300', label: 'Available' },
  { color: 'bg-blue-600 border-blue-700', label: 'Selected' },
  { color: 'bg-red-100 border-red-300', label: 'Booked' },
  { color: 'bg-gray-200 border-gray-300', label: 'Deactivated' },
];

const SeatLegend: React.FC = () => (
  <div className="flex flex-wrap items-center gap-8 justify-center py-5">
    {items.map((i) => (
      <div key={i.label} className="flex items-center gap-3">
        <span className={`w-7 h-7 rounded-md border ${i.color}`} />
        <span className="text-base font-bold text-gray-800">{i.label}</span>
      </div>
    ))}
  </div>
);

export default SeatLegend;