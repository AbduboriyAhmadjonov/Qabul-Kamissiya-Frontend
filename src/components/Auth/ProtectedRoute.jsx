// src/components/Auth/ProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({
  children,
  allowedRoles,
  isAuthenticated,
  userRole,
}) => {
  const location = useLocation(); // Get current location to redirect back after login

  // Check if user is authenticated
  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user has the required role
  if (userRole && allowedRoles && !allowedRoles.includes(userRole)) {
    // Redirect to a generic dashboard or an unauthorized page if role doesn't match
    // For simplicity, redirect to login or a generic dashboard based on role
    if (userRole === 'ADMIN') {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (userRole === 'ENLISTMENT_OFFICER') {
      return <Navigate to="/officer/dashboard" replace />;
    } else {
      // Assuming CANDIDATE
      return <Navigate to="/candidate/dashboard" replace />;
    }
  }

  // If authenticated and role is allowed, render the children
  return children;
};

export default ProtectedRoute;
