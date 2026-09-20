import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import AuthProvider from './auth/AuthProvider';
import ProtectedRoute from './auth/ProtectedRoute';
import Home from './features/home/Home';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import Contact from './features/contact/Contact';
import UserLayout from './features/dashboards/user/UserLayout';
import UserDashboard from './features/dashboards/user/UserDashboard';
import UserProfile from './features/dashboards/user/pages/UserProfile';
import UserBookings from './features/dashboards/user/pages/UserBookings';
import UserTickets from './features/dashboards/user/pages/UserTickets';
import SeatMap from './features/seats/SeatMap';
import BookingSummary from './features/bookings/BookingSummary';
import PaymentPage from './features/payments/PaymentPage';
import PaymentSuccess from './features/payments/components/PaymentSuccess';
import PaymentCancel from './features/payments/components/PaymentCancel';

const App: React.FC = () => (
  <AuthProvider>
    <Toaster position="top-right" />
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />

        {/* User Dashboard */}
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

        {/* Booking */}
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

        {/* Payment */}
        <Route
          path="/payment"
          element={
            <ProtectedRoute role="user">
              <PaymentPage />
            </ProtectedRoute>
          }
        />
        <Route path="/payment/success" element={<PaymentSuccess />} />
        <Route path="/payment/cancel" element={<PaymentCancel />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;