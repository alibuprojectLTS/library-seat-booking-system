import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCheckCircle, faTicketAlt, faSpinner, faCamera, faStopCircle } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import apiClient from '../../../../api/core/apiClient';
import { Html5QrcodeScanner } from 'html5-qrcode';

const CheckIn: React.FC = () => {
  const [ticketCode, setTicketCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [scanMode, setScanMode] = useState(false);

  useEffect(() => {
    if (!scanMode) return;

    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
    );

    scanner.render(
      // ✅ Added : string to fix TypeScript error
      (text: string) => {
        scanner.clear();
        setScanMode(false);
        setTicketCode(text);
        handleVerify(text);
      },
      // ✅ Removed unused 'error' parameter
      () => {}
    );

    return () => {
      scanner.clear().catch(console.error);
    };
  }, [scanMode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketCode) return;
    handleVerify(ticketCode);
  };

  const handleVerify = async (code: string) => {
    setLoading(true);
    setSuccess(false);
    try {
      const { data } = await apiClient.post('/staff/checkin', { ticket_code: code });
      if (data.success) {
        setSuccess(true);
        toast.success('Checked in successfully!');
        setTicketCode('');
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Check-in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
              <FontAwesomeIcon icon={faTicketAlt} className="text-indigo-600" />
              Staff Check-In
            </h2>
            <p className="text-gray-500 mt-1">Scan or type the ticket number to verify the booking.</p>
          </div>
          <button
            onClick={() => setScanMode(!scanMode)}
            className={`px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition ${
              scanMode ? 'bg-red-100 text-red-700 hover:bg-red-200' : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
            }`}
          >
            <FontAwesomeIcon icon={scanMode ? faStopCircle : faCamera} />
            {scanMode ? 'Stop Camera' : 'Scan QR Code'}
          </button>
        </div>

        {scanMode && (
          <div className="mb-6 border-2 border-dashed border-indigo-200 rounded-xl overflow-hidden p-2 bg-gray-50">
            <div id="reader" className="w-full max-w-sm mx-auto"></div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <FontAwesomeIcon icon={faSearch} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={ticketCode}
              onChange={(e) => setTicketCode(e.target.value.toUpperCase())}
              placeholder="e.g. TKT-123-ABCD"
              className="w-full pl-12 pr-4 py-4 text-lg font-bold border-2 border-gray-300 rounded-lg focus:border-indigo-500 outline-none uppercase"
              required
            />
          </div>
          <button type="submit" disabled={loading} className="bg-indigo-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-indigo-700 disabled:opacity-50">
            {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Verify'}
          </button>
        </form>

        {success && (
          <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-lg text-center mt-6">
            <FontAwesomeIcon icon={faCheckCircle} className="text-5xl text-emerald-500 mb-3" />
            <h3 className="text-xl font-bold text-emerald-800">Valid Ticket — Checked In!</h3>
            <p className="text-emerald-600 mt-1">You can now let the user proceed to their seat.</p>
            <button onClick={() => { setSuccess(false); setTicketCode(''); }} className="mt-4 bg-white border border-emerald-300 text-emerald-700 px-6 py-2 rounded-lg font-bold hover:bg-emerald-50">
              Check Another Ticket
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckIn;