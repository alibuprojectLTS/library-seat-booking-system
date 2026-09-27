import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faBullhorn,
  faPlus,
  faEdit,
  faTrash,
  faTimes,
  faExclamationTriangle,
  faThumbtack,
} from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import {
  getAllAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  type Announcement,
} from '../../../../api/admin/announcementApi';

interface Form {
  title: string;
  content: string;
  announcement_type: 'general' | 'urgent' | 'holiday' | 'maintenance' | 'promotional';
  priority: 'normal' | 'high' | 'urgent';
  is_pinned: boolean;
  expires_at: string;
}

const emptyForm: Form = {
  title: '',
  content: '',
  announcement_type: 'general',
  priority: 'normal',
  is_pinned: false,
  expires_at: '',
};

const typeStyles: Record<string, string> = {
  general: 'bg-blue-100 text-blue-700',
  urgent: 'bg-red-100 text-red-700',
  holiday: 'bg-purple-100 text-purple-700',
  maintenance: 'bg-amber-100 text-amber-700',
  promotional: 'bg-emerald-100 text-emerald-700',
};

const priorityStyles: Record<string, string> = {
  normal: 'bg-gray-100 text-gray-600',
  high: 'bg-orange-100 text-orange-700',
  urgent: 'bg-red-100 text-red-700',
};

