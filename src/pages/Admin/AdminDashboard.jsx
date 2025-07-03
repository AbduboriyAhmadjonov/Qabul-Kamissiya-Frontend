// // src/pages/Admin/AdminDashboard.jsx
// import React from 'react';

// const AdminDashboard = () => {
//   return (
//     <div className="p-8 bg-white shadow rounded-lg">
//       <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>
//       <p className="text-lg text-gray-700 mb-4">
//         Welcome to the administration panel. Manage users, content, and system
//         settings.
//       </p>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         {/* Total Candidates */}
//         <div className="bg-blue-100 p-6 rounded-lg shadow text-center">
//           <h3 className="text-xl font-semibold text-blue-800 mb-2">
//             Total Candidates
//           </h3>
//           <p className="text-3xl font-bold text-blue-700">1,234</p>
//         </div>
//         {/* Active Officers */}
//         <div className="bg-green-100 p-6 rounded-lg shadow text-center">
//           <h3 className="text-xl font-semibold text-green-800 mb-2">
//             Active Officers
//           </h3>
//           <p className="text-3xl font-bold text-green-700">15</p>
//         </div>
//         {/* Published Pages */}
//         <div className="bg-purple-100 p-6 rounded-lg shadow text-center">
//           <h3 className="text-xl font-semibold text-purple-800 mb-2">
//             Published Pages
//           </h3>
//           <p className="text-3xl font-bold text-purple-700">5</p>
//         </div>
//       </div>

//       <div className="mt-8">
//         <h2 className="text-2xl font-semibold mb-4 text-gray-800">
//           Quick Links:
//         </h2>
//         <div className="flex flex-wrap gap-4">
//           <button className="px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
//             Manage Candidates
//           </button>
//           <button className="px-5 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
//             Manage Site Pages
//           </button>
//           <button className="px-5 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition">
//             Manage Universities
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const token = localStorage.getItem('token');
  const [stats, setStats] = useState({ candidates: 0, officers: 0, pages: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const [cRes, oRes, pRes] = await Promise.all([
          axios.get('/api/candidates/count', { headers }),
          axios.get('/api/users/count?role=ENLISTMENT_OFFICER', { headers }),
          axios.get('/api/pages/count?published=true', { headers }),
        ]);
        setStats({
          candidates: cRes.data.count ?? cRes.data,
          officers: oRes.data.count ?? oRes.data,
          pages: pRes.data.count ?? pRes.data,
        });
      } catch (err) {
        console.error('Failed to fetch admin stats:', err);
        setError('Could not load dashboard info.');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);
  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="p-8 bg-white shadow rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>
      <p className="text-lg text-gray-700 mb-4">
        Welcome to the administration panel. Manage users, content, and system
        settings.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Candidates */}
        <div className="bg-blue-100 p-6 rounded-lg shadow text-center">
          <h3 className="text-xl font-semibold text-blue-800 mb-2">
            Total Candidates
          </h3>
          <p className="text-3xl font-bold text-blue-700">{stats.candidates}</p>
        </div>
        {/* Active Officers */}
        <div className="bg-green-100 p-6 rounded-lg shadow text-center">
          <h3 className="text-xl font-semibold text-green-800 mb-2">
            Active Officers
          </h3>
          <p className="text-3xl font-bold text-green-700">{stats.officers}</p>
        </div>
        {/* Published Pages */}
        <div className="bg-purple-100 p-6 rounded-lg shadow text-center">
          <h3 className="text-xl font-semibold text-purple-800 mb-2">
            Published Pages
          </h3>
          <p className="text-3xl font-bold text-purple-700">{stats.pages}</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Quick Links:
        </h2>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/admin/candidates"
            className="px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Manage Candidates
          </Link>
          <Link
            to="/admin/pages"
            className="px-5 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Manage Site Pages
          </Link>
          <button className="px-5 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition">
            Manage Universities
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
