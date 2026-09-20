import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

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

const App: React.FC = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

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

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;