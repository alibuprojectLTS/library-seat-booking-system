import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faSearch } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
// Keep your existing import
import { getAllUsers, type User } from '../../../../api/admin/userApi';

const ManageUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getAllUsers()
      .then(setUsers)
      .catch(() => toast.error('Failed to load users'))
      .finally(() => setLoading(false));
  }, []);

  const filteredUsers = users.filter(u => 
    u.first_name.toLowerCase().includes(search.toLowerCase()) ||
    u.last_name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manage Users</h1>
          <p className="text-sm text-gray-500 mt-1">View all registered users in the system.</p>
        </div>
        <div className="relative">
          <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by name or email..." 
            value={search} 
            onChange={e => setSearch(e.target.value)}
            className="h-9 pl-9 pr-3 rounded-md border border-gray-200 text-sm focus:border-indigo-500 outline-none w-64"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        {loading ? (
          <div className="flex justify-center py-12"><FontAwesomeIcon icon={faSpinner} spin className="text-3xl text-indigo-600" /></div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-12 text-center text-gray-500">No users found.</div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left text-xs font-bold text-gray-500 uppercase px-4 py-3">Name</th>
                <th className="text-left text-xs font-bold text-gray-500 uppercase px-4 py-3">Email</th>
                <th className="text-left text-xs font-bold text-gray-500 uppercase px-4 py-3">Role</th>
                <th className="text-left text-xs font-bold text-gray-500 uppercase px-4 py-3">Last Login</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map(u => (
                <tr key={u.user_id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-bold text-gray-800">{u.first_name} {u.last_name}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{u.email}</td>
                  <td className="px-4 py-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase bg-indigo-100 text-indigo-700">{u.role}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{u.last_login ? new Date(u.last_login).toLocaleDateString() : 'Never'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;