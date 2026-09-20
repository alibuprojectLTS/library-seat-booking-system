import React, { useEffect, useState } from 'react';
import apiClient from '../../../api/core/apiClient';

interface StatusData {
  current_state: string;
  capacity_used: number;
  capacity_total: number;
  message: string;
  open_hours: string;
}

const LibraryStatus: React.FC = () => {
  const [status, setStatus] = useState<StatusData | null>(null);

  useEffect(() => {
    apiClient
      .get('/status')
      .then(({ data }) => setStatus(data.status))
      .catch(() => setStatus(null));
  }, []);

  if (!status) return null;

  const isOpen = status.current_state === 'open';
  const occupancy =
    status.capacity_total > 0
      ? Math.round((status.capacity_used / status.capacity_total) * 100)
      : 0;

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="reveal rounded-2xl border border-gray-100 bg-slate-50/60 p-8 md:p-10">
          <div className="flex items-center gap-3">
            <span
              className={`h-4 w-4 rounded-full ${
                isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'
              }`}
            />
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
              {status.current_state.toUpperCase()}
            </h2>
          </div>

          <p className="mt-4 text-lg text-gray-600 font-medium">{status.message}</p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl bg-white border border-gray-100 p-5 shadow-sm">
              <p className="text-sm font-bold text-gray-500">CAPACITY</p>
              <p className="text-3xl font-extrabold text-gray-900 mt-2">
                {status.capacity_used}/{status.capacity_total}
              </p>
              <p className="text-sm text-gray-500 mt-1 font-medium">{occupancy}% occupied</p>
            </div>

            <div className="rounded-xl bg-white border border-gray-100 p-5 shadow-sm">
              <p className="text-sm font-bold text-gray-500">OPEN HOURS</p>
              <p className="text-2xl font-extrabold text-gray-900 mt-2">
                {status.open_hours}
              </p>
            </div>

            <div className="rounded-xl bg-white border border-gray-100 p-5 shadow-sm">
              <p className="text-sm font-bold text-gray-500">STATUS</p>
              <p className="text-2xl font-extrabold text-blue-600 mt-2">
                {isOpen ? 'Accepting' : 'Not Accepting'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LibraryStatus;