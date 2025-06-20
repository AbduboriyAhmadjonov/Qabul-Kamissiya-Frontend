// src/pages/Public/UniversityInfoPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UniversityCard from '../../components/Common/UniversityCard';
import { useParams } from 'react-router-dom'; // To get slug from URL

const UniversityInfoPage = () => {
  const { slug } = useParams(); // Get the university slug from the URL
  const [university, setUniversity] = useState(null);
  const [allUniversities, setAllUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        if (slug) {
          // Fetch a specific university by slug
          const response = await axios.get(`/api/universities/${slug}`);
          setUniversity(response.data);
        } else {
          // Fetch all universities if no slug is provided
          const response = await axios.get('/api/universities');
          setAllUniversities(response.data);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching university data:', err);
        setError('Failed to load university information.');
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]); // Re-fetch if slug changes

  if (loading) {
    return (
      <div className="text-center py-20">Loading university details...</div>
    );
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {slug ? (
        // Display single university details
        university ? (
          <div>
            <h1 className="text-5xl font-bold text-center mb-8 text-gray-800">
              {university.name}
            </h1>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3 flex justify-center">
                <img
                  src={university.logoUrl || '/images/placeholder-logo.png'}
                  alt={`${university.name} Logo`}
                  className="w-48 h-48 md:w-64 md:h-64 object-contain rounded-lg shadow-lg"
                />
              </div>
              <div className="md:w-2/3">
                <p className="text-lg text-gray-700 mb-4">
                  {university.description}
                </p>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                  Specializations:
                </h3>
                <ul className="list-disc list-inside text-gray-700 mb-4">
                  {university.specializations.split(',').map((spec, index) => (
                    <li key={index}>{spec.trim()}</li>
                  ))}
                </ul>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                  Admission Requirements:
                </h3>
                <p className="text-gray-700 mb-4">
                  {university.admissionRequirements ||
                    'Details available upon request.'}
                </p>
                {/* Add more details here */}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">University not found.</div>
        )
      ) : (
        // Display list of all universities
        <div>
          <h1 className="text-5xl font-bold text-center mb-12 text-gray-800">
            Our Military Universities
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allUniversities.map((uni) => (
              <UniversityCard key={uni.id} university={uni} />
            ))}
          </div>
          {allUniversities.length === 0 && (
            <p className="text-center py-10">
              No universities available at the moment.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default UniversityInfoPage;
