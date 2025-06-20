// src/components/Common/Footer.jsx
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-800 text-white p-8 mt-auto">
      <div className="container mx-auto text-center">
        <div className="flex justify-center space-x-6 mb-4">
          <a href="/about" className="hover:text-gray-300 transition">
            About Us
          </a>
          <a href="/contact" className="hover:text-gray-300 transition">
            Contact
          </a>
          <a href="/privacy" className="hover:text-gray-300 transition">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:text-gray-300 transition">
            Terms of Service
          </a>
        </div>
        <p>
          &copy; {currentYear} Military University Admissions Portal. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
