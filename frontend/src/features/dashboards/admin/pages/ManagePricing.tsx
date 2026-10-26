import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTags, faSpinner, faSave } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
// Keep your existing import
import { getAllSections, updateSectionPrice, type Section } from '../../../../api/admin/pricingApi';

const ManagePricing: React.FC = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<number | null>(null);

  useEffect(() => {
    getAllSections()
      .then(setSections)
      .catch(() => toast.error('Failed to load pricing'))
      .finally(() => setLoading(false));
  }, []);

  const handlePriceChange = (id: number, val: string) => {
    setSections(prev => prev.map(s => s.section_id === id ? { ...s, price_per_seat: Number(val) } : s));
  };

  const handleSave = async (id: number, price: number) => {
    setSavingId(id);
    try {
      await updateSectionPrice(id, price);
      toast.success('Price updated successfully');
    } catch {
      toast.error('Failed to update price');
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Price Management</h1>
        <p className="text-sm text-gray-500 mt-1">Update the cost per seat for each library section.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        {loading ? (
          <div className="flex justify-center py-12"><FontAwesomeIcon icon={faSpinner} spin className="text-3xl text-indigo-600" /></div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left text-xs font-bold text-gray-500 uppercase px-4 py-3">Section Name</th>
                <th className="text-left text-xs font-bold text-gray-500 uppercase px-4 py-3">Price Per Seat (MK)</th>
                <th className="text-right text-xs font-bold text-gray-500 uppercase px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sections.map(s => (
                <tr key={s.section_id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-bold text-gray-800 flex items-center gap-2">
                    <FontAwesomeIcon icon={faTags} className="text-gray-400" />
                    {s.section_name}
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      value={s.price_per_seat}
                      onChange={(e) => handlePriceChange(s.section_id, e.target.value)}
                      className="w-32 h-9 px-3 border border-gray-300 rounded-md font-bold text-gray-800 focus:border-indigo-500 outline-none"
                    />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleSave(s.section_id, s.price_per_seat)}
                      disabled={savingId === s.section_id}
                      className="inline-flex items-center gap-2 h-9 px-4 bg-indigo-600 text-white rounded-md font-bold text-sm hover:bg-indigo-700 disabled:opacity-50 transition"
                    >
                      {savingId === s.section_id ? <FontAwesomeIcon icon={faSpinner} spin /> : <FontAwesomeIcon icon={faSave} />}
                      Save
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ManagePricing;