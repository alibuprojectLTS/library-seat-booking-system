import React, { useState, useCallback, useEffect } from 'react';
import type { ReactNode } from 'react';
import { AuthContext, type User } from './AuthContext';
import { getMe } from '../api/auth/authApi';
import { TOKEN_KEY, USER_KEY } from '../config/constants';

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [bootstrapping, setBootstrapping] = useState(true);
  const [wasAuthenticated, setWasAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setBootstrapping(false);
      return;
    }

    getMe()
      .then((data) => {
        setUserState(data.user);
        setWasAuthenticated(true);
        localStorage.setItem(USER_KEY, JSON.stringify(data.user));
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        setUserState(null);
      })
      .finally(() => setBootstrapping(false));
  }, []);

  const setUser = useCallback((u: User | null) => {
    setUserState(u);
    if (u) {
      setWasAuthenticated(true);
      localStorage.setItem(USER_KEY, JSON.stringify(u));
    } else {
      localStorage.removeItem(USER_KEY);
    }
  }, []);

  if (bootstrapping) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin" />
          <p className="text-slate-500 text-sm font-semibold">Loading…</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, setUser, wasAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;