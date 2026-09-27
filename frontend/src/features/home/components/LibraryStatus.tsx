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
  const [status, setStatus] = useState<StatusData>({
    current_state: 'open',
    capacity_used: 0,
    capacity_total: 170,
    message: 'Welcome to the National Library Services.',
    open_hours: '8:00 AM - 6:00 PM',
  });

  useEffect(() => {
    apiClient
      .get('/status')
      .then(({ data }) => {
        if (data.status) setStatus(data.status);
      })
      .catch(() => {});
  }, []);

  const isOpen = status.current_state === 'open';
  const occupancy =
    status.capacity_total > 0
      ? Math.round((status.capacity_used / status.capacity_total) * 100)
      : 0;

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="rounded-2xl border border-gray-100 bg-gray-50 p-8 md:p-10">
          <div className="flex items-center gap-3">
            <span
              className={`h-4 w-4 rounded-full ${
                isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'
              }`}
            />
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
              Library is {status.current_state.toUpperCase()}
            </h2>
          </div>

          <p className="mt-4 text-xl font-medium text-gray-600">{status.message}</p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="rounded-xl bg-white border border-gray-100 p-6 shadow-sm">
              <p className="text-sm font-extrabold text-gray-500 uppercase tracking-wide">
                Capacity
              </p>
              <p className="text-4xl font-extrabold text-gray-900 mt-3">
                {status.capacity_used}/{status.capacity_total}
              </p>
              <p className="text-base font-semibold text-gray-500 mt-2">
                {occupancy}% occupied
              </p>
            </div>

            <div className="rounded-xl bg-white border border-gray-100 p-6 shadow-sm">
              <p className="text-sm font-extrabold text-gray-500 uppercase tracking-wide">
                Open Hours
              </p>
              <p className="text-3xl font-extrabold text-gray-900 mt-3">
                {status.open_hours}
              </p>
            </div>

            <div className="rounded-xl bg-white border border-gray-100 p-6 shadow-sm">
              <p className="text-sm font-extrabold text-gray-500 uppercase tracking-wide">
                Status
              </p>
              <p className="text-3xl font-extrabold text-blue-600 mt-3">
                {status.current_state === 'open'
                  ? 'Accepting'
                  : status.current_state === 'full'
                  ? 'Full'
                  : status.current_state === 'maintenance'
                  ? 'Maintenance'
                  : 'Closed'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LibraryStatus;