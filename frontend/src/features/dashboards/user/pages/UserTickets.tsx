import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faTicket, faEye, faEyeSlash, faBroom } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import apiClient from '../../../../api/core/apiClient';
import TicketCard from '../../../tickets/TicketCard';

interface Ticket {
  ticket_id: number;
  ticket_code: string;
  valid_date: string;
  is_valid: boolean;
  qr_code_data?: string;
}

const HIDDEN_KEY = 'hidden_tickets';

const getHiddenIds = (): number[] => {
  try {
    return JSON.parse(localStorage.getItem(HIDDEN_KEY) || '[]');
  } catch {
    return [];
  }
};

const saveHiddenIds = (ids: number[]) => {
  localStorage.setItem(HIDDEN_KEY, JSON.stringify(ids));
};

const UserTickets: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCleared, setShowCleared] = useState(false);
  const [hiddenIds, setHiddenIds] = useState<number[]>(getHiddenIds());

  useEffect(() => {
    apiClient
      .get('/tickets/my')
      .then((r) => setTickets(r.data.tickets || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const hideTicket = (id: number) => {
    const next = [...hiddenIds, id];
    saveHiddenIds(next);
    setHiddenIds(next);
    toast.success('Ticket cleared');
  };

  const unhideTicket = (id: number) => {
    const next = hiddenIds.filter((x) => x !== id);
    saveHiddenIds(next);
    setHiddenIds(next);
    toast.success('Ticket restored');
  };

  const clearOld = () => {
    const today = new Date().toISOString().split('T')[0];
    const oldIds = tickets
      .filter((t) => t.valid_date < today)
      .map((t) => t.ticket_id);

    if (oldIds.length === 0) {
      toast('No old tickets to clear', { icon: 'ℹ️' });
      return;
    }

    if (!confirm(`Clear ${oldIds.length} old ticket(s) from view? They stay in the system.`)) {
      return;
    }

    const next = Array.from(new Set([...hiddenIds, ...oldIds]));
    saveHiddenIds(next);
    setHiddenIds(next);
    toast.success(`${oldIds.length} old ticket(s) cleared`);
  };

  // Valid tickets only
  const validTickets = tickets.filter((t) => t.is_valid);

  // Apply hidden filter (unless showing cleared)
  const visibleTickets = showCleared
    ? validTickets
    : validTickets.filter((t) => !hiddenIds.includes(t.ticket_id));

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
        <div className="flex flex-wrap justify-between items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-800">My Tickets</h1>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCleared((v) => !v)}
              className="inline-flex items-center gap-2 h-9 px-3 rounded-md text-sm font-medium border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition"
            >
              <FontAwesomeIcon icon={showCleared ? faEyeSlash : faEye} className="size-4" />
              {showCleared ? 'Hide cleared' : 'Show cleared'}
            </button>

            <button
              onClick={clearOld}
              className="inline-flex items-center gap-2 h-9 px-3 rounded-md text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition"
            >
              <FontAwesomeIcon icon={faBroom} className="size-4" />
              Clear old
            </button>

            <span className="text-sm text-gray-500 font-medium">
              {visibleTickets.length} active
            </span>
          </div>
        </div>

        {/* Empty state */}
        {visibleTickets.length === 0 ? (
          <div className="bg-white rounded-lg shadow border border-gray-200 p-12 text-center">
            <FontAwesomeIcon icon={faTicket} className="text-5xl text-gray-300 mb-4" />
            <p className="text-gray-500 text-base">No active tickets</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {visibleTickets.map((t) => {
              const isCleared = hiddenIds.includes(t.ticket_id);
              return (
                <TicketCard
                  key={t.ticket_id}
                  ticket={t}
                  isCleared={isCleared}
                  onHide={() => hideTicket(t.ticket_id)}
                  onUnhide={() => unhideTicket(t.ticket_id)}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserTickets;