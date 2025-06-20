// src/components/Public/HomePage/TestInformationSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const TestInformationSection = () => {
  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Understanding the Admissions Tests
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Test 1: Physical Fitness */}
          <div className="text-center p-6 bg-gray-800 rounded-lg shadow-lg">
            <div className="text-5xl text-blue-400 mb-4">🏃‍♂️</div>
            <h3 className="text-2xl font-semibold mb-3">Physical Fitness</h3>
            <p className="text-gray-300 mb-6">
              Assess your endurance, strength, and agility. Prepare to meet our
              rigorous standards.
            </p>
            <Link
              to="/tests#physical"
              className="text-blue-400 hover:underline font-semibold"
            >
              Learn More
            </Link>
          </div>
          {/* Test 2: Written Exams */}
          <div className="text-center p-6 bg-gray-800 rounded-lg shadow-lg">
            <div className="text-5xl text-green-400 mb-4">📚</div>
            <h3 className="text-2xl font-semibold mb-3">Written Exams</h3>
            <p className="text-gray-300 mb-6">
              Test your knowledge in mathematics, general science, and current
              affairs.
            </p>
            <Link
              to="/tests#written"
              className="text-green-400 hover:underline font-semibold"
            >
              Learn More
            </Link>
          </div>
          {/* Test 3: Interview */}
          <div className="text-center p-6 bg-gray-800 rounded-lg shadow-lg">
            <div className="text-5xl text-yellow-400 mb-4">🗣️</div>
            <h3 className="text-2xl font-semibold mb-3">Interview</h3>
            <p className="text-gray-300 mb-6">
              Demonstrate your motivation, character, and suitability for
              military service.
            </p>
            <Link
              to="/tests#interview"
              className="text-yellow-400 hover:underline font-semibold"
            >
              Learn More
            </Link>
          </div>
        </div>
        <div className="text-center mt-16">
          <Link
            to="/tests"
            className="px-8 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition duration-300"
          >
            View All Test Details
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TestInformationSection;
