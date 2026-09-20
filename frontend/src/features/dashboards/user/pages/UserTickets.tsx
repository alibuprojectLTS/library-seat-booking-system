import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faTicket } from '@fortawesome/free-solid-svg-icons';
import apiClient from '../../../../api/core/apiClient';

interface Ticket {
  ticket_id: number;
  ticket_code: string;
  valid_date: string;
  is_valid: boolean;
  qr_code_data?: string;
}

const UserTickets: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get('/tickets/my')
      .then((r) => setTickets(r.data.tickets || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

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
            {tickets.length} total
          </span>
        </div>

        {/* Empty state */}
        {tickets.length === 0 ? (
          <div className="bg-white rounded-lg shadow border border-gray-200 p-12 text-center">
            <FontAwesomeIcon icon={faTicket} className="text-5xl text-gray-300 mb-4" />
            <p className="text-gray-500 text-base">No tickets yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tickets.map((t) => (
              <div
                key={t.ticket_id}
                className="bg-white rounded-lg shadow border border-gray-200 p-5 hover:shadow-md transition"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                      Ticket Code
                    </p>
                    <p className="text-xl font-bold text-indigo-700 mt-1">
                      {t.ticket_code}
                    </p>
                    <p className="text-sm text-gray-600 mt-2 font-medium">
                      Valid:{' '}
                      {new Date(t.valid_date).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      t.is_valid
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {t.is_valid ? 'Valid' : 'Expired'}
                  </span>
                </div>

                {t.qr_code_data && (
                  <div className="mt-5 flex justify-center p-4 bg-gray-50 rounded-lg">
                    <img
                      src={t.qr_code_data}
                      alt="QR Code"
                      className="w-44 h-44 object-contain"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserTickets;