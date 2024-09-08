import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartIndicator from './CartIndicator'; // Assuming CartIndicator is in the same directory

const NavBar = () => {
  const navigate = useNavigate();

  // Check if the user is logged in by checking the token
  const token = localStorage.getItem('authToken');

  // Handle logout by removing the token and redirecting to the login page
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-white text-2xl font-bold">
            Ecom.NG
          </Link>
          <div className="hidden md:flex space-x-4">
            <Link to="/" className="text-gray-300 hover:text-white">
              Home
            </Link>
            <Link to="/products" className="text-gray-300 hover:text-white">
              Products
            </Link>
            <Link to="/about" className="text-gray-300 hover:text-white">
              About Us
            </Link>
            <Link to="/contact" className="text-gray-300 hover:text-white">
              Contact
            </Link>
          </div>
        </div>

        <div className="flex items-center space-x-4 ml-auto">
        <CartIndicator />

          {/* Conditionally render the Sign Up or Log Out button */}
          {!token ? (
            <Link
              to="/login"
              className="text-gray-300 hover:text-white bg-slate-700 py-2 px-3 rounded-full"
            >
              Log In
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="text-gray-300 hover:text-white bg-slate-950 py-2 px-3 rounded-full"
            >
              Log Out
            </button>
          )}

          {/* Cart Indicator */}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
