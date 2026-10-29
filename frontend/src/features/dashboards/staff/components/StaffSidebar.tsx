import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBook,
  faCashRegister,
  faCheckCircle,
  faRightFromBracket,
  faTimes,
  faComments,
  faCalendarTimes, // ✅ Added
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../../../auth/AuthContext';
import { TOKEN_KEY, USER_KEY } from '../../../../config/constants';

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
  isMobile?: boolean;
}

const menuItems = [
  { icon: faCashRegister, label: 'Point of Sale', path: '/staff' },
  { icon: faCheckCircle, label: 'Check-In', path: '/staff/checkin' },
  { icon: faCalendarTimes, label: 'Bookings', path: '/staff/bookings' }, // ✅ NEW
  { icon: faComments, label: 'Queries', path: '/staff/queries' },
];

const StaffSidebar: React.FC<SidebarProps> = ({ isOpen, onClose, isMobile }) => {
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
    <aside className={`bg-indigo-600 text-white h-full transition-all duration-300 flex flex-col ${isMobile ? 'w-72' : isOpen ? 'w-72' : 'w-20'}`}>
      <div className="flex items-center gap-3 px-6 py-7 border-b border-indigo-500">
        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shrink-0">
          <FontAwesomeIcon icon={faBook} className="text-indigo-600 text-2xl" />
        </div>
        {(isMobile || isOpen) && (
          <div className="leading-tight flex-1">
            <p className="text-sm font-bold tracking-wider text-indigo-100">STAFF PANEL</p>
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
            <Link key={item.path} to={item.path} className={`flex items-center gap-4 px-4 py-4 rounded-lg transition-all ${active ? 'bg-indigo-500 text-white font-bold shadow-sm' : 'text-indigo-100 hover:bg-indigo-700 font-semibold'}`}>
              <FontAwesomeIcon icon={item.icon} className="text-xl w-6 shrink-0" />
              {(isMobile || isOpen) && <span className="text-lg">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-indigo-500">
        <button onClick={handleLogout} className="w-full flex items-center gap-4 px-4 py-4 rounded-lg text-indigo-100 hover:bg-red-500 hover:text-white transition-all font-semibold">
          <FontAwesomeIcon icon={faRightFromBracket} className="text-xl w-6 shrink-0" />
          {(isMobile || isOpen) && <span className="text-lg font-bold">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default StaffSidebar;