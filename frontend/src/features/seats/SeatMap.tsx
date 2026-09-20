import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faSpinner } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
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
      <div className="flex items-center justify-center min-h-[60vh]">
        <FontAwesomeIcon icon={faSpinner} className="animate-spin text-4xl text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">Select Your Seat</h1>
          <p className="text-gray-600 text-base mt-1">
            Choose up to 5 seats from your preferred section.
          </p>
        </div>

        {/* Section Tabs */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
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
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          {activeSectionData && (
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                {activeSectionData.section_name}
              </h2>
              <p className="text-sm text-gray-600 mt-1">{activeSectionData.description}</p>
            </div>
          )}

          {loadingSeats ? (
            <div className="flex items-center justify-center py-12">
              <FontAwesomeIcon icon={faSpinner} className="animate-spin text-3xl text-indigo-600" />
            </div>
          ) : seats.length === 0 ? (
            <p className="text-center text-gray-500 py-12 font-medium">
              No seats available in this section yet.
            </p>
          ) : (
            <>
              <SeatLegend />

              <div className="flex flex-wrap gap-3 justify-center mt-4">
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
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-gray-600">Selected Seats</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">
              {selected.length} / 5
            </p>
            {selected.length > 0 && (
              <p className="text-sm text-indigo-600 font-medium mt-1">
                Total: MK{' '}
                {(selected.length * (activeSectionData?.price_per_seat || 0)).toLocaleString()}
              </p>
            )}
          </div>

          <button
            onClick={handleContinue}
            disabled={selected.length === 0}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-base transition ${
              selected.length === 0
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md'
            }`}
          >
            Continue <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeatMap;