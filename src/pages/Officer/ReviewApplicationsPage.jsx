// src/pages/Officer/ReviewApplicationsPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReviewApplicationsPage = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchPendingApplications = async () => {
      setLoading(true);
      setError(null);
      try {
        // API endpoint to fetch candidates pending review
        const response = await axios.get('/api/applications/pending-review', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCandidates(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch pending applications:', err);
        setError('Could not load pending applications.');
        setLoading(false);
      }
    };
    fetchPendingApplications();
  }, []);

  const handleReview = async (candidateId, status, comments = '') => {
    // Implement logic to send review decision to backend
    // e.g., POST /api/applications/:candidateId/review
    try {
      await axios.post(
        `/api/applications/${candidateId}/review`,
        {
          status,
          comments,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Refresh the list
      setCandidates(candidates.filter((c) => c.id !== candidateId));
      alert(
        `Application ${status.replace('_BY_ENLISTMENT', '').toLowerCase()}d.`
      );
    } catch (err) {
      console.error(`Failed to ${status}:`, err);
      alert(
        `Error ${status.toLowerCase()}: ${
          err.response?.data?.error || 'Please try again.'
        }`
      );
    }
  };

  if (loading)
    return <div className="text-center py-10">Loading applications...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="p-8 bg-white shadow rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Review Candidate Applications
      </h1>

      {candidates.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 rounded-lg shadow">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {candidates.map((candidate) => (
                <tr key={candidate.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {candidate.user.firstName} {candidate.user.lastName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {candidate.user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                    <span className="px-3 py-1 rounded-full text-xs bg-orange-100 text-orange-800">
                      Pending Review
                    </span>{' '}
                    {/* Hardcoded for now */}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                    <button
                      onClick={() =>
                        handleReview(candidate.id, 'APPROVED_BY_ENLISTMENT')
                      }
                      className="text-green-600 hover:text-green-800 font-medium"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => {
                        const comments = prompt('Enter rejection reason:');
                        if (comments !== null)
                          handleReview(
                            candidate.id,
                            'REJECTED_BY_ENLISTMENT',
                            comments
                          );
                      }}
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => alert('View Candidate Details TBD')}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center py-10 text-gray-600">
          No applications pending review.
        </p>
      )}
    </div>
  );
};

export default ReviewApplicationsPage;
