import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Check if the token exists in local storage
  const token = localStorage.getItem('authToken');

  // If there's no token, redirect to login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Otherwise, render the protected content
  return children;
};

export default ProtectedRoute;