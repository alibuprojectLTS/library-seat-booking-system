import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faBell,
  faChevronDown,
  faUser,
  faRightFromBracket,
  faLandmark,
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../../../auth/AuthContext';
import { TOKEN_KEY, USER_KEY } from '../../../../config/constants';

interface TopbarProps {
  onToggleSidebar: () => void;
}

const AdminTopbar: React.FC<TopbarProps> = ({ onToggleSidebar }) => {
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
    <header className="bg-white border-b border-gray-200 px-3 sm:px-4 md:px-6 py-3 flex items-center justify-between">
      {/* Left */}
      <div className="flex items-center gap-2 sm:gap-4 min-w-0">
        <button
          onClick={onToggleSidebar}
          className="text-gray-600 hover:text-indigo-600 transition shrink-0"
          aria-label="Toggle sidebar"
        >
          <FontAwesomeIcon icon={faBars} className="text-xl" />
        </button>

        <div className="flex items-center gap-2 min-w-0">
          <FontAwesomeIcon
            icon={faLandmark}
            className="text-indigo-600 text-xl shrink-0"
          />
          <h1 className="text-base sm:text-xl font-bold text-gray-800 truncate">
            Admin
            {/* Hide badge on small screens */}
            <span className="hidden sm:inline ml-2 text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              Dashboard
            </span>
          </h1>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3 sm:gap-5 shrink-0">
        <Link
          to="/admin/queries"
          className="relative text-gray-600 hover:text-indigo-600 transition"
          aria-label="Notifications"
        >
          <FontAwesomeIcon icon={faBell} className="text-xl" />
        </Link>

        <div ref={dropdownRef} className="relative">
          <button
            onClick={() => setOpen((p) => !p)}
            className="flex items-center gap-2 group"
            aria-label="User menu"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
              {user?.first_name?.[0]?.toUpperCase() || 'A'}
            </div>
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`hidden sm:inline text-sm text-gray-500 transition-transform ${
                open ? 'rotate-180' : ''
              }`}
            />
          </button>

          {open && (
            <div className="absolute right-0 mt-3 w-60 sm:w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
              <div className="px-4 py-3 bg-indigo-50 border-b border-indigo-100">
                <p className="font-bold text-gray-900 text-base truncate">
                  {user?.first_name} {user?.last_name}
                </p>
                <p className="text-sm text-gray-600 truncate">{user?.email}</p>
              </div>

              <ul className="py-1">
                <li>
                  <Link
                    to="/admin/profile"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-base text-gray-700 hover:bg-indigo-50 transition font-medium"
                  >
                    <FontAwesomeIcon icon={faUser} className="text-indigo-600" />
                    Admin Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-base text-red-600 hover:bg-red-50 transition font-bold"
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

export default AdminTopbar;