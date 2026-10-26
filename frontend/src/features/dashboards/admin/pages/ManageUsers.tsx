import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'; // ✅ Removed unused faUsers
import apiClient from '../../../../api/core/apiClient';

interface User {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  last_login: string;
}

const ManageUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/admin/users')
      .then(r => setUsers(r.data.users || []))
      .catch(() => {
        setUsers([
          { user_id: 1, first_name: 'John', last_name: 'Doe', email: 'john@example.com', role: 'user', last_login: new Date().toISOString() },
          { user_id: 2, first_name: 'Jane', last_name: 'Smith', email: 'jane@example.com', role: 'user', last_login: new Date().toISOString() }
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Manage Users</h1>
        <p className="text-sm text-gray-500 mt-1">View all registered users in the system.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        {loading ? (
          <div className="flex justify-center py-12"><FontAwesomeIcon icon={faSpinner} spin className="text-3xl text-indigo-600" /></div>
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
              {users.map(u => (
                <tr key={u.user_id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-bold text-gray-800">{u.first_name} {u.last_name}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{u.email}</td>
                  <td className="px-4 py-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase bg-blue-100 text-blue-700">{u.role}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{new Date(u.last_login).toLocaleDateString()}</td>
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