import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faComments,
  faPlus,
  faTimes,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import { submitQuery, getMyQueries, deleteQuery, type Query } from '../../api/queries/queryApi';
import QueryCard from './components/QueryCard';

const CATEGORIES = [
  { value: 'general', label: 'General' },
  { value: 'booking', label: 'Booking' },
  { value: 'payment', label: 'Payment' },
  { value: 'seat', label: 'Seat Issue' },
  { value: 'technical', label: 'Technical' },
];

const PRIORITIES = [
  { value: 'low', label: 'Low' },
  { value: 'normal', label: 'Normal' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' },
];

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'closed', label: 'Closed' },
];

const Queries: React.FC = () => {
  const [queries, setQueries] = useState<Query[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all');
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    subject: '',
    message: '',
    category: 'general',
    priority: 'normal',
  });

  const fetchQueries = async () => {
    setLoading(true);
    try {
      const data = await getMyQueries();
      setQueries(data);
    } catch {
      toast.error('Failed to load queries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.subject.trim() || !form.message.trim()) {
      toast.error('Subject and message are required');
      return;
    }

    setSubmitting(true);
    try {
      await submitQuery(form);
      toast.success('Query submitted successfully');
      setForm({ subject: '', message: '', category: 'general', priority: 'normal' });
      setShowForm(false);
      fetchQueries();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to submit query');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteQuery(id);
      toast.success('Query deleted');
      setQueries((prev) => prev.filter((q) => q.query_id !== id));
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to delete query');
    }
  };

  const filtered =
    filter === 'all' ? queries : queries.filter((q) => q.status === filter);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <FontAwesomeIcon icon={faSpinner} className="animate-spin text-4xl text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Support</h1>
            <p className="text-sm text-gray-500 mt-1">
              Submit a query and our team will respond.
            </p>
          </div>

          <button
            onClick={() => setShowForm((v) => !v)}
            className={`inline-flex items-center gap-2 h-9 px-4 rounded-md text-sm font-semibold transition ${
              showForm
                ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            <FontAwesomeIcon icon={showForm ? faTimes : faPlus} className="size-4" />
            {showForm ? 'Cancel' : 'New Query'}
          </button>
        </div>

        {/* Submit form */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow border border-gray-200 p-5 space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                placeholder="Brief title of your issue"
                className="w-full h-10 px-3 rounded-md border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none text-sm"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full h-10 px-3 rounded-md border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none text-sm bg-white"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  value={form.priority}
                  onChange={(e) => setForm({ ...form, priority: e.target.value })}
                  className="w-full h-10 px-3 rounded-md border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none text-sm bg-white"
                >
                  {PRIORITIES.map((p) => (
                    <option key={p.value} value={p.value}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Describe your issue in detail..."
                rows={5}
                className="w-full px-3 py-2 rounded-md border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none text-sm resize-none"
                required
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 h-9 px-4 rounded-md text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition disabled:opacity-50"
              >
                <FontAwesomeIcon
                  icon={submitting ? faSpinner : faPaperPlane}
                  className={`size-4 ${submitting ? 'animate-spin' : ''}`}
                />
                {submitting ? 'Submitting...' : 'Submit Query'}
              </button>
            </div>
          </form>
        )}

        {/* Filter tabs */}
        {queries.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => {
              const count =
                f.value === 'all'
                  ? queries.length
                  : queries.filter((q) => q.status === f.value).length;
              return (
                <button
                  key={f.value}
                  onClick={() => setFilter(f.value)}
                  className={`inline-flex items-center gap-2 h-8 px-3 rounded-md text-xs font-semibold transition ${
                    filter === f.value
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {f.label}
                  <span
                    className={`px-1.5 rounded text-xs ${
                      filter === f.value ? 'bg-white/20' : 'bg-gray-100'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Queries list */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-lg shadow border border-gray-200 p-12 text-center">
            <FontAwesomeIcon icon={faComments} className="text-5xl text-gray-300 mb-4" />
            <p className="text-gray-500 text-base font-medium">
              {queries.length === 0 ? 'No queries yet' : 'No queries match this filter'}
            </p>
            {queries.length === 0 && !showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="mt-4 inline-flex items-center gap-2 h-9 px-4 rounded-md text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition"
              >
                <FontAwesomeIcon icon={faPlus} className="size-4" />
                Submit your first query
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((q) => (
              <QueryCard
                key={q.query_id}
                query={q}
                onDelete={() => handleDelete(q.query_id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Queries;