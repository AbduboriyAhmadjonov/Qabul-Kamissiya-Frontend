// src/components/Layout/MainLayout.jsx
import React from 'react';
import Navbar from '../Common/Navbar';
import Footer from '../Common/Footer'; // We'll create this next

const MainLayout = ({ children, isAuthenticated, userRole, onLogout }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar
        isAuthenticated={isAuthenticated}
        userRole={userRole}
        onLogout={onLogout}
      />
      <main className="flex-grow container mx-auto p-4">
        {children} {/* This is where the page content will be rendered */}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
