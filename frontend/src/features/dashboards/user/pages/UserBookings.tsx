import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faCalendarCheck, faChair } from '@fortawesome/free-solid-svg-icons';
import apiClient from '../../../../api/core/apiClient';

interface BookingItem {
  booking_item_id: number;
  occupant_name: string;
  Seat?: { seat_label: string };
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

  useEffect(() => {
    apiClient
      .get('/bookings/my')
      .then((r) => setBookings(r.data.bookings || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const statusStyles: Record<string, string> = {
    paid: 'bg-emerald-100 text-emerald-700',
    pending: 'bg-amber-100 text-amber-700',
    cancelled: 'bg-red-100 text-red-700',
    expired: 'bg-gray-100 text-gray-700',
  };

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
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">My Bookings</h1>
          <span className="text-sm text-gray-500 font-medium">
            {bookings.length} total
          </span>
        </div>

        {/* Empty state */}
        {bookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow border border-gray-200 p-12 text-center">
            <FontAwesomeIcon icon={faCalendarCheck} className="text-5xl text-gray-300 mb-4" />
            <p className="text-gray-500 text-base">You have no bookings yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((b) => (
              <div
                key={b.booking_id}
                className="bg-white rounded-lg shadow border border-gray-200 p-5 hover:shadow-md transition"
              >
                <div className="flex justify-between items-start flex-wrap gap-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      Booking #{b.booking_id}
                    </h3>
                    <p className="text-sm text-gray-600 font-medium mt-1">
                      📅{' '}
                      {new Date(b.booking_date).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      statusStyles[b.booking_status] || 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {b.booking_status}
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faChair} className="text-indigo-600 text-lg" />
                    <span className="text-base font-bold text-gray-700">
                      {b.total_seats} seat(s)
                    </span>
                  </div>

                  <div className="text-base font-bold text-gray-700">
                    💰 MK {b.total_amount}
                  </div>

                  <div className="text-base text-gray-700 font-medium">
                    <span className="text-gray-500 font-medium">Seats: </span>
                    {b.BookingItems?.map((i) => i.Seat?.seat_label)
                      .filter(Boolean)
                      .join(', ') || '—'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserBookings;