import React from 'react';

interface SeatProps {
  label: string;
  status: 'available' | 'booked' | 'deactivated';
  isSelected: boolean;
  onClick: () => void;
}

const Seat: React.FC<SeatProps> = ({ label, status, isSelected, onClick }) => {
  const base = 'w-10 h-10 rounded-md text-xs font-bold flex items-center justify-center transition-all border';

  const styles = {
    available: isSelected
      ? 'bg-blue-600 text-white border-blue-700 shadow-md scale-105'
      : 'bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-200 cursor-pointer',
    booked: 'bg-red-100 text-red-700 border-red-300 cursor-not-allowed opacity-70',
    deactivated: 'bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed opacity-60',
  };

  return (
    <button
      onClick={status === 'available' ? onClick : undefined}
      disabled={status !== 'available'}
      className={`${base} ${styles[status]}`}
      title={`Seat ${label} - ${status}`}
    >
      {label}
    </button>
  );
};

export default Seat;