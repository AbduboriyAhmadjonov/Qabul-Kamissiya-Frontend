import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import axios from 'axios'; // For API calls

import HeroSection from './components/Public/HomePage/HeroSection.jsx';
// Public Components
import HomePage from './pages/Public/HomePage.jsx';
import UniversityInfoPage from './pages/Public/UniversityInfoPage.jsx';
import TestInformationPage from './pages/Public/TestInformationPage.jsx';
import LoginPage from './pages/Public/LoginPage.jsx';
import RegistrationPage from './pages/Public/RegistrationPage.jsx';

// Layouts
import MainLayout from './components/Layout/MainLayout.jsx';
import AdminLayout from './components/Layout/AdminLayout.jsx'; // Create this for Admin/Officer dashboards
import CandidateLayout from './components/Layout/CandidateLayout.jsx'; // Create this for Candidate dashboard

// Protected Route Helper
import ProtectedRoute from './components/Auth/ProtectedRoute.jsx';

// Pages for Dashboards (You'll create these next)
// Admin
import AdminDashboard from './pages/Admin/AdminDashboard.jsx';
import ManageCandidatesPage from './pages/Admin/ManageCandidatesPage.jsx';
import ManageSitePagesPage from './pages/Admin/ManageSitePagesPage.jsx';
// ... other admin pages

// Officer
import OfficerDashboard from './pages/Officer/OfficerDashboard.jsx';
import ReviewApplicationsPage from './pages/Officer/ReviewApplicationsPage.jsx';
// ... other officer pages

