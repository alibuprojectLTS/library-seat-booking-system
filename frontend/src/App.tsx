import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import AuthProvider from './auth/AuthProvider';
import Home from './features/home/Home';

// ⏳ Uncomment as you build each page:

// import ProtectedRoute from './auth/ProtectedRoute';
// import About from './features/about/About';
// import Contact from './features/contact/Contact';
// import Login from './features/auth/Login';
// import Register from './features/auth/Register';
// import ForgotPassword from './features/auth/ForgotPassword';
// import UserDashboard from './features/dashboards/user/UserDashboard';
// import AdminDashboard from './features/dashboards/admin/AdminDashboard';
// import SeatMap from './features/seats/SeatMap';
// import BookingSummary from './features/bookings/BookingSummary';
// import PaymentPage from './features/payments/PaymentPage';
// import MyTickets from './features/tickets/MyTickets';
// import Queries from './features/queries/Queries';

const App: React.FC = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        {/* ---------- Public ---------- */}
        <Route path="/" element={<Home />} />

        {/* ⏳ Uncomment as you build them: */}
        {/* <Route path="/about" element={<About />} /> */}
        {/* <Route path="/contact" element={<Contact />} /> */}

        {/* ---------- Auth ---------- */}
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/register" element={<Register />} /> */}
        {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}

        {/* ---------- User Protected ---------- */}
        {/* <Route path="/seats" element={<ProtectedRoute role="user"><SeatMap /></ProtectedRoute>} /> */}
        {/* <Route path="/bookings/summary" element={<ProtectedRoute role="user"><BookingSummary /></ProtectedRoute>} /> */}
        {/* <Route path="/payment" element={<ProtectedRoute role="user"><PaymentPage /></ProtectedRoute>} /> */}
        {/* <Route path="/tickets" element={<ProtectedRoute role="user"><MyTickets /></ProtectedRoute>} /> */}
        {/* <Route path="/queries" element={<ProtectedRoute role="user"><Queries /></ProtectedRoute>} /> */}
        {/* <Route path="/user/*" element={<ProtectedRoute role="user"><UserDashboard /></ProtectedRoute>} /> */}

        {/* ---------- Admin Protected ---------- */}
        {/* <Route path="/admin/*" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} /> */}

        {/* ---------- Fallback ---------- */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;