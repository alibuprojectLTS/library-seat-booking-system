import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faSearch, faHistory, faUserCheck, faUserTimes } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import { getAllUsers, type User } from '../../../../api/admin/userApi';

const AuditTrail: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 15;

  useEffect(() => {
    getAllUsers()
      .then(setUsers)
      .catch(() => toast.error('Failed to load audit logs'))
      .finally(() => setLoading(false));
  }, []);

  const filteredUsers = users.filter(u => {
    const searchStr = search.toLowerCase();
    return (
      u.first_name.toLowerCase().includes(searchStr) ||
      u.last_name.toLowerCase().includes(searchStr) ||
      u.email.toLowerCase().includes(searchStr) ||
      u.role.toLowerCase().includes(searchStr)
    );
  });

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  const paginated = filteredUsers.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-wrap justify-between items-center gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FontAwesomeIcon icon={faHistory} className="text-indigo-600" />
            User Audit Trail
          </h1>
          <p className="text-sm text-gray-500 mt-1">Track user login activity and account status.</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="relative flex-1 min-w-[250px]">
          <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by name, email, or role..." 
            value={search} 
            onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
            className="w-full h-10 pl-9 pr-3 rounded-md border border-gray-200 text-sm focus:border-indigo-500 outline-none"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-12"><FontAwesomeIcon icon={faSpinner} spin className="text-3xl text-indigo-600" /></div>
        ) : paginated.length === 0 ? (
          <div className="p-12 text-center text-gray-500">No audit records found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left text-xs font-bold text-gray-500 uppercase px-4 py-3">User</th>
                  <th className="text-left text-xs font-bold text-gray-500 uppercase px-4 py-3">Role</th>
                  <th className="text-left text-xs font-bold text-gray-500 uppercase px-4 py-3">Account Status</th>
                  <th className="text-left text-xs font-bold text-gray-500 uppercase px-4 py-3">Last Login</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginated.map(u => (
                  <tr key={u.user_id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">
                      <p className="font-bold text-gray-800">{u.first_name} {u.last_name}</p>
                      <p className="text-xs text-gray-500">{u.email}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
                        u.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                        u.role === 'staff' ? 'bg-emerald-100 text-emerald-700' :
                        u.role === 'finance' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>{u.role}</span>
                    </td>
                    <td className="px-4 py-3">
                      {u.is_active !== false ? (
                        <span className="text-emerald-600 font-bold text-sm flex items-center gap-1">
                          <FontAwesomeIcon icon={faUserCheck} /> Active
                        </span>
                      ) : (
                        <span className="text-red-600 font-bold text-sm flex items-center gap-1">
                          <FontAwesomeIcon icon={faUserTimes} /> Inactive
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {u.last_login ? new Date(u.last_login).toLocaleString('en-US', {
                        day: 'numeric', month: 'short', year: 'numeric',
                        hour: '2-digit', minute: '2-digit'
                      }) : 'Never logged in'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {totalPages > 1 && (
          <div className="p-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-sm text-gray-500">
              Showing {(currentPage - 1) * rowsPerPage + 1} to {Math.min(currentPage * rowsPerPage, filteredUsers.length)} of {filteredUsers.length} records
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
    </div>
  );
};

export default AuditTrail;