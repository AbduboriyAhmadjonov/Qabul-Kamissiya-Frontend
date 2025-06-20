// src/components/Layout/CandidateLayout.jsx
import React from 'react';
import Navbar from '../Common/Navbar';
import Footer from '../Common/Footer';
import DashboardSidebar from '../Layout/DashboardSidebar'; // Reuse the same sidebar component

const CandidateLayout = ({ children, userRole, onLogout }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar isAuthenticated={true} userRole={userRole} onLogout={onLogout} />{' '}
      {/* Assume authenticated */}
      <div className="flex flex-grow">
        {/* Sidebar */}
        <DashboardSidebar userRole={userRole} />

        {/* Main Content Area */}
        <main className="flex-grow p-8 bg-gray-100 min-w-0">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default CandidateLayout;
