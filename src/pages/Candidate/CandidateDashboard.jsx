import React, { useEffect, useState } from 'react';
import axios from 'axios';

const getNextExam = (exams = []) => {
  if (exams.length === 0) return null;
  return exams[0];
};

const CandidateDashboard = () => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  const [status, setStatus] = useState('');
  const [docCount, setDocCount] = useState(0);
  const [nextExam, setNextExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const headers = { Authorization: `Bearer ${token}` };
        // const [profileRes, docsRes, examsRes] = await Promise.all([
        //   axios.get(`/api/candidates/${userId}`, { headers }),
        //   axios.get(`/api/candidates/${userId}/documents`, { headers }),
        //   axios.get(`/api/candidates/${userId}/exams`, { headers }),
        // ]);

        // setStatus(profileRes.data.applicationStatus);
        // setDocCount(docsRes.data.length || 0);
        // setNextExam(getNextExam(examsRes.data));
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
        setError('Could not load dashboard information.');
      } finally {
        setLoading(false);
      }
    };
    if (userId) fetchData();
  }, [userId]);

  if (loading)
    return <div className="text-center py-10">Loading dashboard...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="p-8 bg-white shadow rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Candidate Dashboard
      </h1>
      <p className="text-lg text-gray-700 mb-4">
        Welcome! Here you can track your application progress.
      </p>

      {/* Example Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Application Status Card */}
        <div className="bg-blue-100 p-6 rounded-lg shadow text-center">
          <h3 className="text-xl font-semibold text-blue-800 mb-2">
            Application Status
          </h3>
          <p className="text-2xl font-bold text-blue-700">Pending Review</p>
        </div>

        {/* My Documents Card */}
        <div className="bg-green-100 p-6 rounded-lg shadow text-center">
          <h3 className="text-xl font-semibold text-green-800 mb-2">
            Documents Submitted
          </h3>
          <p className="text-2xl font-bold text-green-700">3 of 4</p>
        </div>

        {/* Exam Results Card */}
        <div className="bg-yellow-100 p-6 rounded-lg shadow text-center">
          <h3 className="text-xl font-semibold text-yellow-800 mb-2">
            Next Exam
          </h3>
          <p className="text-lg font-bold text-yellow-700">Physical Fitness</p>
          <p className="text-sm text-yellow-600">Scheduled: 2024-08-15</p>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Your Application Journey:
        </h2>
        <div className="border-l-4 border-blue-500 pl-4 py-2 mb-4">
          <p className="font-semibold text-gray-800">Registration Complete</p>
          <p className="text-sm text-gray-600">Status: Completed</p>
        </div>
        <div className="border-l-4 border-gray-300 pl-4 py-2 mb-4">
          <p className="font-semibold text-gray-800">
            Enlistment Officer Review
          </p>
          <p className="text-sm text-gray-600">Status: Pending</p>
        </div>
        <div className="border-l-4 border-gray-300 pl-4 py-2 mb-4">
          <p className="font-semibold text-gray-800">Exams</p>
          <p className="text-sm text-gray-600">Status: Not Started</p>
        </div>
        <div className="border-l-4 border-gray-300 pl-4 py-2">
          <p className="font-semibold text-gray-800">
            Final Admission Decision
          </p>
          <p className="text-sm text-gray-600">Status: Not Started</p>
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;
