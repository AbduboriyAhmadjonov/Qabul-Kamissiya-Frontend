// src/pages/Public/HomePage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeroSection from '../../components/Public/HomePage/HeroSection.jsx';
import UniversityCard from '../../components/Common/UniversityCard.jsx';
import TestInformationSection from '../../components/Public/HomePage/TestInformationSection.jsx'; // Will create this

const HomePage = () => {
  const [pageContent, setPageContent] = useState(null);
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Home Page Content
        const pageResponse = await axios.get('/api/pages/public/home');
        setPageContent(pageResponse.data);
        // Fetch Universities for showcase
        const universitiesResponse = await axios.get('/api/universities');
        setUniversities(universitiesResponse.data.slice(0, 3)); // Show first 3 for example
        setLoading(false);
      } catch (err) {
        console.error('Error fetching home page data:', err);
        setError('Could not load page content. Please try again later.');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading content...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section - always visible */}
      <HeroSection />
      {/* Content fetched from backend API */}
      {pageContent && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
              {pageContent.title}
            </h2>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: pageContent.content }}
            />
            {/* Use 'prose' class for better typography if using `@tailwindcss/typography` plugin */}
          </div>
        </section>
      )}
      {/* University Showcase Section */}
      {universities.length > 0 && (
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
              Explore Our Universities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {universities.map((uni) => (
                <UniversityCard key={uni.id} university={uni} />
              ))}
            </div>
            <div className="text-center mt-12">
              <button
                onClick={() => (window.location.href = '/universities')} // Or use navigate
                className="px-8 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition duration-300"
              >
                View All Universities
              </button>
            </div>
          </div>
        </section>
      )}
      {/* Test Information Section */}
      <TestInformationSection /> {/* Placeholder, create this component */}
    </div>
  );
};

export default HomePage;
