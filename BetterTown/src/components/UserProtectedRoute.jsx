import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx'; 

const UserProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth(); 

  // If still loading authentication status, don't render anything yet
  if (loading) {
    return null; 
  }

  // If not authenticated, redirect to login page
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default UserProtectedRoute;
