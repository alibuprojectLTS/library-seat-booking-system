import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faLandmark,
  faSave,
  faCheckCircle,
  faClock,
  faUsers,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import {
  getStatus,
  updateStatus,
  type LibraryStatus as Status,
} from '../../../../api/admin/statusApi';

interface Form {
  current_state: 'open' | 'full' | 'closed' | 'maintenance';
  capacity_used: string;
  capacity_total: string;
  message: string;
  open_hours: string;
}

const emptyForm: Form = {
  current_state: 'open',
  capacity_used: '0',
  capacity_total: '0',
  message: '',
  open_hours: '8:00 AM - 6:00 PM',
};

const stateStyles: Record<string, string> = {
  open: 'bg-emerald-100 text-emerald-700',
  full: 'bg-amber-100 text-amber-700',
  closed: 'bg-red-100 text-red-700',
  maintenance: 'bg-gray-100 text-gray-700',
};

const LibraryStatus: React.FC = () => {
  const [form, setForm] = useState<Form>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchStatus = async () => {
    setLoading(true);
    try {
      const s = await getStatus();
      setForm({
        current_state: (s.current_state as Form['current_state']) || 'open',
        capacity_used: String(s.capacity_used ?? 0),
        capacity_total: String(s.capacity_total ?? 0),
        message: s.message || '',
        open_hours: s.open_hours || '8:00 AM - 6:00 PM',
      });
    } catch {
      toast.error('Failed to load library status');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateStatus({
        current_state: form.current_state,
        capacity_used: Number(form.capacity_used) || 0,
        capacity_total: Number(form.capacity_total) || 0,
        message: form.message,
        open_hours: form.open_hours,
      });
      toast.success('Library status updated');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to update');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <FontAwesomeIcon icon={faSpinner} className="animate-spin text-4xl text-indigo-600" />
      </div>
    );
  }

  const occupancyPct =
    Number(form.capacity_total) > 0
      ? Math.round((Number(form.capacity_used) / Number(form.capacity_total)) * 100)
      : 0;

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Library Status</h1>
        <p className="text-sm text-gray-500 mt-1">
          Update the public status shown on the home page.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-4 border-b border-gray-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
              <FontAwesomeIcon icon={faLandmark} className="text-indigo-600" />
            </div>
            <div>
              <h2 className="font-extrabold text-gray-900 text-lg">Update Status</h2>
              <p className="text-xs text-gray-500">Changes reflect on home page instantly</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current State
              </label>
              <select
                value={form.current_state}
                onChange={(e) =>
                  setForm({ ...form, current_state: e.target.value as Form['current_state'] })
                }
                className="w-full h-10 px-3 rounded-md border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none text-sm bg-white"
              >
                <option value="open">Open</option>
                <option value="full">Full</option>
                <option value="closed">Closed</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Capacity Used
                </label>
                <input
                  type="number"
                  min={0}
                  value={form.capacity_used}
                  onChange={(e) => setForm({ ...form, capacity_used: e.target.value })}
                  className="w-full h-10 px-3 rounded-md border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Capacity Total
                </label>
                <input
                  type="number"
                  min={0}
                  value={form.capacity_total}
                  onChange={(e) => setForm({ ...form, capacity_total: e.target.value })}
                  className="w-full h-10 px-3 rounded-md border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={3}
                placeholder="Welcome to the National Library Services..."
                className="w-full px-3 py-2 rounded-md border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none text-sm resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Open Hours
              </label>
              <input
                type="text"
                value={form.open_hours}
                onChange={(e) => setForm({ ...form, open_hours: e.target.value })}
                placeholder="8:00 AM - 6:00 PM"
                className="w-full h-10 px-3 rounded-md border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none text-sm"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 h-10 px-5 rounded-md text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 shadow-md transition disabled:opacity-50"
              >
                <FontAwesomeIcon
                  icon={saving ? faSpinner : faSave}
                  className={`size-4 ${saving ? 'animate-spin' : ''}`}
                />
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>

        {/* Live Preview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-4 border-b border-gray-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
              <FontAwesomeIcon icon={faCheckCircle} className="text-emerald-600" />
            </div>
            <div>
              <h2 className="font-extrabold text-gray-900 text-lg">Live Preview</h2>
              <p className="text-xs text-gray-500">How it appears on home page</p>
            </div>
          </div>

          <div className="p-5 space-y-4">
            <div className="flex items-center gap-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                  stateStyles[form.current_state] || 'bg-gray-100 text-gray-700'
                }`}
              >
                Library is {form.current_state}
              </span>
            </div>

            <p className="text-sm text-gray-700 leading-relaxed">
              {form.message || 'No message set.'}
            </p>

            <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  <FontAwesomeIcon icon={faUsers} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase">Capacity</p>
                  <p className="text-sm font-extrabold text-gray-900">
                    {form.capacity_used}/{form.capacity_total}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                  <FontAwesomeIcon icon={faClock} className="text-amber-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase">Open Hours</p>
                  <p className="text-sm font-extrabold text-gray-900">{form.open_hours}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs font-bold text-gray-500 uppercase">Occupancy</p>
              <div className="flex items-center justify-between mt-1">
                <p className="text-2xl font-extrabold text-gray-900">{occupancyPct}%</p>
                <p className="text-sm text-gray-500 font-medium">occupied</p>
              </div>
              <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-600 transition-all"
                  style={{ width: `${Math.min(occupancyPct, 100)}%` }}
                />
              </div>
            </div>

            <div className="flex items-start gap-2 pt-3 border-t border-gray-100 text-xs text-gray-500">
              <FontAwesomeIcon icon={faInfoCircle} className="mt-0.5 shrink-0" />
              <p>Save to publish these values on the home page.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryStatus;