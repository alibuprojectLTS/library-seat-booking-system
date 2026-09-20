import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children, className = '' }) => (
  <Link
    to={to}
    className={`text-gray-600 hover:text-blue-600 transition-colors font-medium border-b-2 border-transparent hover:border-blue-600 ${className}`}
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

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navigationItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Book Seats', path: '/seats' },
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 bg-white text-black shadow-lg z-50 transition-transform duration-300 md:mt-2 md:mx-2 md:py-2 md:rounded-lg ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center h-16 px-6">
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-11 h-11 bg-blue-50 rounded-lg flex items-center justify-center">
            <FontAwesomeIcon icon={faBook} className="text-blue-900 text-xl" />
          </div>
          <div className="leading-tight">
            <h1 className="text-[10px] font-extrabold tracking-widest" style={{ color: '#C6AA58' }}>
              NATIONAL LIBRARY SERVICES
            </h1>
            <h1 className="text-lg font-extrabold text-blue-900">LIBRARYSEAT</h1>
          </div>
        </Link>

        <nav className="hidden md:flex items-center space-x-8 flex-1 justify-center">
          {navigationItems.map((item) => (
            <NavLink key={item.name} to={item.path}>
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {!user ? (
            <>
              <Link to="/login" className="text-gray-600 hover:text-blue-600 font-medium transition">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-900 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-800 transition shadow-md"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to={user.role === 'admin' ? '/admin' : '/user'}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium transition"
              >
                <FontAwesomeIcon icon={faUser} />
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-blue-900 text-white px-5 py-2 rounded-full font-semibold hover:bg-blue-800 transition shadow-md flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faSignOutAlt} />
                Logout
              </button>
            </>
          )}
        </div>

        <button onClick={toggleMenu} className="md:hidden text-black hover:text-blue-600 transition">
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-4 py-4 space-y-3 flex flex-col items-center">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-600 hover:text-blue-600 transition py-2 font-medium"
              >
                {item.name}
              </Link>
            ))}

            <div className="pt-3 border-t border-gray-200 w-full flex flex-col items-center space-y-2">
              {!user ? (
                <>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-gray-600 font-medium">Login</Link>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)} className="bg-blue-900 text-white px-6 py-2 rounded-full font-semibold shadow-md">Register</Link>
                </>
              ) : (
                <>
                  <Link to={user.role === 'admin' ? '/admin' : '/user'} onClick={() => setIsMenuOpen(false)} className="text-gray-600 font-medium">Dashboard</Link>
                  <button onClick={() => { setIsMenuOpen(false); handleLogout(); }} className="bg-blue-900 text-white px-6 py-2 rounded-full font-semibold shadow-md">Logout</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;