const Announcements: React.FC = () => {
  const [items, setItems] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Announcement | null>(null);
  const [form, setForm] = useState<Form>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const data = await getAllAnnouncements();
      setItems(data);
    } catch {
      toast.error('Failed to load announcements');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const openAdd = () => {
    setEditing(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (a: Announcement) => {
    setEditing(a);
    setForm({
      title: a.title,
      content: a.content,
      announcement_type: a.announcement_type as Form['announcement_type'],
      priority: a.priority as Form['priority'],
      is_pinned: a.is_pinned,
      expires_at: a.expires_at ? a.expires_at.slice(0, 16) : '',
    });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) {
      toast.error('Title and content are required');
      return;
    }

    setSaving(true);
    try {
      const payload = {
        ...form,
        expires_at: form.expires_at || null,
      };

      if (editing) {
        await updateAnnouncement(editing.announcement_id, payload);
        toast.success('Announcement updated');
      } else {
        await createAnnouncement(payload);
        toast.success('Announcement posted');
      }

      setShowForm(false);
      setEditing(null);
      await fetchAll();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await deleteAnnouncement(deleteId);
      toast.success('Announcement deleted');
      setDeleteId(null);
      await fetchAll();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to delete');
    } finally {
      setDeleting(false);
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
      <div className="flex flex-wrap justify-between items-center gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Announcements</h1>
          <p className="text-sm text-gray-500 mt-1">
            Post updates visible on the home page.
          </p>
        </div>

        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 h-9 px-4 rounded-md text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition"
        >
          <FontAwesomeIcon icon={faPlus} className="size-4" />
          New Announcement
        </button>
      </div>

      {/* List */}
      {items.length === 0 ? (
        <div className="bg-white rounded-lg shadow border border-gray-200 p-12 text-center">
          <FontAwesomeIcon icon={faBullhorn} className="text-5xl text-gray-300 mb-4" />
          <p className="text-gray-500 text-base font-medium">No announcements yet</p>
          <button
            onClick={openAdd}
            className="mt-4 inline-flex items-center gap-2 h-9 px-4 rounded-md text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            <FontAwesomeIcon icon={faPlus} className="size-4" />
            Post first announcement
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((a) => (
            <div
              key={a.announcement_id}
              className="bg-white rounded-lg shadow border border-gray-200 p-5 hover:shadow-md transition"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    {a.is_pinned && (
                      <FontAwesomeIcon icon={faThumbtack} className="text-amber-500 size-3" />
                    )}
                    <h3 className="text-lg font-bold text-gray-800 truncate">{a.title}</h3>
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
                        typeStyles[a.announcement_type] || 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {a.announcement_type}
                    </span>
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
                        priorityStyles[a.priority] || 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {a.priority}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">{a.content}</p>

                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(a.created_at || a.createdAt || '').toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                    {a.expires_at && (
                      <span className="ml-3">
                        Expires: {new Date(a.expires_at).toLocaleDateString()}
                      </span>
                    )}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => openEdit(a)}
                    className="inline-flex items-center justify-center h-8 w-8 rounded-md text-indigo-600 border border-indigo-200 bg-white hover:bg-indigo-50 transition"
                    aria-label="Edit"
                  >
                    <FontAwesomeIcon icon={faEdit} className="size-3.5" />
                  </button>
                  <button
                    onClick={() => setDeleteId(a.announcement_id)}
                    className="inline-flex items-center justify-center h-8 w-8 rounded-md text-red-600 border border-red-200 bg-white hover:bg-red-50 transition"
                    aria-label="Delete"
                  >
                    <FontAwesomeIcon icon={faTrash} className="size-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => !saving && setShowForm(false)}
          />

          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[95vh] overflow-y-auto">
            <button
              onClick={() => !saving && setShowForm(false)}
              disabled={saving}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
            >
              <FontAwesomeIcon icon={faTimes} className="text-lg" />
            </button>

            <div className="p-6">
              <h3 className="text-xl font-extrabold text-gray-900 mb-5">
                {editing ? 'Edit Announcement' : 'New Announcement'}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full h-10 px-3 rounded-md border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                  <textarea
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 rounded-md border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none text-sm resize-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select
                      value={form.announcement_type}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          announcement_type: e.target.value as Form['announcement_type'],
                        })
                      }
                      className="w-full h-10 px-3 rounded-md border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none text-sm bg-white"
                    >
                      <option value="general">General</option>
                      <option value="urgent">Urgent</option>
                      <option value="holiday">Holiday</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="promotional">Promotional</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <select
                      value={form.priority}
                      onChange={(e) =>
                        setForm({ ...form, priority: e.target.value as Form['priority'] })
                      }
                      className="w-full h-10 px-3 rounded-md border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none text-sm bg-white"
                    >
                      <option value="normal">Normal</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expires At (optional)
                  </label>
                  <input
                    type="datetime-local"
                    value={form.expires_at}
                    onChange={(e) => setForm({ ...form, expires_at: e.target.value })}
                    className="w-full h-10 px-3 rounded-md border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none text-sm"
                  />
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.is_pinned}
                    onChange={(e) => setForm({ ...form, is_pinned: e.target.checked })}
                    className="w-4 h-4 accent-indigo-600"
                  />
                  <span className="text-sm font-medium text-gray-700">Pin this announcement</span>
                </label>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    disabled={saving}
                    className="flex-1 px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-700 font-bold text-base hover:bg-gray-50 transition disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 px-4 py-3 rounded-lg font-bold text-base text-white bg-indigo-600 hover:bg-indigo-700 shadow-md transition inline-flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {saving ? (
                      <>
                        <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                        Saving...
                      </>
                    ) : editing ? (
                      'Update'
                    ) : (
                      'Post'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm modal */}
      {deleteId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => !deleting && setDeleteId(null)}
          />

          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
            <button
              onClick={() => !deleting && setDeleteId(null)}
              disabled={deleting}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
            >
              <FontAwesomeIcon icon={faTimes} className="text-lg" />
            </button>

            <div className="pt-8 pb-4 flex justify-center">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-600 text-2xl" />
              </div>
            </div>

            <div className="px-6 pb-6 text-center">
              <h3 className="text-xl font-extrabold text-gray-900">Delete announcement?</h3>
              <p className="text-sm text-gray-600 mt-3 leading-relaxed font-medium">
                This action cannot be undone.
              </p>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setDeleteId(null)}
                  disabled={deleting}
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-700 font-bold text-base hover:bg-gray-50 transition disabled:opacity-50"
                >
                  Keep
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={deleting}
                  className="flex-1 px-4 py-3 rounded-lg font-bold text-base text-white bg-red-500 hover:bg-red-600 shadow-md transition inline-flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {deleting ? (
                    <>
                      <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faTrash} />
                      Yes, Delete
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Announcements;