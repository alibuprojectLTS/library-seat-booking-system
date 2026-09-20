import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBook,
  faHome,
  faChair,
  faTicket,
  faCalendarCheck,
  faCommentDots,
  faUser,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../../../auth/AuthContext';
import { TOKEN_KEY, USER_KEY } from '../../../../config/constants';

interface SidebarProps {
  isOpen: boolean;
}

const menuItems = [
  { icon: faHome, label: 'Dashboard', path: '/user' },
  { icon: faChair, label: 'Book Seat', path: '/seats' },
  { icon: faTicket, label: 'My Tickets', path: '/user/tickets' },
  { icon: faCalendarCheck, label: 'My Bookings', path: '/user/bookings' },
  { icon: faCommentDots, label: 'Support', path: '/queries' },
  { icon: faUser, label: 'My Profile', path: '/user/profile' },
];

const UserSidebar: React.FC<SidebarProps> = ({ isOpen }) => {
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
    <aside
      className={`bg-indigo-600 text-white h-full transition-all duration-300 flex flex-col ${
        isOpen ? 'w-72' : 'w-20'
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-7 border-b border-indigo-500">
        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shrink-0">
          <FontAwesomeIcon icon={faBook} className="text-indigo-600 text-2xl" />
        </div>
        {isOpen && (
          <div className="leading-tight">
            <p className="text-sm font-bold tracking-wider text-indigo-100">
              LIBRARY SERVICES
            </p>
            <p className="text-xl font-extrabold text-white">LIBRARYSEAT</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 space-y-2 px-3 overflow-y-auto">
        {menuItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-4 rounded-lg transition-all ${
                active
                  ? 'bg-indigo-500 text-white font-bold shadow-sm'
                  : 'text-indigo-100 hover:bg-indigo-700 font-semibold'
              }`}
            >
              <FontAwesomeIcon
                icon={item.icon}
                className="text-xl w-6 shrink-0"
              />
              {isOpen && <span className="text-lg">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-indigo-500">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-4 py-4 rounded-lg text-indigo-100 hover:bg-red-500 hover:text-white transition-all font-semibold"
        >
          <FontAwesomeIcon
            icon={faRightFromBracket}
            className="text-xl w-6 shrink-0"
          />
          {isOpen && <span className="text-lg font-bold">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default UserSidebar;