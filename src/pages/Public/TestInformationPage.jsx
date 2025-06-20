// src/pages/Public/TestInformationPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming test info might be fetched, or hardcoded like before
import { Link } from 'react-router-dom'; // For anchor links

const TestInformationPage = () => {
  // If test info is managed by backend (e.g., using a Page model with slug 'tests')
  const [pageContent, setPageContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestInfo = async () => {
      try {
        // Attempt to fetch content from a 'tests' page if it exists
        const response = await axios.get('/api/pages/public/tests');
        setPageContent(response.data);
        setLoading(false);
      } catch (err) {
        // If '/api/pages/public/tests' fails, fall back to static content (or show error)
        console.warn(
          'Could not fetch /api/pages/public/tests. Falling back to static content.'
        );
        setError('Failed to fetch dynamic test information.'); // Keep track of warning/error
        setLoading(false);
      }
    };
    fetchTestInfo();
  }, []);

  // Static content if API fails or no 'tests' page is set up
  const staticTestInfo = {
    title: 'Comprehensive Admissions Testing',
    sections: [
      {
        id: 'physical',
        title: 'Physical Fitness Test',
        icon: '🏃‍♂️',
        description:
          'Our physical fitness test evaluates your stamina, strength, and agility. It includes a series of timed runs, strength exercises, and flexibility assessments. Proper training is essential for success.',
        preparation:
          'Start a regular exercise routine focusing on cardiovascular health and strength. Consult with a fitness trainer if possible.',
      },
      {
        id: 'written',
        title: 'Written Examinations',
        icon: '📚',
        description:
          'These tests assess your aptitude and knowledge in key areas such as Mathematics, General Knowledge, and English proficiency. The format may include multiple-choice questions and short essay responses.',
        preparation:
          'Review foundational mathematics concepts, stay updated on current events and national affairs, and practice your writing skills.',
      },
      {
        id: 'interview',
        title: 'Personal Interview',
        icon: '🗣️',
        description:
          'The interview panel assesses your motivation, character, communication skills, leadership potential, and your understanding of military service. Be prepared to articulate your aspirations and values.',
        preparation:
          "Research the military's mission and values. Practice answering common interview questions and be ready to speak about your strengths and why you want to serve.",
      },
      {
        id: 'medical',
        title: 'Medical Examination',
        icon: '⚕️',
        description:
          'A thorough medical examination ensures you meet the health and fitness standards required for military service. This includes vision, hearing, general health, and psychological assessments.',
        preparation:
          'Maintain a healthy lifestyle. If you have any pre-existing conditions, ensure you have all relevant medical documentation.',
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-16">
      {loading && (
        <div className="text-center py-20">Loading test information...</div>
      )}
      {error && !pageContent && (
        <div className="text-center py-20 text-red-500">
          {error} Please see general information below.
        </div>
      )}
      {pageContent ? (
        // Display content from backend
        <div
          className="prose max-w-none mb-16"
          dangerouslySetInnerHTML={{ __html: pageContent.content }}
        />
      ) : (
        // Display static content
        <>
          <h1 className="text-5xl font-bold text-center mb-16 text-gray-800">
            {staticTestInfo.title}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {staticTestInfo.sections.map((section) => (
              <div
                key={section.id}
                className="text-center p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-xl transition duration-300 flex flex-col"
              >
                <div className="text-5xl mb-4">{section.icon}</div>
                <h3 className="text-2xl font-semibold mb-3 text-gray-800">
                  {section.title}
                </h3>
                <p className="text-gray-700 mb-6 flex-grow">
                  {section.description}
                </p>
                <p className="text-gray-600 font-semibold text-sm mt-auto">
                  Preparation: {section.preparation}
                </p>
                <Link
                  to={`#${section.id}`} // Anchor link to jump to section if on same page
                  className="text-blue-500 hover:underline font-semibold mt-4"
                >
                  Read More
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
      {/* Anchor targets for scrolling */}
      <div id="physical" className="pt-20 -mt-20 invisible"></div>{' '}
      {/* Invisible anchor points */}
      <div id="written" className="pt-20 -mt-20 invisible"></div>
      <div id="interview" className="pt-20 -mt-20 invisible"></div>
      <div id="medical" className="pt-20 -mt-20 invisible"></div>
    </div>
  );
};

export default TestInformationPage;