// Candidate
import CandidateDashboard from './pages/Candidate/CandidateDashboard.jsx';
import CandidateProfilePage from './pages/Candidate/CandidateProfilePage.jsx';
import CandidateDocumentsPage from './pages/Candidate/CandidateDocumentsPage.jsx';
import CandidateExamsPage from './pages/Candidate/CandidateExamsPage.jsx';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null); // 'ADMIN', 'ENLISTMENT_OFFICER', 'CANDIDATE', or null
  const [loadingAuth, setLoadingAuth] = useState(true);

  // Check authentication status on app load
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    console.log(token);
    console.log(role);
    if (token && role) {
      setIsAuthenticated(true);
      setUserRole(role);
      // Optional: You could also verify the token with a backend endpoint here
    }
    setLoadingAuth(false);
  }, []);

  // Function to handle login
  const handleLogin = (token, role, userId) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('userId', userId); // Useful for other profile fetches
    setIsAuthenticated(true);
    setUserRole(role);
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    setIsAuthenticated(false);
    setUserRole(null);
    // You might also want to clear any fetched user data from context/state
  };

  // Handle fetching user role and profile for dynamic navigation
  // This would typically involve another API call after login or on initial load if token exists.
  // For simplicity, we're just reading from localStorage here.

  // Example of fetching universities (for UniversityInfoPage)
  // In a real app, you'd fetch this in the component that needs it, not here in App.
  const [universities, setUniversities] = useState([]);
  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await axios.get('/api/universities');
        setUniversities(response.data);
      } catch (error) {
        console.error('Failed to fetch universities:', error);
      }
    };
    fetchUniversities();
  }, []);

  if (loadingAuth) {
    return <div>Loading...</div>; // Or a nice loading spinner
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <MainLayout
              isAuthenticated={isAuthenticated}
              userRole={userRole}
              onLogout={handleLogout}
            >
              <HomePage />
            </MainLayout>
          }
        />
        <Route
          path="/universities"
          element={
            <MainLayout
              isAuthenticated={isAuthenticated}
              userRole={userRole}
              onLogout={handleLogout}
            >
              <UniversityInfoPage />
            </MainLayout>
          }
        />
        <Route
          path="/universities/:slug"
          element={
            <MainLayout
              isAuthenticated={isAuthenticated}
              userRole={userRole}
              onLogout={handleLogout}
            >
              <UniversityInfoPage />
            </MainLayout>
          }
        />{' '}
        {/* Detail page */}
        <Route
          path="/tests"
          element={
            <MainLayout
              isAuthenticated={isAuthenticated}
              userRole={userRole}
              onLogout={handleLogout}
            >
              <TestInformationPage />
            </MainLayout>
          }
        />
        <Route
          path="/login"
          element={
            <LoginPage
              onLogin={handleLogin}
              isAuthenticated={isAuthenticated}
            />
          }
        />{' '}
        {/* Redirect if already logged in */}
        <Route path="/register" element={<RegistrationPage />} />
        {/* Candidate Dashboard Routes */}
        <Route
          path="/candidate/dashboard"
          element={
            <ProtectedRoute
              allowedRoles={['CANDIDATE']}
              isAuthenticated={isAuthenticated}
              userRole={userRole}
            >
              <CandidateLayout userRole={userRole} onLogout={handleLogout}>
                <CandidateDashboard />
              </CandidateLayout>
            </ProtectedRoute>
          }
        />
        {/* ADDED */}
        <Route
          path="/candidate/profile"
          element={
            <ProtectedRoute
              allowedRoles={['CANDIDATE']}
              isAuthenticated={isAuthenticated}
              userRole={userRole}
            >
              <CandidateLayout userRole={userRole} onLogout={handleLogout}>
                <CandidateProfilePage />
              </CandidateLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/candidate/documents"
          element={
            <ProtectedRoute
              allowedRoles={['CANDIDATE']}
              isAuthenticated={isAuthenticated}
              userRole={userRole}
            >
              <CandidateLayout userRole={userRole} onLogout={handleLogout}>
                <CandidateDocumentsPage />
              </CandidateLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/candidate/exams"
          element={
            <ProtectedRoute
              allowedRoles={['CANDIDATE']}
              isAuthenticated={isAuthenticated}
              userRole={userRole}
            >
              <CandidateLayout userRole={userRole} onLogout={handleLogout}>
                <CandidateExamsPage />
              </CandidateLayout>
            </ProtectedRoute>
          }
        />
        {/* Add more candidate-specific routes here */}
        {/* Officer Dashboard Routes */}
        <Route
          path="/officer/dashboard"
          element={
            <ProtectedRoute
              allowedRoles={['ENLISTMENT_OFFICER']}
              isAuthenticated={isAuthenticated}
              userRole={userRole}
            >
              <AdminLayout userRole={userRole} onLogout={handleLogout}>
                <OfficerDashboard />
              </AdminLayout>{' '}
              {/* Using AdminLayout for now */}
            </ProtectedRoute>
          }
        />
        <Route
          path="/officer/applications"
          element={
            <ProtectedRoute
              allowedRoles={['ENLISTMENT_OFFICER']}
              isAuthenticated={isAuthenticated}
              userRole={userRole}
            >
              <AdminLayout userRole={userRole} onLogout={handleLogout}>
                <ReviewApplicationsPage />
              </AdminLayout>{' '}
              {/* Using AdminLayout for now */}
            </ProtectedRoute>
          }
        />
        {/* Add more officer-specific routes here */}
        {/* Admin Dashboard Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute
              allowedRoles={['ADMIN']}
              isAuthenticated={isAuthenticated}
              userRole={userRole}
            >
              <AdminLayout userRole={userRole} onLogout={handleLogout}>
                <AdminDashboard />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/candidates"
          element={
            <ProtectedRoute
              allowedRoles={['ADMIN']}
              isAuthenticated={isAuthenticated}
              userRole={userRole}
            >
              <AdminLayout userRole={userRole} onLogout={handleLogout}>
                <ManageCandidatesPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/pages"
          element={
            <ProtectedRoute
              allowedRoles={['ADMIN']}
              isAuthenticated={isAuthenticated}
              userRole={userRole}
            >
              <AdminLayout userRole={userRole} onLogout={handleLogout}>
                <ManageSitePagesPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        {/* Add more admin-specific routes here */}
        {/* Fallback Route for 404 */}
        <Route
          path="*"
          element={
            <MainLayout
              isAuthenticated={isAuthenticated}
              userRole={userRole}
              onLogout={handleLogout}
            >
              <NotFoundPage />
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
}

// Basic NotFoundPage component
const NotFoundPage = () => (
  <div className="text-center py-20">
    <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
    <p className="text-lg text-gray-700">
      The page you are looking for does not exist.
    </p>
    <button
      onClick={() => (window.location.href = '/')}
      className="mt-8 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 hover:cursor-pointer transition"
    >
      Go to Homepage
    </button>
  </div>
);

export default App;
