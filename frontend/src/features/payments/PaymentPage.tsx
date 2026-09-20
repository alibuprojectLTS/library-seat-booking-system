import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faChair,
  faCalendarAlt,
  faMapMarkerAlt,
  faShieldAlt,
  faSpinner,
  faCreditCard,
} from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import AnimatedBackground from '../../components/AnimatedBackground';
import apiClient from '../../api/core/apiClient';

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { bookingId: number; amount: number } | null;

  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState<any>(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!state?.bookingId) {
      toast.error('No booking to pay for. Redirecting...');
      navigate('/user/bookings');
      return;
    }

    apiClient
      .get(`/bookings/${state.bookingId}`)
      .then((r) => setBooking(r.data.booking))
      .catch(() => {
        toast.error('Failed to load booking details');
        navigate('/user/bookings');
      })
      .finally(() => setFetching(false));
  }, [state, navigate]);

  const handlePayment = async () => {
    if (!state?.bookingId) return;

    try {
      setLoading(true);
      const { data } = await apiClient.post('/payments/initiate', {
        bookingId: state.bookingId,
      });

      if (data.success && data.checkoutUrl) {
        toast.success('Redirecting to PayChangu...');
        window.location.href = data.checkoutUrl;
      } else {
        toast.error(data.message || 'Payment initiation failed');
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <AnimatedBackground>
        <div className="flex items-center justify-center min-h-screen">
          <FontAwesomeIcon icon={faSpinner} className="animate-spin text-5xl text-indigo-600" />
        </div>
      </AnimatedBackground>
    );
  }

  return (
    <AnimatedBackground>
      <div className="min-h-screen flex items-center justify-center p-4 md:p-6">
        <div className="w-full max-w-lg">
          {/* Back button */}
          <button
            onClick={() => navigate('/user/bookings')}
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-bold text-base transition mb-5"
          >
            <FontAwesomeIcon icon={faArrowLeft} /> Back to My Bookings
          </button>

          {/* Card */}
          <div className="bg-white shadow-2xl rounded-3xl w-full p-8 md:p-10 transition-all">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                <FontAwesomeIcon icon={faCreditCard} className="text-indigo-600 text-2xl" />
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                Complete Payment
              </h2>
              <p className="text-gray-600 text-base font-semibold mt-2">
                Pay securely with PayChangu
              </p>
            </div>

            {/* Booking Summary */}
            {booking && (
              <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5 mb-6 space-y-3">
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon icon={faChair} className="text-indigo-600 text-lg" />
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase">Booking ID</p>
                    <p className="text-base font-extrabold text-gray-800">
                      #{booking.booking_id}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <FontAwesomeIcon icon={faCalendarAlt} className="text-emerald-600 text-lg" />
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase">Date</p>
                    <p className="text-base font-bold text-gray-800">
                      {new Date(booking.booking_date).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>

                {booking.BookingItems?.[0]?.Seat?.LibrarySection && (
                  <div className="flex items-center gap-3">
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      className="text-purple-600 text-lg"
                    />
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase">Section</p>
                      <p className="text-base font-bold text-gray-800">
                        {booking.BookingItems[0].Seat.LibrarySection.section_name}
                      </p>
                    </div>
                  </div>
                )}

                <div className="border-t border-indigo-100 pt-3">
                  <p className="text-xs font-bold text-gray-500 uppercase">Seats</p>
                  <p className="text-base font-bold text-gray-800 mt-1">
                    {booking.BookingItems?.map((i: any) => i.Seat?.seat_label)
                      .filter(Boolean)
                      .join(', ') || '—'}
                  </p>
                </div>
              </div>
            )}

            {/* Total Amount */}
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-2xl p-6 text-white mb-6">
              <p className="text-sm font-bold uppercase tracking-wide text-indigo-100">
                Total Amount
              </p>
              <p className="text-4xl md:text-5xl font-extrabold mt-2">
                MK {(state?.amount || 0).toLocaleString()}
              </p>
            </div>

            {/* Pay Button */}
            <button
              onClick={handlePayment}
              disabled={loading}
              className={`w-full py-4 rounded-xl text-lg font-extrabold transition duration-300 shadow-md flex items-center justify-center gap-3 ${
                loading
                  ? 'bg-indigo-400 text-white cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-lg'
              }`}
            >
              {loading ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faCreditCard} />
                  Pay with PayChangu
                </>
              )}
            </button>

            {/* Trust badge */}
            <div className="mt-6 flex items-center justify-center gap-2 text-gray-500">
              <FontAwesomeIcon icon={faShieldAlt} className="text-emerald-600" />
              <span className="text-sm font-semibold">
                Secure payment via PayChangu
              </span>
            </div>
          </div>
        </div>
      </div>
    </AnimatedBackground>
  );
};

export default PaymentPage;