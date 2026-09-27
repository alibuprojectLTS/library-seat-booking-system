import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faTicket } from '@fortawesome/free-solid-svg-icons';
import apiClient from '../../../../api/core/apiClient';
import TicketCard from '../../../tickets/TicketCard';

interface Ticket {
  ticket_id: number;
  ticket_code: string;
  valid_date: string;
  is_valid: boolean;
  qr_code_data?: string;
}

const DELETED_KEY = 'deleted_tickets';

const getDeletedIds = (): number[] => {
  try {
    return JSON.parse(localStorage.getItem(DELETED_KEY) || '[]');
  } catch {
    return [];
  }
};

const saveDeletedIds = (ids: number[]) => {
  localStorage.setItem(DELETED_KEY, JSON.stringify(ids));
};

const UserTickets: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletedIds, setDeletedIds] = useState<number[]>(getDeletedIds());

  useEffect(() => {
    apiClient
      .get('/tickets/my')
      .then((r) => setTickets(r.data.tickets || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Delete a ticket → hidden forever
  const deleteTicket = (id: number) => {
    const next = [...deletedIds, id];
    saveDeletedIds(next);
    setDeletedIds(next);
  };

  // ✅ Auto-hide: tickets older than 2 days (past valid_date + 2 days)
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 2);
  cutoff.setHours(0, 0, 0, 0);

  const visibleTickets = tickets.filter((t) => {
    if (!t.is_valid) return false;
    if (deletedIds.includes(t.ticket_id)) return false;

    const validDate = new Date(t.valid_date);
    validDate.setHours(0, 0, 0, 0);

    // Show only if valid_date is newer than (today - 2 days)
    return validDate >= cutoff;
  });

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
          <h1 className="text-2xl font-bold text-gray-800">My Tickets</h1>
          <span className="text-sm text-gray-500 font-medium">
            {visibleTickets.length} active
          </span>
        </div>

        {/* Empty state */}
        {visibleTickets.length === 0 ? (
          <div className="bg-white rounded-lg shadow border border-gray-200 p-12 text-center">
            <FontAwesomeIcon icon={faTicket} className="text-5xl text-gray-300 mb-4" />
            <p className="text-gray-500 text-base">No active tickets</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {visibleTickets.map((t) => (
              <TicketCard
                key={t.ticket_id}
                ticket={t}
                onDelete={() => deleteTicket(t.ticket_id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserTickets;