import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CandidateDashboard from './dashboards/CandidateDashboard';
import VoenkomatDashboard from './dashboards/VoenkomatDashboard';
import UniversityDashboard from './dashboards/UniversityDashboard';
import AdminDashboard from './dashboards/AdminDashboard';

function Authentification() {
  const [currentPage, setCurrentPage] = useState('login');

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage onNavigate={setCurrentPage} />;
      case 'register':
        return <RegisterPage onNavigate={setCurrentPage} />;
      case 'candidate':
        return <CandidateDashboard onNavigate={setCurrentPage} />;
      case 'voenkomat':
        return <VoenkomatDashboard onNavigate={setCurrentPage} />;
      case 'university':
        return <UniversityDashboard onNavigate={setCurrentPage} />;
      case 'admin':
        return <AdminDashboard onNavigate={setCurrentPage} />;
      default:
        return <LoginPage onNavigate={setCurrentPage} />;
    }
  };

  return <AuthProvider>{renderPage()}</AuthProvider>;
}

export default Authentification;
