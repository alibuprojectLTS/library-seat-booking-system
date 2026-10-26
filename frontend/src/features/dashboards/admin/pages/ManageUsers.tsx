import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSpinner, faSearch, faUserSlash, faExclamationTriangle, 
  faTimes, faFilter, faChevronDown 
} from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import { getAllUsers, type User } from '../../../../api/admin/userApi';
import apiClient from '../../../../api/core/apiClient';

const ManageUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  
  // ✅ Search, Filter & Pagination State
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // ✅ Modal State
  const [showInactiveModal, setShowInactiveModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch {
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleDeleteInactive = async () => {
    setDeleting(true);
    try {
      await apiClient.delete('/admin/users/inactive');
      toast.success('Inactive users deactivated successfully');
      setShowInactiveModal(false);
      fetchUsers();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to deactivate users');
    } finally {
      setDeleting(false);
    }
  };

  // ✅ Filter Logic
  const filteredUsers = users.filter(u => {
    const searchStr = search.toLowerCase();
    const matchesSearch = 
      u.first_name.toLowerCase().includes(searchStr) ||
      u.last_name.toLowerCase().includes(searchStr) ||
      u.email.toLowerCase().includes(searchStr);

    if (!matchesSearch) return false;

    if (roleFilter !== 'all' && u.role !== roleFilter) return false;

    return true;
  });

  // ✅ Pagination Logic
  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  const paginated = filteredUsers.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manage Users</h1>
          <p className="text-sm text-gray-500 mt-1">View all registered users in the system.</p>
        </div>
        
        <button 
          onClick={() => setShowInactiveModal(true)}
          className="h-10 px-4 bg-red-50 text-red-600 border border-red-200 rounded-md font-bold text-sm hover:bg-red-100 transition flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faUserSlash} /> Deactivate Inactive (7+ Days)
        </button>
      </div>

      {/* ✅ Search & Filter Toolbar */}
      <div className="flex flex-wrap items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="relative flex-1 min-w-[250px]">
          <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by name or email..." 
            value={search} 
            onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
            className="w-full h-10 pl-9 pr-3 rounded-md border border-gray-200 text-sm focus:border-indigo-500 outline-none"
          />
        </div>
        
        <div className="relative min-w-[200px]">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FontAwesomeIcon icon={faFilter} className="text-gray-400" />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => { setRoleFilter(e.target.value); setCurrentPage(1); }}
            className="w-full h-10 pl-10 pr-8 rounded-md border border-gray-200 text-sm font-semibold text-gray-700 focus:border-indigo-500 outline-none appearance-none bg-white cursor-pointer"
          >
            <option value="all">All Roles</option>
            <option value="user">Users</option>
            <option value="staff">Library Staff</option>
            <option value="finance">Financial Officer</option>
            <option value="admin">Administrator</option>
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <FontAwesomeIcon icon={faChevronDown} className="text-gray-400 text-xs" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-12"><FontAwesomeIcon icon={faSpinner} spin className="text-3xl text-indigo-600" /></div>
        ) : paginated.length === 0 ? (
          <div className="p-12 text-center text-gray-500">No users found matching your filters.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left text-xs font-bold text-gray-500 uppercase px-4 py-3">Name</th>
                  <th className="text-left text-xs font-bold text-gray-500 uppercase px-4 py-3">Email</th>
                  <th className="text-left text-xs font-bold text-gray-500 uppercase px-4 py-3">Role</th>
                  <th className="text-left text-xs font-bold text-gray-500 uppercase px-4 py-3">Status</th>
                  <th className="text-left text-xs font-bold text-gray-500 uppercase px-4 py-3">Last Login</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginated.map(u => (
                  <tr key={u.user_id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-bold text-gray-800">{u.first_name} {u.last_name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{u.email}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
                        u.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                        u.role === 'staff' ? 'bg-emerald-100 text-emerald-700' :
                        u.role === 'finance' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>{u.role}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase bg-emerald-100 text-emerald-700">Active</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{u.last_login ? new Date(u.last_login).toLocaleDateString() : 'Never'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {/* ✅ Pagination Controls */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-sm text-gray-500">
              Showing {(currentPage - 1) * rowsPerPage + 1} to {Math.min(currentPage * rowsPerPage, filteredUsers.length)} of {filteredUsers.length} users
            </span>
            <div className="flex items-center gap-2">
              <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-3 py-1 rounded-md border border-gray-200 hover:bg-gray-50 disabled:opacity-50 text-sm font-bold text-gray-600">
                Previous
              </button>
              <span className="text-sm font-bold text-gray-700">Page {currentPage} of {totalPages}</span>
              <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-3 py-1 rounded-md border border-gray-200 hover:bg-gray-50 disabled:opacity-50 text-sm font-bold text-gray-600">
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ✅ Deactivate Inactive Users Modal */}
      {showInactiveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => !deleting && setShowInactiveModal(false)} />
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
            <button onClick={() => !deleting && setShowInactiveModal(false)} disabled={deleting} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition">
              <FontAwesomeIcon icon={faTimes} className="text-lg" />
            </button>
            <div className="pt-8 pb-4 flex justify-center">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-600 text-2xl" />
              </div>
            </div>
            <div className="px-6 pb-6 text-center">
              <h3 className="text-xl font-extrabold text-gray-900">Deactivate Inactive Users?</h3>
              <p className="text-sm text-gray-600 mt-3 leading-relaxed font-medium">
                This will deactivate all users who have not logged in for the past 7 days. They will no longer be able to log in.
              </p>
              <div className="mt-6 flex gap-3">
                <button onClick={() => setShowInactiveModal(false)} disabled={deleting} className="flex-1 px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-700 font-bold text-base hover:bg-gray-50 transition disabled:opacity-50">
                  Cancel
                </button>
                <button onClick={handleDeleteInactive} disabled={deleting} className="flex-1 px-4 py-3 rounded-lg font-bold text-base text-white bg-red-500 hover:bg-red-600 shadow-md transition inline-flex items-center justify-center gap-2 disabled:opacity-50">
                  {deleting ? <><FontAwesomeIcon icon={faSpinner} spin /> Deactivating...</> : 'Yes, Deactivate'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;