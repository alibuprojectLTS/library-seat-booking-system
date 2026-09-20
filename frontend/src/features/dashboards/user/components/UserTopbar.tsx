import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faBell,
  faChevronDown,
  faUser,
  faCog,
  faRightFromBracket,
  faBullhorn,
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../../../auth/AuthContext';
import { TOKEN_KEY, USER_KEY } from '../../../../config/constants';

interface TopbarProps {
  onToggleSidebar: () => void;
}

const UserTopbar: React.FC<TopbarProps> = ({ onToggleSidebar }) => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
    navigate('/');
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm px-4 md:px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="text-gray-600 hover:text-blue-700 transition"
        >
          <FontAwesomeIcon icon={faBars} className="text-xl" />
        </button>
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faBullhorn} className="text-blue-700" />
          <h1 className="text-lg font-extrabold text-gray-800">
            User{' '}
            <span className="text-blue-700 bg-blue-50 px-2 rounded-full text-sm ml-1">
              Dashboard
            </span>
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Link
          to="/user/tickets"
          className="relative text-gray-600 hover:text-blue-700 transition"
        >
          <FontAwesomeIcon icon={faBell} className="text-lg" />
        </Link>

        <div ref={dropdownRef} className="relative">
          <button
            onClick={() => setOpen((p) => !p)}
            className="flex items-center gap-2 group"
          >
            <div className="w-9 h-9 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold">
              {user?.first_name?.[0]?.toUpperCase() || 'U'}
            </div>
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`text-sm text-gray-500 transition-transform ${
                open ? 'rotate-180' : ''
              }`}
            />
          </button>

          {open && (
            <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
              <div className="px-4 py-3 bg-blue-50 border-b border-blue-100">
                <p className="font-bold text-gray-900 text-sm">
                  {user?.first_name} {user?.last_name}
                </p>
                <p className="text-xs text-gray-600 truncate">{user?.email}</p>
              </div>

              <ul className="py-1">
                <li>
                  <Link
                    to="/user/profile"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 transition"
                  >
                    <FontAwesomeIcon icon={faUser} className="text-blue-600" />
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/user/profile"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 transition"
                  >
                    <FontAwesomeIcon icon={faCog} className="text-blue-600" />
                    Settings
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition font-semibold"
                  >
                    <FontAwesomeIcon icon={faRightFromBracket} />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default UserTopbar;