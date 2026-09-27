import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faFileCsv,
  faUpload,
  faTimes,
  faCheckCircle,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import {
  getSections,
  uploadSeatsCSV,
  type Section,
  type CSVUploadSummary,
} from '../../../../api/admin/seatApi';

const CSVUpload: React.FC = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [summary, setSummary] = useState<CSVUploadSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSections()
      .then((data) => {
        setSections(data);
        if (data.length > 0) setActiveSection(data[0].section_id);
      })
      .catch(() => toast.error('Failed to load sections'))
      .finally(() => setLoading(false));
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;

    if (!f.name.toLowerCase().endsWith('.csv')) {
      toast.error('Only CSV files are allowed');
      return;
    }

    if (f.size > 5 * 1024 * 1024) {
      toast.error('File too large (max 5MB)');
      return;
    }

    setFile(f);
    setSummary(null);
  };

  const handleUpload = async () => {
    if (!file || !activeSection) {
      toast.error('Please select a section and file');
      return;
    }

    setUploading(true);
    try {
      const result = await uploadSeatsCSV(activeSection, file);
      setSummary(result);

      if (result.added > 0) {
        toast.success(`${result.added} seats added`);
      } else {
        toast.error('No seats were added');
      }

      setFile(null);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <FontAwesomeIcon icon={faSpinner} className="animate-spin text-4xl text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">CSV Upload</h1>
        <p className="text-sm text-gray-500 mt-1">
          Bulk add seats to a section via CSV file.
        </p>
      </div>

      {/* Format guide */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
        <h3 className="text-sm font-extrabold text-blue-900 uppercase tracking-wide mb-2">
          📄 CSV Format
        </h3>
        <pre className="bg-white rounded-lg p-3 text-xs text-gray-700 overflow-x-auto border border-blue-100">
{`seat_label,row_number,column_number,seat_status
PC-01,1,1,available
PC-02,1,2,available
PC-03,2,1,available`}
        </pre>
        <p className="text-xs text-gray-600 mt-3">
          <strong>Required:</strong> <code className="bg-white px-1.5 py-0.5 rounded">seat_label</code>
          <span className="ml-3">
            <strong>Optional:</strong> <code className="bg-white px-1.5 py-0.5 rounded">row_number</code>,{' '}
            <code className="bg-white px-1.5 py-0.5 rounded">column_number</code>,{' '}
            <code className="bg-white px-1.5 py-0.5 rounded">seat_status</code>
          </span>
        </p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-5 space-y-5">
          {/* Section picker */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Section
            </label>
            <div className="flex flex-wrap gap-2">
              {sections.map((s) => (
                <button
                  key={s.section_id}
                  onClick={() => setActiveSection(s.section_id)}
                  className={`h-9 px-4 rounded-md text-sm font-semibold transition ${
                    activeSection === s.section_id
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {s.section_name}
                </button>
              ))}
            </div>
          </div>

          {/* File picker */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CSV File
            </label>

            {file ? (
              <div className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center shrink-0">
                  <FontAwesomeIcon icon={faFileCsv} className="text-indigo-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-800 truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
                <button
                  onClick={() => setFile(null)}
                  className="text-gray-400 hover:text-red-500 transition"
                  aria-label="Remove file"
                >
                  <FontAwesomeIcon icon={faTimes} className="text-lg" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center gap-2 p-8 border-2 border-dashed border-gray-200 rounded-lg cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/50 transition">
                <FontAwesomeIcon icon={faUpload} className="text-3xl text-gray-400" />
                <span className="text-sm font-bold text-gray-700">
                  Click to select a CSV file
                </span>
                <span className="text-xs text-gray-500">Max size 5MB</span>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Upload button */}
          <div className="flex justify-end">
            <button
              onClick={handleUpload}
              disabled={!file || !activeSection || uploading}
              className="inline-flex items-center gap-2 h-10 px-5 rounded-md text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FontAwesomeIcon
                icon={uploading ? faSpinner : faUpload}
                className={`size-4 ${uploading ? 'animate-spin' : ''}`}
              />
              {uploading ? 'Uploading...' : 'Upload Seats'}
            </button>
          </div>
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
              <FontAwesomeIcon icon={faCheckCircle} className="text-emerald-600" />
            </div>
            <div>
              <h2 className="font-extrabold text-gray-900 text-lg">Upload Complete</h2>
              <p className="text-xs text-gray-500">Results from your CSV import</p>
            </div>
          </div>

          <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Total Rows</p>
              <p className="text-2xl font-extrabold text-gray-900 mt-1">{summary.total_rows}</p>
            </div>
            <div className="bg-emerald-50 rounded-lg p-4">
              <p className="text-xs font-bold text-emerald-700 uppercase tracking-wide">Added</p>
              <p className="text-2xl font-extrabold text-emerald-700 mt-1">{summary.added}</p>
            </div>
            <div className="bg-amber-50 rounded-lg p-4">
              <p className="text-xs font-bold text-amber-700 uppercase tracking-wide">Skipped</p>
              <p className="text-2xl font-extrabold text-amber-700 mt-1">{summary.skipped}</p>
            </div>
          </div>

          {summary.validation_errors.length > 0 && (
            <div className="px-5 pb-5">
              <div className="bg-red-50 border border-red-100 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-600" />
                  <p className="text-sm font-bold text-red-800">
                    Validation Errors ({summary.validation_errors.length})
                  </p>
                </div>
                <ul className="text-xs text-red-700 space-y-1 list-disc list-inside">
                  {summary.validation_errors.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {summary.skip_reasons.length > 0 && (
            <div className="px-5 pb-5">
              <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <FontAwesomeIcon icon={faExclamationTriangle} className="text-amber-600" />
                  <p className="text-sm font-bold text-amber-800">
                    Skipped Rows ({summary.skip_reasons.length})
                  </p>
                </div>
                <ul className="text-xs text-amber-700 space-y-1 list-disc list-inside">
                  {summary.skip_reasons.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CSVUpload;