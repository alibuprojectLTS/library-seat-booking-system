import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBook,
  faCashRegister,
  faCheckCircle,
  faRightFromBracket,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../../../auth/AuthContext';
import { TOKEN_KEY, USER_KEY } from '../../../../config/constants';

const menuItems = [
  { icon: faCashRegister, label: 'Point of Sale', path: '/staff' },
  { icon: faCheckCircle, label: 'Check-In', path: '/staff/checkin' },
];

const StaffSidebar: React.FC<{ isOpen: boolean; onClose?: () => void; isMobile?: boolean }> = ({ isOpen, onClose, isMobile }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
    navigate('/');
  };

  return (
    <aside className={`bg-emerald-700 text-white h-full transition-all duration-300 flex flex-col ${isMobile ? 'w-72' : isOpen ? 'w-72' : 'w-20'}`}>
      <div className="flex items-center gap-3 px-6 py-7 border-b border-emerald-600">
        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shrink-0">
          <FontAwesomeIcon icon={faBook} className="text-emerald-700 text-2xl" />
        </div>
        {(isMobile || isOpen) && (
          <div className="leading-tight flex-1">
            <p className="text-sm font-bold tracking-wider text-emerald-100">STAFF PANEL</p>
            <p className="text-xl font-extrabold text-white">e-ticketing</p>
          </div>
        )}
        {isMobile && (
          <button onClick={onClose} className="text-white hover:text-red-300 transition p-2">
            <FontAwesomeIcon icon={faTimes} className="text-2xl" />
          </button>
        )}
      </div>

      <nav className="flex-1 py-6 space-y-2 px-3 overflow-y-auto">
        {menuItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-4 rounded-lg transition-all ${
                active ? 'bg-emerald-800 text-white font-bold shadow-sm' : 'text-emerald-100 hover:bg-emerald-600 font-semibold'
              }`}
            >
              <FontAwesomeIcon icon={item.icon} className="text-xl w-6 shrink-0" />
              {(isMobile || isOpen) && <span className="text-lg">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-emerald-600">
        <button onClick={handleLogout} className="w-full flex items-center gap-4 px-4 py-4 rounded-lg text-emerald-100 hover:bg-red-500 hover:text-white transition-all font-semibold">
          <FontAwesomeIcon icon={faRightFromBracket} className="text-xl w-6 shrink-0" />
          {(isMobile || isOpen) && <span className="text-lg font-bold">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default StaffSidebar;