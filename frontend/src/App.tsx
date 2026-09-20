import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import AuthProvider from './auth/AuthProvider';
import Home from './features/home/Home';
import Login from './features/auth/Login';
import Register from './features/auth/Register';

const AuthPageShell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-100 p-4 pt-24">
    <div className="w-full max-w-4xl overflow-hidden rounded-3xl border border-white/70 bg-white shadow-[0_32px_80px_rgba(0,0,0,0.12)]">
      {children}
    </div>
  </div>
);

const LoginPage: React.FC = () => (
  <AuthPageShell>
    <Login />
  </AuthPageShell>
);

const RegisterPage: React.FC = () => (
  <AuthPageShell>
    <Register />
  </AuthPageShell>
);

const App: React.FC = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;