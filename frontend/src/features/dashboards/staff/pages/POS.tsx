import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChair, faSpinner, faCheckCircle, faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import apiClient from '../../../../api/core/apiClient';

interface Section { section_id: number; section_name: string; price_per_seat: number; }
interface Seat { seat_id: number; seat_label: string; seat_status: string; }

const POS: React.FC = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  
  const [occupantName, setOccupantName] = useState('');
  const [occupantEmail, setOccupantEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [ticketCode, setTicketCode] = useState<string | null>(null);

  useEffect(() => {
    apiClient.get('/seats/sections').then((r) => {
      setSections(r.data.sections || []);
      if (r.data.sections?.length > 0) setActiveSection(r.data.sections[0].section_id);
    }).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!activeSection) return;
    apiClient.get(`/seats/sections/${activeSection}/seats`).then((r) => setSeats(r.data.seats || []));
  }, [activeSection]);

  const toggleSeat = (id: number, status: string) => {
    if (status !== 'available') return;
    setSelectedSeats(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const totalPrice = selectedSeats.length * (sections.find(s => s.section_id === activeSection)?.price_per_seat || 0);

  const handleConfirmCash = async () => {
    if (selectedSeats.length === 0) return toast.error('Select seats first');
    if (!occupantName || !occupantEmail) return toast.error('Enter occupant details');

    setProcessing(true);
    try {
      const { data } = await apiClient.post('/staff/pos-booking', {
        booking_date: new Date().toISOString().split('T')[0],
        seats: selectedSeats,
        occupant_name: occupantName,
        occupant_email: occupantEmail
      });

      if (data.success) {
        setTicketCode(data.ticket_code);
        toast.success('Cash Ticket Generated!');
        setSelectedSeats([]);
        setOccupantName('');
        setOccupantEmail('');
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'POS Failed');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return <div className="p-10 text-center"><FontAwesomeIcon icon={faSpinner} spin size="2x" /></div>;

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-5xl mx-auto">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-2 flex items-center gap-2">
          <FontAwesomeIcon icon={faMoneyBillWave} className="text-emerald-600" />
          Point of Sale (Cash)
        </h2>
        <p className="text-gray-500 mb-6">Select seats and confirm cash received to issue a ticket.</p>

        <div className="flex gap-2 mb-6">
          {sections.map(s => (
            <button key={s.section_id} onClick={() => { setActiveSection(s.section_id); setSelectedSeats([]); }}
              className={`px-4 py-2 rounded-md font-bold text-sm ${activeSection === s.section_id ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-700'}`}>
              {s.section_name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-3 mb-8">
          {seats.map(seat => {
            const isSelected = selectedSeats.includes(seat.seat_id);
            const isAvailable = seat.seat_status === 'available';
            return (
              <button key={seat.seat_id} onClick={() => toggleSeat(seat.seat_id, seat.seat_status)} disabled={!isAvailable}
                className={`p-3 rounded-lg text-xs font-bold flex flex-col items-center justify-center transition ${
                  isSelected ? 'bg-emerald-600 text-white ring-2 ring-emerald-800' :
                  isAvailable ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100' :
                  'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
                }`}>
                <FontAwesomeIcon icon={faChair} className="mb-1 text-lg" />
                {seat.seat_label}
              </button>
            );
          })}
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="font-bold text-lg mb-3">Occupant Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input type="text" placeholder="Full Name" value={occupantName} onChange={e => setOccupantName(e.target.value)} className="p-3 border rounded-md" />
            <input type="email" placeholder="Email Address" value={occupantEmail} onChange={e => setOccupantEmail(e.target.value)} className="p-3 border rounded-md" />
          </div>
          <div className="flex justify-between items-center bg-white p-4 border rounded-md">
            <div>
              <p className="text-sm text-gray-500">Total to collect: <span className="font-bold text-lg text-gray-900">MK {totalPrice}</span></p>
            </div>
            <button onClick={handleConfirmCash} disabled={processing || selectedSeats.length === 0} className="bg-emerald-600 text-white px-6 py-3 rounded-md font-bold hover:bg-emerald-700 disabled:opacity-50 flex items-center gap-2">
              {processing ? <FontAwesomeIcon icon={faSpinner} spin /> : <FontAwesomeIcon icon={faCheckCircle} />}
              Confirm Cash Received
            </button>
          </div>
        </div>

        {ticketCode && (
          <div className="mt-6 p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
            <h3 className="text-xl font-bold text-emerald-800 mb-2">Ticket Issued Successfully!</h3>
            <p className="text-gray-600">Ticket Code:</p>
            <p className="text-3xl font-extrabold text-emerald-900 mt-1">{ticketCode}</p>
            <p className="text-sm text-emerald-700 mt-2">An email with the QR code has been sent.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default POS;