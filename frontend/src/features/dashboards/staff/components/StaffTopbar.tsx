import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCashRegister } from '@fortawesome/free-solid-svg-icons';

const StaffTopbar: React.FC<{ onToggleSidebar: () => void }> = ({ onToggleSidebar }) => (
  <header className="bg-white border-b border-gray-200 px-3 sm:px-4 md:px-6 py-3 flex items-center justify-between">
    <div className="flex items-center gap-2 sm:gap-4 min-w-0">
      <button onClick={onToggleSidebar} className="text-gray-600 hover:text-emerald-600 transition shrink-0">
        <FontAwesomeIcon icon={faBars} className="text-xl" />
      </button>
      <div className="flex items-center gap-2 min-w-0">
        <FontAwesomeIcon icon={faCashRegister} className="text-emerald-600 text-xl shrink-0" />
        <h1 className="text-base sm:text-xl font-bold text-gray-800 truncate">
          Staff Dashboard
        </h1>
      </div>
    </div>
  </header>
);

export default StaffTopbar;