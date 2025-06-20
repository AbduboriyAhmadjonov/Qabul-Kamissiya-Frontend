// src/components/Layout/AdminLayout.jsx
import React from 'react';
import Navbar from '../Common/Navbar';
import Footer from '../Common/Footer';
import DashboardSidebar from '../Layout/DashboardSidebar'; // We'll create this for role-specific sidebars

const AdminLayout = ({ children, userRole, onLogout }) => {
  // You can pass the role to DashboardSidebar to render appropriate links
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar isAuthenticated={true} userRole={userRole} onLogout={onLogout} />{' '}
      {/* Assume authenticated if in layout */}
      <div className="flex flex-grow">
        {/* Sidebar */}
        <DashboardSidebar userRole={userRole} />

        {/* Main Content Area */}
        <main className="flex-grow p-8 bg-gray-100 min-w-0">
          {' '}
          {/* min-w-0 is important for flex items */}
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLayout;
