import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { register, login } from '../../api/auth/authApi';
import { TOKEN_KEY, USER_KEY } from '../../config/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faEye, faEyeSlash, faSpinner } from '@fortawesome/free-solid-svg-icons';

const Register: React.FC = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const update = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (form.password !== form.confirm) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      await register({
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        password: form.password,
      });

      const data = await login({ email: form.email, password: form.password });

      localStorage.setItem(TOKEN_KEY, data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
      setUser(data.user);

      navigate('/user');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[650px]">
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

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">Create Account</h1>
          <p className="mt-3 text-lg text-gray-700 font-semibold">
            Sign up to start booking seats
          </p>

          {error && (
            <div className="mt-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-base font-bold text-red-700">
              ✕ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-base font-bold text-gray-800 mb-2">First Name</label>
                <input
                  type="text"
                  value={form.first_name}
                  onChange={(e) => update('first_name', e.target.value)}
                  required
                  placeholder="John"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base font-semibold text-gray-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div>
                <label className="block text-base font-bold text-gray-800 mb-2">Last Name</label>
                <input
                  type="text"
                  value={form.last_name}
                  onChange={(e) => update('last_name', e.target.value)}
                  required
                  placeholder="Doe"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base font-semibold text-gray-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-base font-bold text-gray-800 mb-2">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
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
                  value={form.password}
                  onChange={(e) => update('password', e.target.value)}
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

            <div>
              <label className="block text-base font-bold text-gray-800 mb-2">Confirm Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={form.confirm}
                onChange={(e) => update('confirm', e.target.value)}
                required
                placeholder="••••••••"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base font-semibold text-gray-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-blue-900 px-6 py-4 text-lg font-extrabold text-white hover:bg-blue-800 transition shadow-md disabled:opacity-60 mt-2"
            >
              {loading ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-base text-gray-700 font-semibold">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-blue-700 hover:text-blue-800 font-extrabold"
            >
              Sign in
            </button>
          </p>
        </div>

        {/* Right — Visual */}
        <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-blue-900 to-blue-700 p-12 text-white">
          <div className="w-24 h-24 rounded-2xl bg-white/15 flex items-center justify-center mb-6">
            <FontAwesomeIcon icon={faBook} className="text-5xl text-white" />
          </div>
          <h2 className="text-4xl font-extrabold text-center">Join LibrarySeat</h2>
          <p className="mt-4 text-xl text-blue-100 text-center max-w-sm font-medium">
            Register now and book your study seat in under a minute.
          </p>
          <div className="mt-10 space-y-4 w-full max-w-xs">
            {['Free to register', 'Book up to 5 seats', 'Cancel anytime'].map((t) => (
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

export default Register;