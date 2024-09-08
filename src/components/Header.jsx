import React from 'react';
import { Link } from 'react-router-dom';
import CartIndicator from './CartIndicator'; // Assuming CartIndicator is in the same directory

const NavBar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-white text-2xl font-bold">
            MyStore
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
          <Link to="/signup" className="text-gray-300 hover:text-white bg-slate-700 py-1 px-2 rounded-full font-medium">
            Sign Up
          </Link>
          <CartIndicator />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
