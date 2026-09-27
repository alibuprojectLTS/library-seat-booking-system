import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDownload,
  faTrash,
  faExclamationTriangle,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
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
  const [showModal, setShowModal] = useState(false);

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

  const confirmDelete = () => {
    if (onDelete) onDelete();
    setShowModal(false);
  };

  return (
    <>
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
                  onClick={() => setShowModal(true)}
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

      {/* Custom delete modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />

          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
            >
              <FontAwesomeIcon icon={faTimes} className="text-lg" />
            </button>

            <div className="pt-8 pb-4 flex justify-center">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faExclamationTriangle}
                  className="text-red-600 text-2xl"
                />
              </div>
            </div>

            <div className="px-6 pb-6 text-center">
              <h3 className="text-xl font-extrabold text-gray-900">
                Delete this ticket?
              </h3>
              <p className="text-sm text-gray-600 mt-3 leading-relaxed font-medium">
                This action cannot be undone. The ticket will be permanently removed.
              </p>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-700 font-bold text-base hover:bg-gray-50 transition"
                >
                  Keep Ticket
                </button>

                <button
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-3 rounded-lg font-bold text-base text-white bg-red-500 hover:bg-red-600 shadow-md hover:shadow-lg transition inline-flex items-center justify-center gap-2"
                >
                  <FontAwesomeIcon icon={faTrash} />
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TicketCard;