// src/pages/Candidate/CandidateExamsPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CandidateExamsPage = () => {
  const [examResults, setExamResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchExams = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`/api/candidates/${userId}/exams`, {
          // API endpoint to get candidate's exam results
          headers: { Authorization: `Bearer ${token}` },
        });
        setExamResults(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch exam results:', err);
        setError('Could not load your exam results.');
        setLoading(false);
      }
    };
    if (userId) fetchExams();
    else {
      setError('User ID not found. Please log in.');
      setLoading(false);
    }
  }, [userId]);

  if (loading)
    return <div className="text-center py-10">Loading exam results...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="p-8 bg-white shadow rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Exam Results</h1>

      {examResults.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 rounded-lg shadow">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Exam Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Score
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
                  Exam Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {examResults.map((result) => (
                <tr key={result.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {result.examName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {result.score !== null ? `${result.score}` : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        result.status === 'PASSED'
                          ? 'bg-green-100 text-green-800'
                          : result.status === 'FAILED'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {result.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {result.examDate
                      ? new Date(result.examDate).toLocaleDateString()
                      : 'Not scheduled'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center py-10 text-gray-600">
          No exam results available yet.
        </p>
      )}
    </div>
  );
};

export default CandidateExamsPage;
