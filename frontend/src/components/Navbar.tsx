import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faUser, faSignOutAlt, faSignInAlt, faTicketAlt } from '@fortawesome/free-solid-svg-icons';
import apiClient from '../api/core/apiClient';

const NavLink: React.FC<{ to: string; children: React.ReactNode; className?: string }> = ({ to, children, className = '' }) => (
  <Link
    to={to}
    className={`text-gray-700 hover:text-blue-600 transition-colors font-bold text-base border-b-2 border-transparent hover:border-blue-600 ${className}`}
  >
    {children}
  </Link>
);

const Navbar: React.FC = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [status, setStatus] = useState({ current_state: 'open', open_hours: 'Mon-Fri 08:00am - 05:00pm, Sat 08:00am - 12:00pm' });

  useEffect(() => {
    apiClient.get('/status').then((res) => {
      if (res.data.status) setStatus(res.data.status);
    }).catch(() => {});
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navigationItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Seats', path: '/seats' },
    { name: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    const controlHeader = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 10) setIsVisible(true);
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setIsMenuOpen(false);
      } else if (currentScrollY < lastScrollY) setIsVisible(true);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', controlHeader);
    return () => window.removeEventListener('scroll', controlHeader);
  }, [lastScrollY]);

  const handleLogout = () => {
    localStorage.removeItem('library_token');
    localStorage.removeItem('library_user');
    setUser(null);
    navigate('/');
  };

  const getDashboardLink = () => {
    if (!user) return '/login';
    if (user.role === 'admin') return '/admin';
    if (user.role === ('staff' as string)) return '/staff';
    if (user.role === ('finance' as string)) return '/finance';
    return '/user';
  };

  // ✅ Helper to check if library is open
  const isLibraryOpen = status.current_state === 'open';

  return (
    <>
      {/* ✅ SUPERVISOR REQ: Top Status Banner */}
      <div className="bg-blue-900 text-white text-center py-2 px-4 text-xs md:text-sm font-medium fixed top-0 left-0 right-0 z-50">
        Welcome to the NLS Blantyre Regional Branch Library — The library is <span className={`font-bold uppercase ${isLibraryOpen ? 'text-green-400' : 'text-red-400'}`}>{status.current_state}</span>. 
        {isLibraryOpen ? ' Buy your ticket now!' : ' Ticket sales are paused.'}
        <span className="hidden md:inline ml-4 text-blue-200">| Opening hours: {status.open_hours}</span>
      </div>

      <header
        className={`fixed top-[36px] left-0 right-0 bg-white text-black shadow-lg z-40 transition-transform duration-300 md:mt-2 md:mx-2 md:py-2 md:rounded-lg ${
          isVisible ? 'translate-y-0' : '-translate-y-[150%]'
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center h-20 px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <FontAwesomeIcon icon={faBook} className="text-blue-900 text-2xl" />
            </div>
            <div className="leading-tight">
              <h1 className="text-[10px] font-extrabold tracking-widest text-gray-500">
                BLANTYRE REGIONAL BRANCH LIBRARY
              </h1>
              <h1 className="text-xl font-extrabold text-blue-900">e-ticketing system</h1>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8 flex-1 justify-center">
            {navigationItems.map((item) => (
              <NavLink key={item.name} to={item.path}>
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            {!user ? (
              <>
                <Link to="/login" className="text-gray-700 hover:text-blue-600 font-bold text-base transition flex items-center gap-1">
                  <FontAwesomeIcon icon={faSignInAlt} /> Sign in
                </Link>
                <Link to="/register" className="text-gray-700 hover:text-blue-600 font-bold text-base transition">
                  Register
                </Link>
                {/* ✅ Hide Buy Ticket if library is NOT open */}
                {isLibraryOpen && (
                  <Link to="/seats" className="bg-blue-900 text-white px-6 py-2.5 rounded-full font-bold text-base hover:bg-blue-800 transition shadow-md flex items-center gap-2">
                    <FontAwesomeIcon icon={faTicketAlt} /> Buy Ticket
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link to={getDashboardLink()} className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-bold text-base transition">
                  <FontAwesomeIcon icon={faUser} className="text-lg" /> Dashboard
                </Link>
                <button onClick={handleLogout} className="bg-blue-900 text-white px-6 py-2.5 rounded-full font-bold text-base hover:bg-blue-800 transition shadow-md flex items-center gap-2">
                  <FontAwesomeIcon icon={faSignOutAlt} className="text-lg" /> Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button onClick={toggleMenu} className="md:hidden text-black hover:text-blue-600 transition">
            {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg">
            <div className="px-4 py-6 space-y-4 flex flex-col items-center">
              {navigationItems.map((item) => (
                <Link key={item.name} to={item.path} onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-blue-600 transition py-2 font-bold text-lg">
                  {item.name}
                </Link>
              ))}

              <div className="pt-4 border-t border-gray-200 w-full flex flex-col items-center space-y-3">
                {!user ? (
                  <>
                    <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-gray-700 font-bold text-lg flex items-center gap-2">
                      <FontAwesomeIcon icon={faSignInAlt} /> Sign in
                    </Link>
                    <Link to="/register" onClick={() => setIsMenuOpen(false)} className="text-gray-700 font-bold text-lg">
                      Register
                    </Link>
                    {/* ✅ Hide Buy Ticket if library is NOT open (Mobile) */}
                    {isLibraryOpen && (
                      <Link to="/seats" onClick={() => setIsMenuOpen(false)} className="bg-blue-900 text-white px-8 py-3 rounded-full font-bold text-base shadow-md flex items-center gap-2">
                        <FontAwesomeIcon icon={faTicketAlt} /> Buy Ticket
                      </Link>
                    )}
                  </>
                ) : (
                  <>
                    <Link to={getDashboardLink()} onClick={() => setIsMenuOpen(false)} className="text-gray-700 font-bold text-lg">
                      Dashboard
                    </Link>
                    <button onClick={() => { setIsMenuOpen(false); handleLogout(); }} className="bg-blue-900 text-white px-8 py-3 rounded-full font-bold text-base shadow-md">
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;