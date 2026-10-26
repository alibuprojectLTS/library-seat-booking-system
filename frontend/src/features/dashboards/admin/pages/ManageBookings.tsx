import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faTrash, faSearch } from '@fortawesome/free-solid-svg-icons'; // ✅ Removed unused faCalendarTimes
import toast from 'react-hot-toast';
import apiClient from '../../../../api/core/apiClient';

interface Booking {
  booking_id: number;
  booking_date: string;
  booking_status: string;
  total_amount: string;
  User?: { first_name: string; last_name: string; email: string };
  BookingItems?: { Seat?: { seat_label: string } }[];
}

const ManageBookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchBookings = async () => {
    try {
      const { data } = await apiClient.get('/admin/bookings/search');
      setBookings(data.bookings || []);
    } catch {
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBookings(); }, []);

  const handleCancel = async (id: number) => {
    if (!confirm('Are you sure you want to cancel this booking/ticket?')) return;
    try {
      await apiClient.delete(`/bookings/${id}/cancel`);
      toast.success('Booking cancelled');
      fetchBookings();
    } catch {
      toast.error('Failed to cancel booking');
    }
  };

  const filtered = bookings.filter(b => 
    b.booking_id.toString().includes(search) || 
    b.User?.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manage Bookings</h1>
          <p className="text-sm text-gray-500 mt-1">View and cancel user bookings/tickets.</p>
        </div>
        <div className="relative">
          <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by ID or Email..." 
            value={search} 
            onChange={e => setSearch(e.target.value)}
            className="h-9 pl-9 pr-3 rounded-md border border-gray-200 text-sm focus:border-indigo-500 outline-none w-64"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        {loading ? (
          <div className="flex justify-center py-12"><FontAwesomeIcon icon={faSpinner} spin className="text-3xl text-indigo-600" /></div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-gray-500">No bookings found.</div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left text-xs font-bold text-gray-500 uppercase px-4 py-3">ID</th>
                <th className="text-left text-xs font-bold text-gray-500 uppercase px-4 py-3">User</th>
                <th className="text-left text-xs font-bold text-gray-500 uppercase px-4 py-3">Date</th>
                <th className="text-left text-xs font-bold text-gray-500 uppercase px-4 py-3">Seats</th>
                <th className="text-left text-xs font-bold text-gray-500 uppercase px-4 py-3">Status</th>
                <th className="text-right text-xs font-bold text-gray-500 uppercase px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(b => (
                <tr key={b.booking_id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-bold text-gray-800">#{b.booking_id}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {b.User ? `${b.User.first_name} ${b.User.last_name}` : 'Unknown'}<br/>
                    <span className="text-xs text-gray-400">{b.User?.email}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{new Date(b.booking_date).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {b.BookingItems?.map(i => i.Seat?.seat_label).join(', ') || '—'}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
                      b.booking_status === 'paid' ? 'bg-emerald-100 text-emerald-700' :
                      b.booking_status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                    }`}>{b.booking_status}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {b.booking_status !== 'cancelled' && (
                      <button onClick={() => handleCancel(b.booking_id)} className="text-red-600 hover:bg-red-50 p-2 rounded-md transition" title="Cancel Booking">
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ManageBookings;