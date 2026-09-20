import React from 'react';

const items = [
  { color: 'bg-emerald-100 border-emerald-300', label: 'Available' },
  { color: 'bg-blue-600 border-blue-700', label: 'Selected' },
  { color: 'bg-red-100 border-red-300', label: 'Booked' },
  { color: 'bg-gray-200 border-gray-300', label: 'Deactivated' },
];

const SeatLegend: React.FC = () => (
  <div className="flex flex-wrap items-center gap-6 justify-center py-4">
    {items.map((i) => (
      <div key={i.label} className="flex items-center gap-2">
        <span className={`w-6 h-6 rounded-md border ${i.color}`} />
        <span className="text-sm font-semibold text-gray-700">{i.label}</span>
      </div>
    ))}
  </div>
);

export default SeatLegend;