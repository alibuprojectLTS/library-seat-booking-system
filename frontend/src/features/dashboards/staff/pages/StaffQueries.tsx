import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faComments, faReply, faTimes } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import apiClient from '../../../../api/core/apiClient';

interface Query {
  query_id: number;
  subject: string;
  message: string;
  category: string;
  priority: string;
  status: string;
  created_at: string;
  User?: { first_name: string; last_name: string; email: string };
  QueryReplies?: any[];
}

const StaffQueries: React.FC = () => {
  const [queries, setQueries] = useState<Query[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [replyToId, setReplyToId] = useState<number | null>(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [replying, setReplying] = useState(false);

  const fetchQueries = async () => {
    try {
      // ✅ Changed from /admin/queries to /staff/queries
      const { data } = await apiClient.get('/staff/queries');
      setQueries(data.queries || []);
    } catch {
      toast.error('Failed to load queries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchQueries(); }, []);

  const handleReply = async () => {
    if (!replyToId || !replyMessage.trim()) return toast.error('Message is required');
    
    setReplying(true);
    try {
      // ✅ Changed from /admin/queries to /staff/queries
      await apiClient.post(`/staff/queries/${replyToId}/reply`, {
        message: replyMessage,
        status: 'resolved'
      });
      toast.success('Reply sent successfully');
      setReplyToId(null);
      setReplyMessage('');
      fetchQueries();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to send reply');
    } finally {
      setReplying(false);
    }
  };

  if (loading) return <div className="flex justify-center py-20"><FontAwesomeIcon icon={faSpinner} spin className="text-4xl text-indigo-600" /></div>;

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Support Queries</h1>
        <p className="text-sm text-gray-500 mt-1">View and reply to user support queries.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {queries.length === 0 ? (
          <div className="p-12 text-center">
            <FontAwesomeIcon icon={faComments} className="text-5xl text-gray-300 mb-4" />
            <p className="text-gray-500 text-base">No queries found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left text-xs font-bold text-gray-500 uppercase px-4 py-3">User</th>
                  <th className="text-left text-xs font-bold text-gray-500 uppercase px-4 py-3">Subject</th>
                  <th className="text-left text-xs font-bold text-gray-500 uppercase px-4 py-3">Status</th>
                  <th className="text-left text-xs font-bold text-gray-500 uppercase px-4 py-3">Date</th>
                  <th className="text-right text-xs font-bold text-gray-500 uppercase px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {queries.map(q => (
                  <tr key={q.query_id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {q.User ? `${q.User.first_name} ${q.User.last_name}` : 'Unknown'}<br/>
                      <span className="text-xs text-gray-400">{q.User?.email}</span>
                    </td>
                    <td className="px-4 py-3 text-sm font-bold text-gray-800">
                      {q.subject}
                      <p className="text-xs text-gray-500 font-normal mt-1 truncate max-w-xs">{q.message}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
                        q.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                        q.status === 'resolved' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                      }`}>{q.status.replace('_', ' ')}</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{new Date(q.created_at).toLocaleDateString()}</td>
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => setReplyToId(q.query_id)} className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-2 rounded-md hover:bg-indigo-100 transition">
                        <FontAwesomeIcon icon={faReply} /> Reply
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Reply Modal */}
      {replyToId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => !replying && setReplyToId(null)} />
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
            <button onClick={() => !replying && setReplyToId(null)} disabled={replying} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition">
              <FontAwesomeIcon icon={faTimes} className="text-lg" />
            </button>
            <div className="p-6">
              <h3 className="text-xl font-extrabold text-gray-900 mb-4">Reply to Query</h3>
              <textarea
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                rows={4}
                placeholder="Type your reply here..."
                className="w-full px-3 py-2 rounded-md border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none text-sm resize-none mb-4"
              />
              <div className="flex justify-end gap-3">
                <button onClick={() => setReplyToId(null)} disabled={replying} className="px-4 py-2 rounded-md font-bold text-gray-600 hover:bg-gray-100 transition disabled:opacity-50">
                  Cancel
                </button>
                <button onClick={handleReply} disabled={replying} className="px-4 py-2 rounded-md font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition inline-flex items-center gap-2 disabled:opacity-50">
                  {replying ? <><FontAwesomeIcon icon={faSpinner} spin /> Sending...</> : 'Send Reply'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffQueries;