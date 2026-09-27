import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTicket,
  faCalendarCheck,
  faWallet,
  faClock,
  faBullhorn,
  faArrowRight,
  faChair,
  faCommentDots,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import {
  LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { useAuth } from '../../../auth/AuthContext';
import apiClient from '../../../api/core/apiClient';

interface Booking {
  booking_id: number;
  booking_date: string;
  booking_status: string;
  total_amount: string;
  total_seats: number;
}

interface Ticket {
  ticket_id: number;
  ticket_code: string;
  valid_date: string;
  is_valid: boolean;
}

interface Announcement {
  announcement_id: number;
  title: string;
  content: string;
  created_at?: string;
  createdAt?: string;
}

const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      apiClient.get('/bookings/my').then((r) => r.data.bookings || []),
      apiClient.get('/tickets/my').then((r) => r.data.tickets || []),
      apiClient.get('/announcements').then((r) => r.data.announcements || []),
    ])
      .then(([b, t, a]) => {
        setBookings(b);
        setTickets(t);
        setAnnouncements(a);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // ✅ Only PAID bookings
  const paidBookings = bookings.filter((b) => b.booking_status === 'paid');

  const totalSpent = paidBookings.reduce(
    (sum, b) => sum + Number(b.total_amount || 0),
    0
  );

  const activeBookings = paidBookings;
  const validTickets = tickets.filter((t) => t.is_valid);

  // ✅ Trend — only paid bookings
  const bookingTrend = (() => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const count = paidBookings.filter((b) => b.booking_date === dateStr).length;
      days.push({ date: dateStr, count });
    }
    return days;
  })();

  const paymentStatus = [
    { name: 'Paid', value: bookings.filter((b) => b.booking_status === 'paid').length },
    { name: 'Pending', value: bookings.filter((b) => b.booking_status === 'pending').length },
    { name: 'Cancelled', value: bookings.filter((b) => b.booking_status === 'cancelled').length },
  ];

  const PIE_COLORS = ['#10B981', '#F59E0B', '#EF4444'];

  const metrics = [
    { title: 'Total Bookings', value: activeBookings.length, icon: faCalendarCheck, bg: 'bg-blue-50', color: 'text-blue-600' },
    { title: 'Active Bookings', value: activeBookings.length, icon: faClock, bg: 'bg-emerald-50', color: 'text-emerald-600' },
    { title: 'My Tickets', value: validTickets.length, icon: faTicket, bg: 'bg-purple-50', color: 'text-purple-600' },
    { title: 'Total Spent', value: `MK ${totalSpent}`, icon: faWallet, bg: 'bg-amber-50', color: 'text-amber-600' },
  ];

  const quickActions = [
    { label: 'Book a Seat', path: '/seats', icon: faChair, color: 'bg-blue-600' },
    { label: 'My Tickets', path: '/user/tickets', icon: faTicket, color: 'bg-purple-600' },
    { label: 'My Bookings', path: '/user/bookings', icon: faCalendarCheck, color: 'bg-emerald-600' },
    { label: 'Submit Query', path: '/user/queries', icon: faCommentDots, color: 'bg-pink-600' },
  ];

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', { day: 'numeric', month: 'short' });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <FontAwesomeIcon icon={faSpinner} className="animate-spin text-4xl text-blue-600" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Welcome */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
              Welcome, {user?.first_name}
            </h1>
          </div>
          <div className="text-sm font-bold bg-blue-50 text-blue-700 px-4 py-2 rounded-full">
            📅 {new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <div key={m.title} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-lg ${m.bg}`}>
                <FontAwesomeIcon icon={m.icon} className={`text-lg ${m.color}`} />
              </div>
              <span className="text-xs font-bold text-gray-500 uppercase">{m.title}</span>
            </div>
            <p className="mt-3 text-3xl font-extrabold text-gray-900">{m.value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-4 border-b flex items-center justify-between">
            <div>
              <h2 className="font-extrabold text-gray-900 text-lg">Booking Trend</h2>
              <p className="text-xs text-gray-500">Last 7 days (paid only)</p>
            </div>
            <Link to="/user/bookings" className="text-sm text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1">
              View <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
            </Link>
          </div>
          <div className="p-4">
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={bookingTrend}>
                <XAxis dataKey="date" tick={{ fontSize: 11 }} tickFormatter={formatDate} axisLine={{ stroke: '#E5E7EB' }} tickLine={false} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  formatter={(v) => [`${v} bookings`, 'Bookings']}
                  labelFormatter={(l) => `Date: ${formatDate(String(l))}`}
                />
                <Line type="monotone" dataKey="count" stroke="#1E40AF" strokeWidth={2} dot={{ r: 4, fill: '#1E40AF' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-4 border-b flex items-center justify-between">
            <div>
              <h2 className="font-extrabold text-gray-900 text-lg">Payment Status</h2>
              <p className="text-xs text-gray-500">Bookings overview</p>
            </div>
            <Link to="/user/bookings" className="text-sm text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1">
              View <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
            </Link>
          </div>
          <div className="p-4">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={paymentStatus}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={50}
                  label={({ name, percent }) => `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`}
                >
                  {paymentStatus.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quick Actions + Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-4 border-b">
            <h2 className="font-extrabold text-gray-900 text-lg">Quick Actions</h2>
          </div>
          <div className="p-4 space-y-2">
            {quickActions.map((a) => (
              <Link key={a.path} to={a.path} className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition">
                <div className="flex items-center gap-3">
                  <span className={`p-2 ${a.color} text-white rounded-lg`}>
                    <FontAwesomeIcon icon={a.icon} />
                  </span>
                  <span className="font-bold text-gray-700">{a.label}</span>
                </div>
                <FontAwesomeIcon icon={faArrowRight} className="text-gray-400 text-sm" />
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="font-extrabold text-gray-900 text-lg">Latest Announcements</h2>
            <span className="text-xs text-gray-500">{announcements.length} total</span>
          </div>
          <div className="p-4 space-y-3">
            {announcements.length > 0 ? (
              announcements.slice(0, 3).map((a) => (
                <div key={a.announcement_id} className="flex items-start gap-3 p-3 border border-gray-100 rounded-lg hover:border-blue-200 transition">
                  <div className="p-2 bg-amber-100 text-amber-600 rounded-lg shrink-0">
                    <FontAwesomeIcon icon={faBullhorn} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{a.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{a.content}</p>
                    <p className="text-xs text-gray-400 mt-1">{new Date(a.createdAt || a.created_at || '').toLocaleDateString()}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-6">No announcements yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;