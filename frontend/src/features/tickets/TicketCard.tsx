import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faTrash } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';

interface Ticket {
  ticket_id: number;
  ticket_code: string;
  valid_date: string;
  is_valid: boolean;
  qr_code_data?: string;
}

interface Props {
  ticket: Ticket;
  onDelete?: () => void;
}

const TicketCard: React.FC<Props> = ({ ticket, onDelete }) => {
  const handleDownload = () => {
    if (!ticket.qr_code_data) {
      toast.error('No QR code available');
      return;
    }

    const link = document.createElement('a');
    link.href = ticket.qr_code_data;
    link.download = `${ticket.ticket_code}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('QR code downloaded!');
  };

  const handleDelete = () => {
    if (!onDelete) return;
    if (!confirm('Delete this ticket? It cannot be restored.')) return;
    onDelete();
    toast.success('Ticket deleted');
  };

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 p-5 hover:shadow-md transition">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
            Ticket Code
          </p>
          <p className="text-xl font-bold text-indigo-700 mt-1">
            {ticket.ticket_code}
          </p>
          <p className="text-sm text-gray-600 mt-2 font-medium">
            Valid:{' '}
            {new Date(ticket.valid_date).toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-emerald-100 text-emerald-700">
          Valid
        </span>
      </div>

      {/* QR Code */}
      {ticket.qr_code_data && (
        <>
          <div className="mt-5 flex justify-center p-4 bg-gray-50 rounded-lg">
            <img
              src={ticket.qr_code_data}
              alt="QR Code"
              className="w-48 h-48 object-contain"
            />
          </div>

          {/* Buttons */}
          <div className="mt-4 flex gap-2">
            <button
              onClick={handleDownload}
              className="flex-1 inline-flex items-center justify-center gap-2 h-9 px-4 rounded-md text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >
              <FontAwesomeIcon icon={faDownload} className="size-4" />
              Download
            </button>

            {onDelete && (
              <button
                onClick={handleDelete}
                className="inline-flex items-center justify-center gap-2 h-9 px-3 rounded-md text-sm font-semibold border border-red-200 bg-white text-red-600 hover:bg-red-50 transition"
              >
                <FontAwesomeIcon icon={faTrash} className="size-4" />
                Delete
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TicketCard;