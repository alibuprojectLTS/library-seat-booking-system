import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { login } from '../../api/auth/authApi';
import { TOKEN_KEY, USER_KEY } from '../../config/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faEye, faEyeSlash, faSpinner } from '@fortawesome/free-solid-svg-icons';

const Login: React.FC = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
    <div className="w-full bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[600px]">
        {/* Left — Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-6">
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
          <p className="mt-3 text-lg text-gray-700 font-semibold">
            Sign in to book your seat
          </p>

          {error && (
            <div className="mt-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-base font-bold text-red-700">
              ✕ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="block text-base font-bold text-gray-800 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base font-semibold text-gray-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="block text-base font-bold text-gray-800 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pr-12 text-base font-semibold text-gray-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="text-lg" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-base">
              <label className="flex items-center gap-2 text-gray-700 font-semibold">
                <input type="checkbox" className="rounded border-gray-300" />
                Remember me
              </label>
              <button
                type="button"
                className="text-blue-700 hover:text-blue-800 font-extrabold"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-blue-900 px-6 py-4 text-lg font-extrabold text-white hover:bg-blue-800 transition shadow-md disabled:opacity-60"
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

          <p className="mt-6 text-center text-base text-gray-700 font-semibold">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/register')}
              className="text-blue-700 hover:text-blue-800 font-extrabold"
            >
              Create one
            </button>
          </p>
        </div>

        {/* Right — Visual */}
        <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-blue-900 to-blue-700 p-12 text-white">
          <div className="w-24 h-24 rounded-2xl bg-white/15 flex items-center justify-center mb-6">
            <FontAwesomeIcon icon={faBook} className="text-5xl text-white" />
          </div>
          <h2 className="text-4xl font-extrabold text-center">Book Your Seat</h2>
          <p className="mt-4 text-xl text-blue-100 text-center max-w-sm font-medium">
            Reserve your spot at the National Library Services in seconds.
          </p>
          <div className="mt-10 space-y-4 w-full max-w-xs">
            {['Real-time availability', 'Secure PayChangu payments', 'Instant QR tickets'].map((t) => (
              <div key={t} className="flex items-center gap-3 text-blue-100">
                <span className="w-3 h-3 rounded-full bg-yellow-300" />
                <span className="font-bold text-lg">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;