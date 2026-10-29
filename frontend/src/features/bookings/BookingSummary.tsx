import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faChair, faCalendarAlt, faWallet, faSpinner, faBolt } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import AnimatedBackground from '../../components/AnimatedBackground';
import apiClient from '../../api/core/apiClient';

interface Seat { seat_id: number; seat_label: string; }
interface Section { section_id: number; section_name: string; price_per_seat: number; }

const BookingSummary: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { seatIds: number[]; sectionId: number } | null;

  const [seats, setSeats] = useState<Seat[]>([]);
  const [section, setSection] = useState<Section | null>(null);
  const [bookingDate, setBookingDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const [addElectricity, setAddElectricity] = useState(false);

  useEffect(() => {
    if (!state?.seatIds || !state?.sectionId) {
      toast.error('No seats selected. Redirecting...');
      navigate('/seats');
      return;
    }

    const load = async () => {
      try {
        const [sectionsRes, seatsRes] = await Promise.all([
          apiClient.get('/seats/sections'),
          apiClient.get(`/seats/sections/${state.sectionId}/seats`),
        ]);

        const allSections: Section[] = sectionsRes.data.sections || [];
        const allSeats: Seat[] = seatsRes.data.seats || [];

        const sec = allSections.find((s) => s.section_id === state.sectionId) || null;
        const picked = allSeats.filter((s) => state.seatIds.includes(s.seat_id));

        setSection(sec);
        setSeats(picked);
      } catch {
        toast.error('Failed to load booking details');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [state, navigate]);

  const basePrice = seats.length * (section?.price_per_seat || 0);
  const totalAmount = basePrice + (addElectricity ? 400 : 0);

  const handleProceed = async () => {
    try {
      setSubmitting(true);
      const payload = {
        booking_date: bookingDate,
        seats: seats.map((s) => s.seat_id),
        add_electricity: addElectricity
      };

      const { data } = await apiClient.post('/bookings', payload);

      if (data.success) {
        toast.success('Booking created — proceed to payment');
        navigate('/payment', {
          state: {
            bookingId: data.booking.id,
            amount: data.booking.totalAmount,
          },
        });
      } else {
        toast.error(data.message || 'Failed to create booking');
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Booking failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
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
      <div className="p-4 md:p-6 pb-16">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100">
            <button onClick={() => navigate('/seats')} className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-bold text-base transition mb-4">
              <FontAwesomeIcon icon={faArrowLeft} /> Back to seat selection
            </button>

            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">Booking Summary</h1>
            <p className="text-gray-700 text-lg font-semibold mt-2">Review your seats and select a date.</p>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-indigo-50">
                  <FontAwesomeIcon icon={faChair} className="text-indigo-600 text-xl" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Section</p>
                  <p className="text-lg font-extrabold text-gray-900 mt-1">{section?.section_name || '—'}</p>
                  <p className="text-sm text-gray-600 font-medium mt-1">MK {section?.price_per_seat || 0} per seat</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-emerald-50">
                  <FontAwesomeIcon icon={faCalendarAlt} className="text-emerald-600 text-xl" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Booking Date</p>
                  <input
                    type="date"
                    value={bookingDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="mt-2 w-full rounded-md border border-gray-300 py-2.5 px-3 text-base font-semibold text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-600 transition"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-6">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Selected Seats</p>
              <div className="flex flex-wrap gap-2">
                {seats.map((s) => (
                  <span key={s.seat_id} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-extrabold border border-indigo-100">
                    {s.seat_label}
                  </span>
                ))}
              </div>
            </div>

            {/* ✅ Electricity Toggle */}
            <div className="border-t border-gray-100 pt-6">
              <label className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-100 rounded-lg cursor-pointer hover:bg-amber-100 transition">
                <input 
                  type="checkbox" 
                  checked={addElectricity}
                  onChange={(e) => setAddElectricity(e.target.checked)}
                  className="w-5 h-5 accent-amber-500 cursor-pointer"
                />
                <div className="flex-1">
                  <p className="font-bold text-gray-900 flex items-center gap-2">
                    <FontAwesomeIcon icon={faBolt} className="text-amber-500" />
                    Add Electricity / Power Supply
                  </p>
                  <p className="text-sm text-gray-600 mt-1">Use of electricity in the library attracts an additional MWK 400.</p>
                </div>
                <span className="font-extrabold text-amber-700">+ MWK 400</span>
              </label>
            </div>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-amber-50">
                <FontAwesomeIcon icon={faWallet} className="text-amber-600 text-2xl" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Total Amount</p>
                <p className="text-4xl font-extrabold text-gray-900 mt-1">MK {totalAmount.toLocaleString()}</p>
              </div>
            </div>

            <button
              onClick={handleProceed}
              disabled={submitting}
              className={`inline-flex items-center gap-3 px-8 py-4 rounded-lg font-extrabold text-lg transition ${
                submitting ? 'bg-indigo-400 text-white cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg'
              }`}
            >
              {submitting ? <><FontAwesomeIcon icon={faSpinner} className="animate-spin" /> Processing...</> : <>Proceed to Payment <FontAwesomeIcon icon={faArrowRight} /></>}
            </button>
          </div>
        </div>
      </div>
    </AnimatedBackground>
  );
};

export default BookingSummary;