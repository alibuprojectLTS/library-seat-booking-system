import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMoneyBillWave, faSpinner, faSync, faUndo, 
  faFileCsv, faFilePdf, faDownload, faTimes, faExclamationTriangle 
} from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import apiClient from '../../../../api/core/apiClient';

interface PaymentDetails {
  booking_id: number;
  total_amount: number;
  payment_method: string;
  booking_status: string;
  created_at?: string; // ✅ Kept both for safety
  createdAt?: string;  // ✅ Kept both for safety
  User?: { first_name: string; last_name: string; email: string };
}

interface Report {
  period: string;
  totalRevenue: number;
  totalTicketsSold: number;
  onlineRevenue: number;
  cashRevenue: number;
  payments: PaymentDetails[];
}

const Reports: React.FC = () => {
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [refundId, setRefundId] = useState<number | null>(null);
  const [processingRefund, setProcessingRefund] = useState(false);
  const [showExport, setShowExport] = useState(false);

  // ✅ Helper to format Date safely
  const formatDate = (p: PaymentDetails) => {
    const d = p.created_at || p.createdAt;
    if (!d) return 'N/A';
    return new Date(d).toLocaleDateString();
  };

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

  const confirmRefund = async () => {
    if (!refundId) return;
    setProcessingRefund(true);
    try {
      await apiClient.post('/finance/refund', { booking_id: refundId });
      toast.success('Refund processed successfully');
      setRefundId(null);
      fetchReport(period);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to process refund');
    } finally {
      setProcessingRefund(false);
    }
  };

  const downloadCSV = () => {
    if (!report || !report.payments.length) return toast.error('No data to export');
    
    const headers = ['Booking ID', 'Date', 'Payer Name', 'Payer Email', 'Method', 'Amount', 'Status'];
    const rows = report.payments.map(p => [
      p.booking_id,
      formatDate(p),
      `"${p.User?.first_name} ${p.User?.last_name}"`,
      p.User?.email,
      p.payment_method,
      p.total_amount,
      p.booking_status
    ]);

    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `financial_report_${period}_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowExport(false);
  };
 const downloadPDF = () => {
    if (!report || !report.payments.length) return toast.error('No data to export');

    // ✅ Using dynamic imports to guarantee it works in Vite
    Promise.all([
      import('jspdf'),
      import('jspdf-autotable')
    ]).then(([jsPDFModule, autoTableModule]) => {
      const jsPDF = jsPDFModule.default;
      const autoTable = autoTableModule.default;
      const doc = new jsPDF();

      // 1. Text Header (No images to fail)
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.text('NATIONAL LIBRARY SERVICES', 14, 20);
      
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('FINANCIAL REPORT - ' + period.toUpperCase(), 14, 28);
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text('Generated on: ' + new Date().toLocaleString(), 14, 36);

      // 2. Summary Table
      const summaryData = [
        ['Total Revenue', `MK ${report.totalRevenue.toLocaleString()}`],
        ['Online Revenue (PayChangu)', `MK ${report.onlineRevenue.toLocaleString()}`],
        ['Cash Revenue (POS)', `MK ${report.cashRevenue.toLocaleString()}`],
        ['Total Tickets Sold', `${report.totalTicketsSold}`],
      ];

      autoTable(doc, {
        startY: 45,
        head: [['Metric', 'Value']],
        body: summaryData,
        theme: 'grid',
        headStyles: { fillColor: [8, 40, 69] }, // Deep Navy
        styles: { fontSize: 10 },
      });

      // 3. Transactions Table
      const tableData = report.payments.map(p => [
        formatDate(p),
        `${p.User?.first_name} ${p.User?.last_name}`,
        p.User?.email || 'N/A',
        p.payment_method.toUpperCase(),
        `MK ${Number(p.total_amount).toLocaleString()}`,
        p.booking_status.toUpperCase()
      ]);

      const finalY = (doc as any).lastAutoTable?.finalY || 90;

      autoTable(doc, {
        startY: finalY + 10,
        head: [['Date', 'Payer Name', 'Email', 'Method', 'Amount', 'Status']],
        body: tableData,
        theme: 'striped',
        headStyles: { fillColor: [24, 107, 177] }, // Medium Blue
        styles: { fontSize: 8 },
      });

      // 4. Save the PDF
      doc.save(`NLS_Financial_Report_${period}_${new Date().toISOString().split('T')[0]}.pdf`);
      setShowExport(false);
      
    }).catch(err => {
      console.error("PDF generation failed:", err);
      toast.error('Failed to generate PDF');
    });
  };

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Financial Reports</h1>
          <p className="text-sm text-gray-500 mt-1">Track revenue, view payers, and process refunds.</p>
        </div>
        
        <div className="flex gap-2 items-center">
          {['daily', 'weekly', 'monthly'].map(p => (
            <button key={p} onClick={() => setPeriod(p as any)} className={`h-9 px-4 rounded-md text-sm font-semibold capitalize transition ${period === p ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-200 text-gray-700'}`}>
              {p}
            </button>
          ))}
          <button onClick={() => fetchReport(period)} className="h-9 px-3 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200">
            <FontAwesomeIcon icon={faSync} className={loading ? 'animate-spin' : ''} />
          </button>
          
          <div className="relative">
            <button onClick={() => setShowExport(!showExport)} className="h-9 px-4 rounded-md bg-gray-800 text-white font-semibold flex items-center gap-2">
              <FontAwesomeIcon icon={faDownload} /> Export
            </button>
            {showExport && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 z-50 overflow-hidden">
                <button onClick={downloadPDF} className="w-full text-left px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-2 border-b border-gray-50">
                  <FontAwesomeIcon icon={faFilePdf} className="text-red-500" /> Download PDF
                </button>
                <button onClick={downloadCSV} className="w-full text-left px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                  <FontAwesomeIcon icon={faFileCsv} className="text-emerald-600" /> Download CSV
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <FontAwesomeIcon icon={faSpinner} className="animate-spin text-4xl text-indigo-600" />
        </div>
      ) : report ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 md:col-span-2">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center">
                  <FontAwesomeIcon icon={faMoneyBillWave} className="text-emerald-600 text-2xl" />
                </div>
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

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50">
              <h2 className="font-extrabold text-gray-900">Payment Transactions</h2>
            </div>
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left text-xs font-bold text-gray-500 uppercase px-4 py-3">Date</th>
                  <th className="text-left text-xs font-bold text-gray-500 uppercase px-4 py-3">Payer Details</th>
                  <th className="text-left text-xs font-bold text-gray-500 uppercase px-4 py-3">Method</th>
                  <th className="text-left text-xs font-bold text-gray-500 uppercase px-4 py-3">Amount</th>
                  <th className="text-left text-xs font-bold text-gray-500 uppercase px-4 py-3">Status</th>
                  <th className="text-right text-xs font-bold text-gray-500 uppercase px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {report.payments.map(p => (
                  <tr key={p.booking_id} className="hover:bg-gray-50">
                    {/* ✅ Using formatDate helper */}
                    <td className="px-4 py-3 text-sm text-gray-600">{formatDate(p)}</td>
                    <td className="px-4 py-3 text-sm">
                      <p className="font-bold text-gray-800">{p.User?.first_name} {p.User?.last_name}</p>
                      <p className="text-xs text-gray-500">{p.User?.email}</p>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${p.payment_method === 'cash' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                        {p.payment_method}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm font-bold text-gray-800">MK {Number(p.total_amount).toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${p.booking_status === 'paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                        {p.booking_status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {p.booking_status === 'paid' && (
                        <button onClick={() => setRefundId(p.booking_id)} className="inline-flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded hover:bg-red-100 transition">
                          <FontAwesomeIcon icon={faUndo} /> Refund
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500 py-10">No report data available.</p>
      )}

      {refundId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => !processingRefund && setRefundId(null)} />
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
            <button onClick={() => !processingRefund && setRefundId(null)} disabled={processingRefund} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition">
              <FontAwesomeIcon icon={faTimes} className="text-lg" />
            </button>
            <div className="pt-8 pb-4 flex justify-center">
              <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center">
                <FontAwesomeIcon icon={faExclamationTriangle} className="text-amber-600 text-2xl" />
              </div>
            </div>
            <div className="px-6 pb-6 text-center">
              <h3 className="text-xl font-extrabold text-gray-900">Process Refund?</h3>
              <p className="text-sm text-gray-600 mt-3 leading-relaxed font-medium">
                This will mark the booking as refunded. It will be removed from the "Paid" totals but kept in the audit log.
              </p>
              <div className="mt-6 flex gap-3">
                <button onClick={() => setRefundId(null)} disabled={processingRefund} className="flex-1 px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-700 font-bold text-base hover:bg-gray-50 transition disabled:opacity-50">
                  Cancel
                </button>
                <button onClick={confirmRefund} disabled={processingRefund} className="flex-1 px-4 py-3 rounded-lg font-bold text-base text-white bg-amber-500 hover:bg-amber-600 shadow-md transition inline-flex items-center justify-center gap-2 disabled:opacity-50">
                  {processingRefund ? <><FontAwesomeIcon icon={faSpinner} spin /> Processing...</> : <><FontAwesomeIcon icon={faUndo} /> Yes, Refund</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;