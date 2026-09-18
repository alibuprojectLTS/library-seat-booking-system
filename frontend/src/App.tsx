import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom';

// Auth
import AuthProvider from './auth/AuthProvider';
import ProtectedRoute from './auth/ProtectedRoute';

// Public pages
import Home from './features/home/Home';
import About from './features/about/About';
import Contact from './features/contact/Contact';

// Auth pages
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import ForgotPassword from './features/auth/ForgotPassword';

// User dashboard
import UserDashboard from './features/dashboards/user/UserDashboard';
import UserProfile from './features/dashboards/user/pages/UserProfile';
import UserBookings from './features/dashboards/user/pages/UserBookings';
import UserTickets from './features/dashboards/user/pages/UserTickets';

// Admin dashboard
import AdminDashboard from './features/dashboards/admin/AdminDashboard';
import AdminProfile from './features/dashboards/admin/pages/AdminProfile';
import ManageSeats from './features/dashboards/admin/pages/ManageSeats';
import ManageQueries from './features/dashboards/admin/pages/ManageQueries';
import ManageUsers from './features/dashboards/admin/pages/ManageUsers';
import Announcements from './features/dashboards/admin/pages/Announcements';
import LibraryStatus from './features/dashboards/admin/pages/LibraryStatus';
import CSVUpload from './features/dashboards/admin/pages/CSVUpload';
import CheckIn from './features/dashboards/admin/pages/CheckIn';

// User-specific pages (outside dashboard shell)
import SeatMap from './features/seats/SeatMap';
import BookingSummary from './features/bookings/BookingSummary';
import PaymentPage from './features/payments/PaymentPage';
import MyTickets from './features/tickets/MyTickets';
import Queries from './features/queries/Queries';

// ============================================================
// AUTH PAGE SHELL (shared layout for login/register/forgot)
// ============================================================
const AuthPageShell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-100 p-4">
    <div className="w-full max-w-5xl overflow-hidden rounded-3xl border border-white/70 bg-white shadow-[0_32px_80px_rgba(0,0,0,0.12)]">
      {children}
    </div>
  </div>
);

// ============================================================
// AUTH ROUTE WRAPPERS (handle navigation + session expiry)
// ============================================================
const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const sessionExpired =
    new URLSearchParams(window.location.search).get('reason') === 'expired';

  return (
    <AuthPageShell>
      {sessionExpired && (
        <div className="flex items-center gap-2 rounded-b-none rounded-t-3xl border-b border-amber-200 bg-amber-50 px-5 py-3 text-sm font-semibold text-amber-800">
          <span>⏱️</span>
          <span>Your session expired. Please sign in again to continue.</span>
        </div>
      )}
      <Login
        onSuccessClose={() => navigate('/')}
        onGoRegister={() => navigate('/register')}
        onForgotPassword={() => navigate('/forgot-password')}
      />
    </AuthPageShell>
  );
};

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <AuthPageShell>
      <Register
        onSuccessClose={() => navigate('/')}
        onGoLogin={() => navigate('/login')}
      />
    </AuthPageShell>
  );
};

const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <AuthPageShell>
      <ForgotPassword onGoLogin={() => navigate('/login')} />
    </AuthPageShell>
  );
};

// ============================================================
// APP
// ============================================================
const App: React.FC = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        {/* ---------- Public ---------- */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* ---------- Auth ---------- */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* ---------- User Protected ---------- */}
        <Route
          path="/user/*"
          element={
            <ProtectedRoute role="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/profile"
          element={
            <ProtectedRoute role="user">
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/bookings"
          element={
            <ProtectedRoute role="user">
              <UserBookings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/tickets"
          element={
            <ProtectedRoute role="user">
              <UserTickets />
            </ProtectedRoute>
          }
        />
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
        <Route
          path="/payment"
          element={
            <ProtectedRoute role="user">
              <PaymentPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tickets"
          element={
            <ProtectedRoute role="user">
              <MyTickets />
            </ProtectedRoute>
          }
        />
        <Route
          path="/queries"
          element={
            <ProtectedRoute role="user">
              <Queries />
            </ProtectedRoute>
          }
        />

        {/* ---------- Admin Protected ---------- */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/profile"
          element={
            <ProtectedRoute role="admin">
              <AdminProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/seats"
          element={
            <ProtectedRoute role="admin">
              <ManageSeats />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/queries"
          element={
            <ProtectedRoute role="admin">
              <ManageQueries />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute role="admin">
              <ManageUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/announcements"
          element={
            <ProtectedRoute role="admin">
              <Announcements />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/status"
          element={
            <ProtectedRoute role="admin">
              <LibraryStatus />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/csv-upload"
          element={
            <ProtectedRoute role="admin">
              <CSVUpload />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/checkin"
          element={
            <ProtectedRoute role="admin">
              <CheckIn />
            </ProtectedRoute>
          }
        />

        {/* ---------- Fallback ---------- */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;