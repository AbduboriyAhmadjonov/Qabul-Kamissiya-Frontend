// src/pages/Candidate/CandidateProfilePage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // To fetch profile data

const CandidateProfilePage = ({ userId }) => {
  // Assuming userId is passed or available from context
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        // Assuming you have an API endpoint like /api/candidates/:userId
        // Or if user data is attached to auth, you might fetch it differently
        const token = localStorage.getItem('token');
        const loggedInUserId = localStorage.getItem('userId'); // Get from localStorage

        if (!loggedInUserId) {
          throw new Error('User not logged in.');
        }

        const response = await axios.get(`/api/candidates/${loggedInUserId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(response.data); // Assuming response.data contains the candidate and user details
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
        setError('Could not load your profile.');
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading)
    return <div className="text-center py-10">Loading profile...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!profile)
    return <div className="text-center py-10">Profile data not available.</div>;

  return (
    <div className="p-8 bg-white shadow rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-3 text-gray-700">
            Personal Information
          </h3>
          <p className="mb-2">
            <strong>Name:</strong> {profile.user.firstName}{' '}
            {profile.user.lastName}
          </p>
          <p className="mb-2">
            <strong>Email:</strong> {profile.user.email}
          </p>
          <p className="mb-2">
            <strong>Phone:</strong> {profile.user.phoneNumber || 'N/A'}
          </p>
          <p className="mb-2">
            <strong>Date of Birth:</strong>{' '}
            {new Date(profile.dateOfBirth).toLocaleDateString()}
          </p>
          <p className="mb-2">
            <strong>Address:</strong> {profile.address}
          </p>
          {/* Add more fields as needed */}
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-3 text-gray-700">
            Application Details
          </h3>
          <p className="mb-2">
            <strong>Application Status:</strong>{' '}
            <span
              className={`font-bold ${
                profile.applicationStatus === 'APPROVED_BY_ENLISTMENT'
                  ? 'text-green-600'
                  : profile.applicationStatus === 'REJECTED_BY_ENLISTMENT'
                  ? 'text-red-600'
                  : 'text-orange-600'
              }`}
            >
              {profile.applicationStatus}
            </span>
          </p>
          <p className="mb-2">
            <strong>Military ID:</strong> {profile.militaryID || 'Pending'}
          </p>
          {/* Add links to documents/exams */}
        </div>
      </div>

      {/* Add Edit Profile Button/Form later */}
      <button className="mt-8 px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
        Edit Profile
      </button>
    </div>
  );
};

export default CandidateProfilePage;
