import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { login } from '../../api/auth/authApi';
import { TOKEN_KEY, USER_KEY } from '../../config/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBook,
  faEye,
  faEyeSlash,
  faSpinner,
  faEnvelope,
  faLock,
} from '@fortawesome/free-solid-svg-icons';

const Login: React.FC = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [animateBg, setAnimateBg] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setAnimateBg((p) => !p), 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await login({ email, password });
      localStorage.setItem(TOKEN_KEY, data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
      setUser(data.user);
      navigate(data.user.role === 'admin' ? '/admin' : '/user');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-gray-100 relative overflow-hidden">
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-0 left-0 w-64 h-64 rounded-full bg-blue-500 opacity-10 transition-all duration-5000 ease-in-out ${
            animateBg ? 'translate-x-10 translate-y-10' : '-translate-x-6 -translate-y-6'
          }`}
        />
        <div
          className={`absolute bottom-0 right-0 w-96 h-96 rounded-full bg-blue-600 opacity-10 transition-all duration-5000 ease-in-out ${
            animateBg ? '-translate-x-10 -translate-y-10' : 'translate-x-6 translate-y-6'
          }`}
        />
        <div
          className={`absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-blue-400 opacity-10 transition-all duration-3000 ease-in-out ${
            animateBg ? 'scale-110' : 'scale-100'
          }`}
        />
      </div>

      {/* Main card */}
      <div className="w-full max-w-[1100px] bg-white rounded-2xl shadow-xl flex flex-col lg:flex-row overflow-hidden transition-all duration-500 hover:shadow-2xl z-10">
        {/* Left — Form */}
        <div className="w-full lg:w-1/2 px-6 py-8 sm:px-8 md:px-10 bg-white">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8 transition-all duration-300 hover:translate-x-1">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <FontAwesomeIcon icon={faBook} className="text-blue-900 text-2xl" />
            </div>
            <div className="leading-tight">
              <p className="text-xs font-extrabold tracking-widest" style={{ color: '#C6AA58' }}>
                NATIONAL LIBRARY SERVICES
              </p>
              <p className="text-2xl font-extrabold text-blue-900">LIBRARYSEAT</p>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">Welcome Back</h1>
          <p className="mt-3 text-lg font-semibold text-gray-700">
            Sign in to book your seat
          </p>

          {error && (
            <div className="mt-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-base font-bold text-red-700 animate-fadeIn">
              ✕ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {/* Email */}
            <div>
              <label className="block text-base font-bold text-gray-800 mb-2">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faEnvelope} className="text-blue-400 text-lg" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full pl-12 rounded-lg border border-gray-300 bg-white py-3 pr-4 text-base font-semibold text-gray-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-base font-bold text-gray-800 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faLock} className="text-blue-400 text-lg" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 rounded-lg border border-gray-300 bg-white py-3 text-base font-semibold text-gray-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-blue-700 transition"
                >
                  <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye}
                    className="text-lg"
                  />
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between text-base">
              <label className="flex items-center gap-2 text-gray-700 font-semibold">
                <input type="checkbox" className="rounded border-gray-300" />
                Remember me
              </label>
              <button
                type="button"
                className="text-blue-700 hover:text-blue-800 font-extrabold transition"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-900 text-white py-4 rounded-lg text-lg font-extrabold transition-all duration-300 flex items-center justify-center gap-2 ${
                loading ? 'bg-blue-400 cursor-not-allowed' : 'hover:bg-blue-800 hover:shadow-md'
              }`}
            >
              {loading ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <p className="text-center text-base text-gray-700 font-semibold mt-6">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/register')}
              className="text-blue-700 hover:text-blue-800 font-extrabold hover:underline transition"
            >
              Create one
            </button>
          </p>
        </div>

        {/* Right — Promotional */}
        <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-700 to-blue-900 text-white p-10 flex-col justify-between relative overflow-hidden">
          <div
            className={`absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-blue-500 opacity-20 transition-transform duration-3000 ease-in-out ${
              animateBg ? 'scale-110' : 'scale-100'
            }`}
          />
          <div
            className={`absolute -top-8 -left-8 w-40 h-40 rounded-full bg-blue-400 opacity-20 transition-transform duration-3000 ease-in-out ${
              animateBg ? 'scale-90' : 'scale-100'
            }`}
          />

          <div className="flex-1 flex flex-col justify-center items-center text-center z-10">
            <h2 className="text-4xl font-extrabold mb-6">Book Your Seat</h2>
            <p className="text-blue-100 text-lg max-w-xs mb-10 font-medium">
              Reserve your spot at the National Library Services in seconds.
            </p>
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-blue-400 opacity-20 animate-pulse" />
              <FontAwesomeIcon
                icon={faBook}
                className="text-6xl text-yellow-300 relative z-10 transition duration-500 hover:rotate-12"
              />
            </div>
            <div className="mt-10 space-y-4 w-full max-w-xs">
              {['Real-time availability', 'Secure PayChangu payments', 'Instant QR tickets'].map(
                (t) => (
                  <div key={t} className="flex items-center gap-3 text-blue-100">
                    <span className="w-3 h-3 rounded-full bg-yellow-300" />
                    <span className="font-bold text-lg">{t}</span>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="text-sm text-blue-200 text-center z-10 mt-8">
            © 2026 National Library Services. All rights reserved.
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(5px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
          .duration-3000 { transition-duration: 3000ms; }
          .duration-5000 { transition-duration: 5000ms; }
        `}
      </style>
    </div>
  );
};

export default Login;