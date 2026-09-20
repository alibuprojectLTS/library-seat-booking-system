import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft, faSpinner } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import AnimatedBackground from '../../components/AnimatedBackground';
import SectionTabs from './components/SectionTabs';
import Seat from './components/Seat';
import SeatLegend from './components/SeatLegend';
import { useSeats } from './hooks/useSeats';

const SeatMap: React.FC = () => {
  const navigate = useNavigate();
  const {
    sections,
    activeSection,
    setActiveSection,
    seats,
    loadingSections,
    loadingSeats,
    selected,
    toggleSeat,
    clearSelection,
    activeSectionData,
  } = useSeats();

  const handleContinue = () => {
    if (selected.length === 0) {
      toast.error('Please select at least one seat');
      return;
    }
    toast.success(`${selected.length} seat(s) selected`);
    navigate('/bookings/summary', {
      state: {
        seatIds: selected,
        sectionId: activeSection,
      },
    });
  };

  if (loadingSections) {
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
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100">
            {/* Back to Dashboard */}
            <button
              onClick={() => navigate('/user')}
              className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-bold text-base transition mb-4"
            >
              <FontAwesomeIcon icon={faArrowLeft} /> Back to Dashboard
            </button>

            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              Select Your Seat
            </h1>
            <p className="text-gray-700 text-lg font-semibold mt-2">
              Choose up to 5 seats from your preferred section.
            </p>
          </div>

          {/* Section Tabs */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100">
            <SectionTabs
              sections={sections}
              activeSection={activeSection}
              onChange={(id) => {
                if (selected.length > 0) {
                  toast('Section changed — selection cleared', { icon: '🔄' });
                }
                clearSelection();
                setActiveSection(id);
              }}
            />
          </div>

          {/* Seat Map */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100">
            {activeSectionData && (
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
                  {activeSectionData.section_name}
                </h2>
                <p className="text-base md:text-lg text-gray-700 font-semibold mt-2">
                  {activeSectionData.description}
                </p>
              </div>
            )}

            {loadingSeats ? (
              <div className="flex items-center justify-center py-12">
                <FontAwesomeIcon
                  icon={faSpinner}
                  className="animate-spin text-4xl text-indigo-600"
                />
              </div>
            ) : seats.length === 0 ? (
              <p className="text-center text-gray-600 py-12 text-lg font-bold">
                No seats available in this section yet.
              </p>
            ) : (
              <>
                <SeatLegend />

                <div className="flex flex-wrap gap-3 justify-center mt-6">
                  {seats.map((seat) => (
                    <Seat
                      key={seat.seat_id}
                      label={seat.seat_label}
                      status={seat.seat_status}
                      isSelected={selected.includes(seat.seat_id)}
                      onClick={() => toggleSeat(seat.seat_id)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Selection Summary */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-base font-bold text-gray-700 uppercase tracking-wide">
                Selected Seats
              </p>
              <p className="text-4xl font-extrabold text-gray-900 mt-2">
                {selected.length} / 5
              </p>
              {selected.length > 0 && (
                <p className="text-lg text-indigo-700 font-bold mt-2">
                  Total: MK{' '}
                  {(selected.length * (activeSectionData?.price_per_seat || 0)).toLocaleString()}
                </p>
              )}
            </div>

            <button
              onClick={handleContinue}
              disabled={selected.length === 0}
              className={`inline-flex items-center gap-3 px-8 py-4 rounded-lg font-extrabold text-lg transition ${
                selected.length === 0
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg'
              }`}
            >
              Continue <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>
      </div>
    </AnimatedBackground>
  );
};

export default SeatMap;