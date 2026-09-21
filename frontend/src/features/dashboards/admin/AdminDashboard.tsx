import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChair,
  faUsers,
  faCalendarCheck,
  faComments,
  faBullhorn,
  faArrowRight,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import apiClient from '../../../api/core/apiClient';

interface Stats {
  totalUsers: number;
  totalSeats: number;
  availableSeats: number;
  bookedSeats: number;
  totalBookings: number;
  todayBookings: number;
  pendingQueries: number;
  inactiveUsers: number;
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get('/admin/dashboard')
      .then((r) => setStats(r.data.stats))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const metrics = [
    { title: 'Total Users', value: stats?.totalUsers || 0, icon: faUsers, bg: 'bg-blue-50', color: 'text-blue-600' },
    { title: 'Total Seats', value: stats?.totalSeats || 0, icon: faChair, bg: 'bg-purple-50', color: 'text-purple-600' },
    { title: "Today's Bookings", value: stats?.todayBookings || 0, icon: faCalendarCheck, bg: 'bg-emerald-50', color: 'text-emerald-600' },
    { title: 'Pending Queries', value: stats?.pendingQueries || 0, icon: faComments, bg: 'bg-amber-50', color: 'text-amber-600' },
    { title: 'Available Seats', value: stats?.availableSeats || 0, icon: faChair, bg: 'bg-green-50', color: 'text-green-600' },
    { title: 'Booked Seats', value: stats?.bookedSeats || 0, icon: faChair, bg: 'bg-red-50', color: 'text-red-600' },
    { title: 'Total Bookings', value: stats?.totalBookings || 0, icon: faCalendarCheck, bg: 'bg-indigo-50', color: 'text-indigo-600' },
    { title: 'Inactive Users', value: stats?.inactiveUsers || 0, icon: faUsers, bg: 'bg-gray-100', color: 'text-gray-600' },
  ];

  const quickActions = [
    { label: 'Manage Seats', path: '/admin/seats', icon: faChair, color: 'bg-indigo-600' },
    { label: 'View Queries', path: '/admin/queries', icon: faComments, color: 'bg-amber-600' },
    { label: 'Manage Users', path: '/admin/users', icon: faUsers, color: 'bg-blue-600' },
    { label: 'Post Announcement', path: '/admin/announcements', icon: faBullhorn, color: 'bg-pink-600' },
    { label: 'Library Status', path: '/admin/status', icon: faChair, color: 'bg-emerald-600' },
    { label: 'CSV Upload', path: '/admin/csv-upload', icon: faChair, color: 'bg-purple-600' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <FontAwesomeIcon icon={faSpinner} className="animate-spin text-4xl text-indigo-600" />
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
              Welcome, Admin! 👋
            </h1>
            <p className="text-gray-600 mt-1">Here's your admin overview</p>
          </div>
          <div className="text-sm font-bold bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full">
            📅 {new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
        </div>
      </div>

      {/* Metrics — 8 cards in 2 rows */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <div
            key={m.title}
            className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition"
          >
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-lg ${m.bg}`}>
                <FontAwesomeIcon icon={m.icon} className={`text-lg ${m.color}`} />
              </div>
              <span className="text-xs font-bold text-gray-500 uppercase">
                {m.title}
              </span>
            </div>
            <p className="mt-3 text-3xl font-extrabold text-gray-900">{m.value}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b">
          <h2 className="font-extrabold text-gray-900 text-lg">Quick Actions</h2>
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {quickActions.map((a) => (
            <Link
              key={a.path}
              to={a.path}
              className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition"
            >
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
    </div>
  );
};

export default AdminDashboard;