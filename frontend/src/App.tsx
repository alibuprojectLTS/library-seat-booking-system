import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import AuthProvider from './auth/AuthProvider';
import ProtectedRoute from './auth/ProtectedRoute';

// Public
import Home from './features/home/Home';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import Contact from './features/contact/Contact';

// User Dashboard
import UserLayout from './features/dashboards/user/UserLayout';
import UserDashboard from './features/dashboards/user/UserDashboard';
import UserProfile from './features/dashboards/user/pages/UserProfile';
import UserBookings from './features/dashboards/user/pages/UserBookings';
import UserTickets from './features/dashboards/user/pages/UserTickets';

// Support / Queries
import Queries from './features/queries/Queries';

// Booking Flow
import SeatMap from './features/seats/SeatMap';
import BookingSummary from './features/bookings/BookingSummary';

// Payment Flow
import PaymentPage from './features/payments/PaymentPage';
import PaymentSuccess from './features/payments/components/PaymentSuccess';
import PaymentCancel from './features/payments/components/PaymentCancel';

// Admin Dashboard
import AdminLayout from './features/dashboards/admin/AdminLayout';
import AdminDashboard from './features/dashboards/admin/AdminDashboard';

// Admin Pages
import ManageSeats from './features/dashboards/admin/pages/ManageSeats';
import CSVUpload from './features/dashboards/admin/pages/CSVUpload';
import Announcements from './features/dashboards/admin/pages/Announcements';
import LibraryStatus from './features/dashboards/admin/pages/LibraryStatus';

// Maintenance page
// import MaintenancePage from './features/maintenance/MaintenancePage';

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
        {/* ---------- Public ---------- */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />

        {/* ---------- User Dashboard (Nested) ---------- */}
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
          <Route path="queries" element={<Queries />} />
        </Route>

        {/* ---------- Booking Flow (Protected) ---------- */}
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

        {/* ---------- Payment Flow ---------- */}
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

        {/* ---------- Admin Dashboard (Nested) ---------- */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="seats" element={<ManageSeats />} />
          <Route path="csv-upload" element={<CSVUpload />} />
          <Route path="announcements" element={<Announcements />} />
          <Route path="status" element={<LibraryStatus />} />
        </Route>

        {/* ---------- Fallback ---------- */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;