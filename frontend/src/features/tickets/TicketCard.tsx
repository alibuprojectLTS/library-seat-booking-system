import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
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
}

const TicketCard: React.FC<Props> = ({ ticket }) => {
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

          {/* ✅ Smaller download button (shadcn style) */}
          <button
            onClick={handleDownload}
            className="mt-4 inline-flex items-center justify-center gap-2 h-9 px-4 w-full rounded-md text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            <FontAwesomeIcon icon={faDownload} className="size-4" />
            Download QR Code
          </button>
        </>
      )}
    </div>
  );
};

export default TicketCard;