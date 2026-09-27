import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faChair,
  faPlus,
  faEdit,
  faTrash,
  faTimes,
  faExclamationTriangle,
  faFilter,
} from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import {
  getSections,
  getSeatsBySection,
  addSeat,
  updateSeat,
  deleteSeat,
  type Section,
  type Seat,
} from '../../../../api/admin/seatApi';

interface SeatForm {
  seat_label: string;
  row_number: string;
  column_number: string;
  seat_status: 'available' | 'booked' | 'deactivated';
}

const emptyForm: SeatForm = {
  seat_label: '',
  row_number: '',
  column_number: '',
  seat_status: 'available',
};

const statusStyles: Record<string, string> = {
  available: 'bg-emerald-100 text-emerald-700',
  booked: 'bg-red-100 text-red-700',
  deactivated: 'bg-gray-100 text-gray-600',
};

const ManageSeats: React.FC = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [loading, setLoading] = useState(true);
  const [seatsLoading, setSeatsLoading] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editingSeat, setEditingSeat] = useState<Seat | null>(null);
  const [form, setForm] = useState<SeatForm>(emptyForm);
  const [saving, setSaving] = useState(false);

  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    getSections()
      .then((data) => {
        setSections(data);
        if (data.length > 0) setActiveSection(data[0].section_id);
      })
      .catch(() => toast.error('Failed to load sections'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!activeSection) return;
    setSeatsLoading(true);
    getSeatsBySection(activeSection)
      .then(setSeats)
      .catch(() => toast.error('Failed to load seats'))
      .finally(() => setSeatsLoading(false));
  }, [activeSection]);

  const refreshSeats = async () => {
    if (!activeSection) return;
    const data = await getSeatsBySection(activeSection);
    setSeats(data);
  };

  const openAdd = () => {
    setEditingSeat(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (seat: Seat) => {
    setEditingSeat(seat);
    setForm({
      seat_label: seat.seat_label,
      row_number: seat.row_number != null ? String(seat.row_number) : '',
      column_number: seat.column_number != null ? String(seat.column_number) : '',
      seat_status: seat.seat_status,
    });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeSection) return;

    if (!form.seat_label.trim()) {
      toast.error('Seat label is required');
      return;
    }

    setSaving(true);
    try {
      const payload = {
        section_id: activeSection,
        seat_label: form.seat_label.trim(),
        row_number: form.row_number ? Number(form.row_number) : null,
        column_number: form.column_number ? Number(form.column_number) : null,
        seat_status: form.seat_status,
      };

      if (editingSeat) {
        await updateSeat(editingSeat.seat_id, payload);
        toast.success('Seat updated');
      } else {
        await addSeat(payload);
        toast.success('Seat added');
      }

      setShowForm(false);
      setEditingSeat(null);
      await refreshSeats();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to save seat');
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await deleteSeat(deleteId);
      toast.success('Seat deleted');
      setDeleteId(null);
      await refreshSeats();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to delete seat');
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

  const activeSectionName = sections.find((s) => s.section_id === activeSection)?.section_name || '';

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manage Seats</h1>
          <p className="text-sm text-gray-500 mt-1">
            Add, edit, or remove seats per library section.
          </p>
        </div>

        <button
          onClick={openAdd}
          disabled={!activeSection}
          className="inline-flex items-center gap-2 h-9 px-4 rounded-md text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition disabled:opacity-50"
        >
          <FontAwesomeIcon icon={faPlus} className="size-4" />
          Add Seat
        </button>
      </div>

      {/* Section tabs */}
      <div className="flex flex-wrap gap-2">
        {sections.map((s) => (
          <button
            key={s.section_id}
            onClick={() => setActiveSection(s.section_id)}
            className={`inline-flex items-center gap-2 h-9 px-4 rounded-md text-sm font-semibold transition ${
              activeSection === s.section_id
                ? 'bg-indigo-600 text-white'
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <FontAwesomeIcon icon={faFilter} className="size-3" />
            {s.section_name}
          </button>
        ))}
      </div>

      {/* Seats list */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="font-extrabold text-gray-900 text-lg">
            {activeSectionName} Seats
          </h2>
          <span className="text-sm text-gray-500 font-medium">
            {seats.length} total
          </span>
        </div>

        {seatsLoading ? (
          <div className="flex items-center justify-center py-12">
            <FontAwesomeIcon icon={faSpinner} className="animate-spin text-3xl text-indigo-600" />
          </div>
        ) : seats.length === 0 ? (
          <div className="p-12 text-center">
            <FontAwesomeIcon icon={faChair} className="text-5xl text-gray-300 mb-4" />
            <p className="text-gray-500 text-base font-medium">No seats in this section</p>
            <button
              onClick={openAdd}
              className="mt-4 inline-flex items-center gap-2 h-9 px-4 rounded-md text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >
              <FontAwesomeIcon icon={faPlus} className="size-4" />
              Add first seat
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider px-4 py-3">
                    Label
                  </th>
                  <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider px-4 py-3">
                    Row
                  </th>
                  <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider px-4 py-3">
                    Col
                  </th>
                  <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider px-4 py-3">
                    Status
                  </th>
                  <th className="text-right text-xs font-bold text-gray-500 uppercase tracking-wider px-4 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {seats.map((seat) => (
                  <tr key={seat.seat_id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 text-sm font-bold text-gray-800">
                      {seat.seat_label}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {seat.row_number ?? '—'}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {seat.column_number ?? '—'}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
                          statusStyles[seat.seat_status] || 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {seat.seat_status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(seat)}
                          className="inline-flex items-center justify-center h-8 w-8 rounded-md text-indigo-600 border border-indigo-200 bg-white hover:bg-indigo-50 transition"
                          aria-label="Edit seat"
                        >
                          <FontAwesomeIcon icon={faEdit} className="size-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteId(seat.seat_id)}
                          className="inline-flex items-center justify-center h-8 w-8 rounded-md text-red-600 border border-red-200 bg-white hover:bg-red-50 transition"
                          aria-label="Delete seat"
                        >
                          <FontAwesomeIcon icon={faTrash} className="size-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => !saving && setShowForm(false)}
          />

          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
            <button
              onClick={() => !saving && setShowForm(false)}
              disabled={saving}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
            >
              <FontAwesomeIcon icon={faTimes} className="text-lg" />
            </button>

            <div className="p-6">
              <h3 className="text-xl font-extrabold text-gray-900 mb-1">
                {editingSeat ? 'Edit Seat' : 'Add Seat'}
              </h3>
              <p className="text-sm text-gray-500 mb-5">
                {activeSectionName} section
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Seat Label
                  </label>
                  <input
                    type="text"
                    value={form.seat_label}
                    onChange={(e) => setForm({ ...form, seat_label: e.target.value })}
                    placeholder="e.g. PC-01"
                    className="w-full h-10 px-3 rounded-md border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none text-sm"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Row
                    </label>
                    <input
                      type="number"
                      value={form.row_number}
                      onChange={(e) => setForm({ ...form, row_number: e.target.value })}
                      placeholder="1"
                      className="w-full h-10 px-3 rounded-md border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Column
                    </label>
                    <input
                      type="number"
                      value={form.column_number}
                      onChange={(e) => setForm({ ...form, column_number: e.target.value })}
                      placeholder="1"
                      className="w-full h-10 px-3 rounded-md border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={form.seat_status}
                    onChange={(e) =>
                      setForm({ ...form, seat_status: e.target.value as SeatForm['seat_status'] })
                    }
                    className="w-full h-10 px-3 rounded-md border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none text-sm bg-white"
                  >
                    <option value="available">Available</option>
                    <option value="booked">Booked</option>
                    <option value="deactivated">Deactivated</option>
                  </select>
                </div>

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
                    ) : editingSeat ? (
                      'Update'
                    ) : (
                      'Add Seat'
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
              <h3 className="text-xl font-extrabold text-gray-900">Delete this seat?</h3>
              <p className="text-sm text-gray-600 mt-3 leading-relaxed font-medium">
                This action cannot be undone.
              </p>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setDeleteId(null)}
                  disabled={deleting}
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-700 font-bold text-base hover:bg-gray-50 transition disabled:opacity-50"
                >
                  Keep Seat
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

export default ManageSeats;