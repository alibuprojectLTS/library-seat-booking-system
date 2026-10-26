import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCheckCircle, faTicketAlt, faSpinner, faCamera, faStopCircle } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import apiClient from '../../../../api/core/apiClient';
import { Html5Qrcode, Html5QrcodeScannerState } from 'html5-qrcode';

const CheckIn: React.FC = () => {
  const [ticketCode, setTicketCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [startScanning, setStartScanning] = useState(false);
  const [cameraLoading, setCameraLoading] = useState(false);
  
  const html5QrcodeRef = useRef<Html5Qrcode | null>(null);
  const pluginStateRef = useRef<string>('initial');
  const qrRegionId = "reader";

  const handleVerify = async (code: string) => {
    if (!code) return;
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

  const handleStartScanning = async () => {
    if ("vibrate" in navigator) navigator.vibrate(50);
    setCameraLoading(true);
    try {
      const devices = await Html5Qrcode.getCameras();
      if (devices && devices.length) {
        setStartScanning(true);
      } else {
        toast.error('No camera found on this device.');
      }
    } catch (err) {
      toast.error('Camera permission denied.');
    } finally {
      setCameraLoading(false);
    }
  };

  const handleStopScanning = () => {
    if ("vibrate" in navigator) navigator.vibrate(50);
    setStartScanning(false);
  };

  useEffect(() => {
    if (!startScanning) return;
    if (!html5QrcodeRef.current) {
      html5QrcodeRef.current = new Html5Qrcode(qrRegionId);
    }

    if (pluginStateRef.current !== 'starting') {
      pluginStateRef.current = 'starting';
      html5QrcodeRef.current.start(
        { facingMode: "environment" },
        // ✅ Removed supportedScanTypes from here to fix the TS error
        { fps: 10, qrbox: { width: 250, height: 250 } },
        async (text) => {
          if (html5QrcodeRef.current?.getState() === Html5QrcodeScannerState.SCANNING) {
            html5QrcodeRef.current?.pause(true);
          }
          if ("vibrate" in navigator) navigator.vibrate(150);
          setTicketCode(text);
          setStartScanning(false);
          handleVerify(text);
        },
        () => { /* ignore scan errors */ }
      ).then(() => {
        pluginStateRef.current = 'started';
      }).catch(() => {
        toast.error("Camera failed to start");
        setStartScanning(false);
      });
    }

    return () => {
      if (html5QrcodeRef.current && pluginStateRef.current !== 'starting') {
        html5QrcodeRef.current.stop().then(() => {
          pluginStateRef.current = 'initial';
        }).catch(console.error);
      }
    };
  }, [startScanning]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketCode) return;
    handleVerify(ticketCode);
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
          
          {startScanning ? (
            <button onClick={handleStopScanning} className="px-4 py-2 bg-red-100 text-red-700 rounded-lg font-bold flex items-center gap-2 transition hover:bg-red-200">
              <FontAwesomeIcon icon={faStopCircle} /> Stop Camera
            </button>
          ) : (
            <button onClick={handleStartScanning} disabled={cameraLoading} className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg font-bold flex items-center gap-2 transition hover:bg-indigo-100">
              {cameraLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : <FontAwesomeIcon icon={faCamera} />} Scan QR Code
            </button>
          )}
        </div>

        {startScanning && (
          <div className="mb-6 border-2 border-dashed border-indigo-200 rounded-xl overflow-hidden p-2 bg-gray-50 flex justify-center">
            <div id={qrRegionId} className="w-full max-w-sm rounded-lg"></div>
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