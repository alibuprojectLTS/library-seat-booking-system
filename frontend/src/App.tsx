import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import AuthProvider from './auth/AuthProvider';
import ProtectedRoute from './auth/ProtectedRoute';
import Home from './features/home/Home';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import UserLayout from './features/dashboards/user/UserLayout';
import UserDashboard from './features/dashboards/user/UserDashboard';
import UserProfile from './features/dashboards/user/pages/UserProfile';
import UserBookings from './features/dashboards/user/pages/UserBookings';
import UserTickets from './features/dashboards/user/pages/UserTickets';
import SeatMap from './features/seats/SeatMap';
import BookingSummary from './features/bookings/BookingSummary';

const App: React.FC = () => (
  <AuthProvider>
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: '#fff',
          color: '#1e293b',
          border: '1px solid #e2e8f0',
          fontSize: '15px',
          fontWeight: '600',
          borderRadius: '10px',
          padding: '12px 16px',
        },
        success: {
          iconTheme: { primary: '#10b981', secondary: '#fff' },
        },
        error: {
          iconTheme: { primary: '#ef4444', secondary: '#fff' },
        },
      }}
    />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/user"
          element={
            <ProtectedRoute role="user">
              <UserLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<UserDashboard />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="bookings" element={<UserBookings />} />
          <Route path="tickets" element={<UserTickets />} />
        </Route>

        <Route
          path="/seats"
          element={
            <ProtectedRoute role="user">
              <SeatMap />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookings/summary"
          element={
            <ProtectedRoute role="user">
              <BookingSummary />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;