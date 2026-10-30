import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner, faCalendarCheck, faChair, faTrash, faMapMarkerAlt,
  faExclamationTriangle, faTimes, faHistory, faClock
} from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import apiClient from '../../../../api/core/apiClient';

interface BookingItem {
  booking_item_id: number;
  occupant_name: string;
  Seat?: {
    seat_label: string;
    LibrarySection?: { section_name: string };
  };
}

interface Booking {
  booking_id: number;
  booking_date: string;
  booking_status: string;
  total_amount: string;
  total_seats: number;
  BookingItems: BookingItem[];
}

const UserBookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [cancelling, setCancelling] = useState<number | null>(null);
  const [confirmCancelId, setConfirmCancelId] = useState<number | null>(null);
  
  const [deleting, setDeleting] = useState<number | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');

  const fetchBookings = () => {
    setLoading(true);
    apiClient
      .get('/bookings/my')
      .then((r) => setBookings(r.data.bookings || []))
      .catch(() => toast.error('Failed to load bookings'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async () => {
    if (!confirmCancelId) return;
    try {
      setCancelling(confirmCancelId);
      const { data } = await apiClient.delete(`/bookings/${confirmCancelId}/cancel`);
      if (data.success) {
        toast.success('Booking cancelled successfully');
        fetchBookings();
      } else {
        toast.error(data.message || 'Failed to cancel booking');
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Cancel failed');
    } finally {
      setCancelling(null);
      setConfirmCancelId(null);
    }
  };

  const handleDeleteHistory = async () => {
    if (!confirmDeleteId) return;
    try {
      setDeleting(confirmDeleteId);
      const { data } = await apiClient.delete(`/bookings/${confirmDeleteId}/history`);
      if (data.success) {
        toast.success('Booking removed from history');
        fetchBookings();
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Delete failed');
    } finally {
      setDeleting(null);
      setConfirmDeleteId(null);
    }
  };

  const statusStyles: Record<string, string> = {
    paid: 'bg-emerald-100 text-emerald-700',
    pending: 'bg-amber-100 text-amber-700',
    cancelled: 'bg-red-100 text-red-700',
    expired: 'bg-gray-100 text-gray-700',
  };

  const getSections = (b: Booking) => {
    const names =
      b.BookingItems?.map((i) => i.Seat?.LibrarySection?.section_name).filter(Boolean) || [];
    return [...new Set(names)].join(', ') || '—';
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const validBookings = bookings.filter((b) => b.booking_status !== 'cancelled' && b.booking_status !== 'deleted');

  const activeBookings = validBookings.filter((b) => {
    const bDate = new Date(b.booking_date);
    bDate.setHours(0, 0, 0, 0);
    return bDate >= today;
  });

  const historyBookings = validBookings.filter((b) => {
    const bDate = new Date(b.booking_date);
    bDate.setHours(0, 0, 0, 0);
    return bDate < today;
  });

  const visibleBookings = activeTab === 'active' ? activeBookings : historyBookings;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <FontAwesomeIcon icon={faSpinner} className="animate-spin text-4xl text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">My Bookings</h1>
        </div>

        <div className="flex gap-2">
          <button onClick={() => setActiveTab('active')} className={`inline-flex items-center gap-2 h-9 px-4 rounded-md text-sm font-semibold transition ${activeTab === 'active' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}>
            <FontAwesomeIcon icon={faClock} className="size-3" />
            Active ({activeBookings.length})
          </button>
          <button onClick={() => setActiveTab('history')} className={`inline-flex items-center gap-2 h-9 px-4 rounded-md text-sm font-semibold transition ${activeTab === 'history' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}>
            <FontAwesomeIcon icon={faHistory} className="size-3" />
            History ({historyBookings.length})
          </button>
        </div>

        {visibleBookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow border border-gray-200 p-12 text-center">
            <FontAwesomeIcon icon={faCalendarCheck} className="text-5xl text-gray-300 mb-4" />
            <p className="text-gray-500 text-base font-medium">
              {activeTab === 'active' ? 'You have no active bookings.' : 'No past history found.'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {visibleBookings.map((b) => (
              <div key={b.booking_id} className="bg-white rounded-lg shadow border border-gray-200 p-5 hover:shadow-md transition">
                <div className="flex justify-between items-start flex-wrap gap-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Booking #{b.booking_id}</h3>
                    <p className="text-sm text-gray-600 font-medium mt-1">
                      📅 {new Date(b.booking_date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${statusStyles[b.booking_status] || 'bg-gray-100 text-gray-700'}`}>
                    {b.booking_status}
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="text-indigo-600 text-lg" />
                    <div>
                      <p className="text-xs text-gray-500 font-bold uppercase">Section</p>
                      <p className="text-base font-bold text-gray-700">{getSections(b)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faChair} className="text-indigo-600 text-lg" />
                    <div>
                      <p className="text-xs text-gray-500 font-bold uppercase">Seats</p>
                      <p className="text-base font-bold text-gray-700">
                        {b.BookingItems?.map((i) => i.Seat?.seat_label).filter(Boolean).join(', ') || '—'}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase">Amount</p>
                    <p className="text-base font-bold text-gray-700">💰 MK {b.total_amount}</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                  {activeTab === 'active' && (b.booking_status === 'paid' || b.booking_status === 'pending') && (
                    <button onClick={() => setConfirmCancelId(b.booking_id)} className="inline-flex items-center gap-2 px-4 py-2 rounded-md font-semibold text-sm bg-red-500 text-white hover:bg-red-600 shadow-xs transition">
                      <FontAwesomeIcon icon={faTrash} /> Cancel Booking
                    </button>
                  )}
                  
                  {activeTab === 'history' && (
                    <button onClick={() => setConfirmDeleteId(b.booking_id)} className="inline-flex items-center gap-2 px-4 py-2 rounded-md font-semibold text-sm border border-gray-300 text-gray-600 hover:bg-gray-100 transition">
                      <FontAwesomeIcon icon={faTrash} /> Delete from History
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cancel Modal */}
      {confirmCancelId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => !cancelling && setConfirmCancelId(null)} />
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
            <button onClick={() => !cancelling && setConfirmCancelId(null)} disabled={cancelling !== null} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition">
              <FontAwesomeIcon icon={faTimes} className="text-lg" />
            </button>
            <div className="pt-8 pb-4 flex justify-center">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-600 text-2xl" />
              </div>
            </div>
            <div className="px-6 pb-6 text-center">
              <h3 className="text-xl font-extrabold text-gray-900">Cancel this booking?</h3>
              <p className="text-sm text-gray-600 mt-3 leading-relaxed font-medium">This action cannot be undone. The seats will be released.</p>
              <div className="mt-6 flex gap-3">
                <button onClick={() => setConfirmCancelId(null)} disabled={cancelling !== null} className="flex-1 px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-700 font-bold text-base hover:bg-gray-50 transition">Keep Booking</button>
                <button onClick={handleCancel} disabled={cancelling !== null} className={`flex-1 px-4 py-3 rounded-lg font-bold text-base text-white transition inline-flex items-center justify-center gap-2 ${cancelling !== null ? 'bg-red-300 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600 shadow-md hover:shadow-lg'}`}>
                  {cancelling !== null ? <><FontAwesomeIcon icon={faSpinner} className="animate-spin" /> Cancelling...</> : 'Yes, Cancel'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete History Modal */}
      {confirmDeleteId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => !deleting && setConfirmDeleteId(null)} />
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
            <button onClick={() => !deleting && setConfirmDeleteId(null)} disabled={deleting !== null} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition">
              <FontAwesomeIcon icon={faTimes} className="text-lg" />
            </button>
            <div className="pt-8 pb-4 flex justify-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                <FontAwesomeIcon icon={faTrash} className="text-gray-600 text-2xl" />
              </div>
            </div>
            <div className="px-6 pb-6 text-center">
              <h3 className="text-xl font-extrabold text-gray-900">Delete from History?</h3>
              <p className="text-sm text-gray-600 mt-3 leading-relaxed font-medium">This will remove the booking from your view. It will not affect your financial records.</p>
              <div className="mt-6 flex gap-3">
                <button onClick={() => setConfirmDeleteId(null)} disabled={deleting !== null} className="flex-1 px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-700 font-bold text-base hover:bg-gray-50 transition">Keep</button>
                <button onClick={handleDeleteHistory} disabled={deleting !== null} className={`flex-1 px-4 py-3 rounded-lg font-bold text-base text-white transition inline-flex items-center justify-center gap-2 ${deleting !== null ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-800 hover:bg-gray-900 shadow-md hover:shadow-lg'}`}>
                  {deleting !== null ? <><FontAwesomeIcon icon={faSpinner} className="animate-spin" /> Deleting...</> : 'Yes, Delete'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserBookings;