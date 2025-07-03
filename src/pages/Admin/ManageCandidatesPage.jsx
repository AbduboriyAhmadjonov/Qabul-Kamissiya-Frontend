import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageCandidatesPage = () => {
  const token = localStorage.getItem('token');
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  const headers = { Authorization: `Bearer ${token}` };

  const fetchCandidates = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/candidates', { headers });
      setCandidates(res.data);
    } catch (err) {
      console.error('Failed to fetch candidates:', err);
      setError('Could not load candidates.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete candidate?')) return;
    try {
      await axios.delete(`/api/candidates/${id}`, { headers });
      setCandidates(candidates.filter((c) => c.id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Failed to delete candidate');
    }
  };

  const filtered = candidates.filter((c) =>
    `${c.user.firstName} ${c.user.lastName}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="p-8 bg-white shadow rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Manage Candidates
      </h1>

      <div className="mb-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="border px-3 py-1 rounded w-full md:w-1/3"
        />
      </div>

      {filtered.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filtered.map((c) => (
                <tr key={c.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {c.user.firstName} {c.user.lastName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {c.user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right space-x-2">
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No candidates found.</p>
      )}
    </div>
  );
};

export default ManageCandidatesPage;
