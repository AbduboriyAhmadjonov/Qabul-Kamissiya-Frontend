// src/components/Public/HomePage/HeroSection.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const HeroSection = () => {
  const navigate = useNavigate(); // Get navigate function

  return (
    <section
      className="relative h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/hero-background.jpg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex items-center justify-center h-full text-white text-center px-4">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-fade-in-down">
            Forge Your Future. Serve Your Nation.
          </h1>
          <p className="text-xl md:text-2xl mb-8 animate-fade-in-up">
            Your gateway to becoming a proud member of our Military
            Universities.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => navigate('/register')} // Use navigate
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition duration-300 animate-fade-in-left"
            >
              Apply Now
            </button>
            <button
              onClick={() => navigate('/universities')} // Use navigate
              className="px-8 py-3 bg-transparent border-2 border-white hover:bg-white hover:text-black text-white font-bold rounded-lg transition duration-300 animate-fade-in-right"
            >
              Explore Universities
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
