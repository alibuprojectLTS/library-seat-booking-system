import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../../../auth/AuthContext';

const UserProfile: React.FC = () => {
  const { user } = useAuth();

  const blocks = [
    { icon: faUser, label: 'Full Name', value: `${user?.first_name} ${user?.last_name}`, bg: 'bg-indigo-50', color: 'text-indigo-600' },
    { icon: faEnvelope, label: 'Email', value: user?.email, bg: 'bg-purple-50', color: 'text-purple-600' },
    { icon: faPhone, label: 'Phone', value: 'Not set', bg: 'bg-emerald-50', color: 'text-emerald-600' },
    { icon: faShieldAlt, label: 'Role', value: user?.role, bg: 'bg-amber-50', color: 'text-amber-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Page Title */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
          <p className="text-sm text-gray-500 mt-1">Your account information</p>
        </div>

        <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
          {/* Header Banner */}
          <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 p-8 text-white">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-full bg-white/15 flex items-center justify-center text-3xl font-bold border-4 border-white/30">
                {user?.first_name?.[0]?.toUpperCase() || 'U'}
              </div>
              <div>
                <h2 className="text-2xl font-bold">
                  {user?.first_name} {user?.last_name}
                </h2>
                <p className="text-indigo-100 mt-1 font-medium capitalize text-base">
                  {user?.role}
                </p>
              </div>
            </div>
          </div>

          {/* Info Grid */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {blocks.map((b) => (
              <div key={b.label} className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${b.bg} ${b.color}`}>
                  <FontAwesomeIcon icon={b.icon} className="text-lg" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                    {b.label}
                  </p>
                  <p className="text-base font-bold text-gray-800 mt-1">
                    {b.value || '—'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;