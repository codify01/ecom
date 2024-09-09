import React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="not-found-page flex items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg">
        <FaExclamationTriangle className="text-6xl text-red-500 mb-4 mx-auto" />
        <h1 className="text-4xl font-bold mb-4">Oops! Page Not Found</h1>
        <p className="text-xl mb-6">The page you're looking for does not exist or has been moved.</p>
        <Link to="/" className="bg-pry text-white px-6 py-3 rounded-lg hover:bg-pry/80 transition duration-300 ease-in-out">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
