import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronUp,
  faUserTie,
  faUser,
  faClock,
  faTag,
  faFlag,
  faTrash,
  faExclamationTriangle,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import type { Query } from '../../../api/queries/queryApi';

interface Props {
  query: Query;
  onDelete?: () => void;
}

const statusStyles: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700',
  in_progress: 'bg-blue-100 text-blue-700',
  resolved: 'bg-emerald-100 text-emerald-700',
  closed: 'bg-gray-100 text-gray-700',
};

const priorityStyles: Record<string, string> = {
  low: 'bg-gray-100 text-gray-600',
  normal: 'bg-blue-100 text-blue-600',
  high: 'bg-orange-100 text-orange-700',
  urgent: 'bg-red-100 text-red-700',
};

const statusLabel = (s: string) =>
  s === 'in_progress' ? 'In Progress' : s.charAt(0).toUpperCase() + s.slice(1);

// ✅ Robust date parse — handles created_at OR createdAt, returns formatted
const formatDateTime = (q: any): string => {
  const raw = q.created_at || q.createdAt;
  if (!raw) return 'Unknown date';
  const d = new Date(raw);
  if (isNaN(d.getTime())) return 'Unknown date';
  return d.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const QueryCard: React.FC<Props> = ({ query, onDelete }) => {
  const [expanded, setExpanded] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const replies = query.QueryReplies || [];

  const confirmDelete = () => {
    if (onDelete) onDelete();
    setShowDeleteModal(false);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden hover:shadow-md transition">
        {/* Header — clickable */}
        <div
          className="p-5 cursor-pointer hover:bg-gray-50 transition"
          onClick={() => setExpanded((v) => !v)}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-gray-800 truncate">
                {query.subject}
              </h3>

              <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500">
                <span className="inline-flex items-center gap-1">
                  <FontAwesomeIcon icon={faTag} className="size-3" />
                  {query.category}
                </span>
                <span className="inline-flex items-center gap-1">
                  <FontAwesomeIcon icon={faClock} className="size-3" />
                  {formatDateTime(query)}
                </span>
                <span className="inline-flex items-center gap-1">
                  <FontAwesomeIcon icon={faFlag} className="size-3" />
                  {query.priority}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2 shrink-0">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                  statusStyles[query.status] || 'bg-gray-100 text-gray-700'
                }`}
              >
                {statusLabel(query.status)}
              </span>

              <span
                className={`px-2 py-0.5 rounded text-xs font-semibold uppercase ${
                  priorityStyles[query.priority] || 'bg-gray-100 text-gray-600'
                }`}
              >
                {query.priority}
              </span>
            </div>
          </div>
        </div>

        {/* Body — expanded */}
        {expanded && (
          <div className="border-t border-gray-100 bg-gray-50 px-5 py-4 space-y-4">
            {/* Original message */}
            <div>
              <p className="text-xs font-bold uppercase text-gray-500 mb-1">
                Your Message
              </p>
              <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                {query.message}
              </p>
            </div>

            {/* Replies */}
            {replies.length > 0 && (
              <div className="space-y-3 pt-3 border-t border-gray-200">
                <p className="text-xs font-bold uppercase text-gray-500">
                  Replies ({replies.length})
                </p>

                {replies.map((r) => {
                  const isAdmin = r.User?.role === 'admin';
                  const name = r.User
                    ? `${r.User.first_name} ${r.User.last_name}`.trim()
                    : 'Support';

                  const rawDate = (r as any).created_at || (r as any).createdAt;
                  const replyDate = rawDate ? new Date(rawDate) : null;

                  return (
                    <div
                      key={r.reply_id}
                      className={`rounded-lg p-4 ${
                        isAdmin
                          ? 'bg-indigo-50 border border-indigo-100'
                          : 'bg-white border border-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center ${
                            isAdmin ? 'bg-indigo-600' : 'bg-gray-400'
                          }`}
                        >
                          <FontAwesomeIcon
                            icon={isAdmin ? faUserTie : faUser}
                            className="text-white size-3"
                          />
                        </div>
                        <span className="text-sm font-bold text-gray-800">
                          {name}
                        </span>
                        {isAdmin && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-600 text-white font-bold uppercase">
                            Admin
                          </span>
                        )}
                        <span className="text-xs text-gray-500 ml-auto">
                          {replyDate && !isNaN(replyDate.getTime())
                            ? replyDate.toLocaleDateString('en-US', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })
                            : ''}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                        {r.message}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}

            {replies.length === 0 && (
              <div className="pt-3 border-t border-gray-200 text-center">
                <p className="text-sm text-gray-500 italic">
                  No replies yet. Our team will respond soon.
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-200">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setExpanded(false);
                }}
                className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700"
              >
                <FontAwesomeIcon icon={faChevronUp} className="size-3" />
                Collapse
              </button>

              {onDelete && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDeleteModal(true);
                  }}
                  className="inline-flex items-center gap-2 h-8 px-3 rounded-md text-xs font-semibold border border-red-200 bg-white text-red-600 hover:bg-red-50 transition"
                >
                  <FontAwesomeIcon icon={faTrash} className="size-3" />
                  Delete Query
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowDeleteModal(false)}
          />

          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
            >
              <FontAwesomeIcon icon={faTimes} className="text-lg" />
            </button>

            <div className="pt-8 pb-4 flex justify-center">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faExclamationTriangle}
                  className="text-red-600 text-2xl"
                />
              </div>
            </div>

            <div className="px-6 pb-6 text-center">
              <h3 className="text-xl font-extrabold text-gray-900">
                Delete this query?
              </h3>
              <p className="text-sm text-gray-600 mt-3 leading-relaxed font-medium">
                This action cannot be undone. Your query and all replies will be
                permanently removed.
              </p>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-700 font-bold text-base hover:bg-gray-50 transition"
                >
                  Keep Query
                </button>

                <button
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-3 rounded-lg font-bold text-base text-white bg-red-500 hover:bg-red-600 shadow-md hover:shadow-lg transition inline-flex items-center justify-center gap-2"
                >
                  <FontAwesomeIcon icon={faTrash} />
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QueryCard;