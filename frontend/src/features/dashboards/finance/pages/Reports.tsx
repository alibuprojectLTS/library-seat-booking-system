import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillWave, faSpinner, faSync } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import apiClient from '../../../../api/core/apiClient';

interface Report {
  period: string;
  totalRevenue: number;
  totalTicketsSold: number;
  onlineRevenue: number;
  cashRevenue: number;
}

const Reports: React.FC = () => {
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchReport = async (p: string) => {
    setLoading(true);
    try {
      const { data } = await apiClient.get(`/finance/reports?period=${p}`);
      setReport(data.report);
    } catch {
      toast.error('Failed to load report');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchReport(period); }, [period]);

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Financial Reports</h1>
          <p className="text-sm text-gray-500 mt-1">Track revenue from Online and POS Cash.</p>
        </div>
        <div className="flex gap-2">
          {['daily', 'weekly', 'monthly'].map(p => (
            <button key={p} onClick={() => setPeriod(p as any)} className={`h-9 px-4 rounded-md text-sm font-semibold capitalize transition ${period === p ? 'bg-purple-700 text-white' : 'bg-white border border-gray-200 text-gray-700'}`}>{p}</button>
          ))}
          <button onClick={() => fetchReport(period)} className="h-9 px-3 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200"><FontAwesomeIcon icon={faSync} className={loading ? 'animate-spin' : ''} /></button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><FontAwesomeIcon icon={faSpinner} className="animate-spin text-4xl text-purple-600" /></div>
      ) : report ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 md:col-span-2">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center"><FontAwesomeIcon icon={faMoneyBillWave} className="text-emerald-600 text-2xl" /></div>
              <div>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wide">Total Revenue ({period})</p>
                <p className="text-4xl font-extrabold text-gray-900 mt-1">MK {report.totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-xs font-bold text-gray-500 uppercase">Online (PayChangu)</p>
            <p className="text-3xl font-extrabold text-blue-700 mt-2">MK {report.onlineRevenue.toLocaleString()}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-xs font-bold text-gray-500 uppercase">Cash (POS)</p>
            <p className="text-3xl font-extrabold text-amber-600 mt-2">MK {report.cashRevenue.toLocaleString()}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 md:col-span-2">
            <p className="text-xs font-bold text-gray-500 uppercase">Total Tickets Sold</p>
            <p className="text-2xl font-extrabold text-gray-900 mt-2">{report.totalTicketsSold} Tickets</p>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 py-10">No report data available.</p>
      )}
    </div>
  );
};

export default Reports;