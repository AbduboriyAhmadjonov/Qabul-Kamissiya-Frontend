// src/pages/Officer/OfficerDashboard.jsx
import React from 'react';

const OfficerDashboard = () => {
  return (
    <div className="p-8 bg-white shadow rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Enlistment Officer Dashboard
      </h1>
      <p className="text-lg text-gray-700 mb-4">
        Welcome! Your portal to review candidate applications.
      </p>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-100 p-6 rounded-lg shadow text-center">
          <h3 className="text-xl font-semibold text-blue-800 mb-2">
            Pending Reviews
          </h3>
          <p className="text-3xl font-bold text-blue-700">25</p>
        </div>
        <div className="bg-green-100 p-6 rounded-lg shadow text-center">
          <h3 className="text-xl font-semibold text-green-800 mb-2">
            Approved Today
          </h3>
          <p className="text-3xl font-bold text-green-700">5</p>
        </div>
        <div className="bg-red-100 p-6 rounded-lg shadow text-center">
          <h3 className="text-xl font-semibold text-red-800 mb-2">
            Rejected Today
          </h3>
          <p className="text-3xl font-bold text-red-700">2</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex justify-center space-x-4">
        <button className="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition">
          View All Pending Applications
        </button>
        <button className="px-6 py-3 bg-gray-500 text-white font-bold rounded-lg hover:bg-gray-600 transition">
          View Candidate Search
        </button>
      </div>
    </div>
  );
};

export default OfficerDashboard;
