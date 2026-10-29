import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faSearch, faCheckCircle, faTimesCircle, faFilter, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import apiClient from '../../../../api/core/apiClient';

interface Booking {
  booking_id: number;
  booking_date: string;
  booking_status: string;
  User?: { first_name: string; last_name: string; email: string };
  BookingItems?: { Seat?: { seat_label: string } }[];
  Ticket?: { checked_in: boolean };
  Tickets?: { checked_in: boolean }[];
}

const StaffBookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const fetchBookings = async () => {
    try {
      // ✅ Staff uses the search endpoint (returns all)
      const { data } = await apiClient.get('/admin/bookings/search');
      setBookings(data.bookings || []);
    } catch {
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBookings(); }, []);

  const filtered = bookings.filter(b => {
    const searchStr = search.toLowerCase();
    const userName = b.User ? `${b.User.first_name} ${b.User.last_name}`.toLowerCase() : '';
    const userEmail = b.User?.email?.toLowerCase() || '';
    const matchesSearch = b.booking_id.toString().includes(searchStr) || userName.includes(searchStr) || userEmail.includes(searchStr);

    const isCheckedIn = b.Ticket 
      ? b.Ticket.checked_in 
      : (b.Tickets && b.Tickets.length > 0 ? b.Tickets[0].checked_in : false);

    if (!matchesSearch) return false;
    if (filter === 'checked_in') return b.booking_status === 'paid' && isCheckedIn;
    if (filter === 'pending_checkin') return b.booking_status === 'paid' && !isCheckedIn;
    return true;
  });

  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const paginated = filtered.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-wrap justify-between items-center gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Booking List</h1>
          <p className="text-sm text-gray-500 mt-1">View user bookings and check-in status.</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="relative flex-1 min-w-[250px]">
          <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by ID, Name or Email..." 
            value={search} 
            onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
            className="w-full h-10 pl-9 pr-3 rounded-md border border-gray-200 text-sm focus:border-indigo-500 outline-none"
          />
        </div>
        
        <div className="relative min-w-[200px]">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FontAwesomeIcon icon={faFilter} className="text-gray-400" />
          </div>
          <select
            value={filter}
            onChange={(e) => { setFilter(e.target.value); setCurrentPage(1); }}
            className="w-full h-10 pl-10 pr-8 rounded-md border border-gray-200 text-sm font-semibold text-gray-700 focus:border-indigo-500 outline-none appearance-none bg-white cursor-pointer"
          >
            <option value="all">All Bookings</option>
            <option value="pending_checkin">Paid (Pending Check-In)</option>
            <option value="checked_in">Paid (Checked-In)</option>
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <FontAwesomeIcon icon={faChevronDown} className="text-gray-400 text-xs" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-12"><FontAwesomeIcon icon={faSpinner} spin className="text-3xl text-indigo-600" /></div>
        ) : paginated.length === 0 ? (
          <div className="p-12 text-center text-gray-500">No bookings found matching your filters.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left text-xs font-bold text-gray-500 uppercase px-4 py-3">ID</th>
                  <th className="text-left text-xs font-bold text-gray-500 uppercase px-4 py-3">User</th>
                  <th className="text-left text-xs font-bold text-gray-500 uppercase px-4 py-3">Date</th>
                  <th className="text-left text-xs font-bold text-gray-500 uppercase px-4 py-3">Seats</th>
                  <th className="text-left text-xs font-bold text-gray-500 uppercase px-4 py-3">Status</th>
                  <th className="text-left text-xs font-bold text-gray-500 uppercase px-4 py-3">Checked In</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginated.map(b => {
                  const isCheckedIn = b.Ticket 
                    ? b.Ticket.checked_in 
                    : (b.Tickets && b.Tickets.length > 0 ? b.Tickets[0].checked_in : false);

                  return (
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
                          b.booking_status === 'refunded' ? 'bg-amber-100 text-amber-700' :
                          b.booking_status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                        }`}>{b.booking_status}</span>
                      </td>
                      <td className="px-4 py-3">
                        {b.booking_status === 'paid' ? (
                          isCheckedIn ? (
                            <span className="text-emerald-600 font-bold text-sm flex items-center gap-1"><FontAwesomeIcon icon={faCheckCircle}/> Yes</span>
                          ) : (
                            <span className="text-gray-400 font-bold text-sm flex items-center gap-1"><FontAwesomeIcon icon={faTimesCircle}/> No</span>
                          )
                        ) : (
                          <span className="text-gray-300 text-sm">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        
        {totalPages > 1 && (
          <div className="p-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-sm text-gray-500">
              Showing {(currentPage - 1) * rowsPerPage + 1} to {Math.min(currentPage * rowsPerPage, filtered.length)} of {filtered.length} bookings
            </span>
            <div className="flex items-center gap-2">
              <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-3 py-1 rounded-md border border-gray-200 hover:bg-gray-50 disabled:opacity-50 text-sm font-bold text-gray-600">
                Previous
              </button>
              <span className="text-sm font-bold text-gray-700">Page {currentPage} of {totalPages}</span>
              <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-3 py-1 rounded-md border border-gray-200 hover:bg-gray-50 disabled:opacity-50 text-sm font-bold text-gray-600">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffBookings;