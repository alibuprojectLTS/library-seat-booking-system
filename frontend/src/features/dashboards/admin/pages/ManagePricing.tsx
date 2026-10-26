import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTags } from '@fortawesome/free-solid-svg-icons';

const ManagePricing: React.FC = () => {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Price Management</h1>
        <p className="text-sm text-gray-500 mt-1">Update ticket prices per section.</p>
      </div>

      <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-100 text-center">
        <FontAwesomeIcon icon={faTags} className="text-5xl text-gray-300 mb-4" />
        <h3 className="text-lg font-bold text-gray-800">Pricing Configuration</h3>
        <p className="text-gray-500 mt-2 max-w-md mx-auto">
          This feature allows the administrator to adjust the cost of a seat per section. 
          (Backend endpoint pending).
        </p>
      </div>
    </div>
  );
};

export default ManagePricing;