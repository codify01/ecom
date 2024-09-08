import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between mb-8">
          {/* Company Info */}
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <h3 className="text-xl font-bold mb-4">Company</h3>
            <p className="mb-4">
              <Link to="/about" className="hover:underline">About Us</Link>
            </p>
            <p className="mb-4">
              <Link to="/careers" className="hover:underline">Careers</Link>
            </p>
            <p className="mb-4">
              <Link to="/contact" className="hover:underline">Contact Us</Link>
            </p>
            <p className="mb-4">
              <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
            </p>
            <p>
              <Link to="/terms" className="hover:underline">Terms of Service</Link>
            </p>
          </div>

          {/* Quick Links */}
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <p className="mb-4">
              <Link to="/products" className="hover:underline">Shop</Link>
            </p>
            <p className="mb-4">
              <Link to="/blog" className="hover:underline">Blog</Link>
            </p>
            <p className="mb-4">
              <Link to="/faqs" className="hover:underline">FAQs</Link>
            </p>
            <p className="mb-4">
              <Link to="/returns" className="hover:underline">Returns</Link>
            </p>
            <p>
              <Link to="/shipping" className="hover:underline">Shipping</Link>
            </p>
          </div>

          {/* Contact Details */}
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p className="mb-4">123 Fashion St, Style City, SC 12345</p>
            <p className="mb-4">Phone: (123) 456-7890</p>
            <p className="mb-4">Email: support@fashionstore.com</p>
            <p>
              <Link to="/contact" className="hover:underline">Contact Form</Link>
            </p>
          </div>

          {/* Social Media */}
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
                <FaFacebookF size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
                <FaTwitter size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
                <FaInstagram size={24} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
                <FaLinkedinIn size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-4">
          <p className="text-center text-sm">© {new Date().getFullYear()} Fashion Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
