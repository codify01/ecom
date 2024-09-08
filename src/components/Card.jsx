import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ image, title, description, link, price }) => {
  return (
    <div className="card bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105">
      <div className="overflow-hidden rounded-lg mb-4">
        <img src={image} alt={title} className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110" />
      </div>
      <h3 className="text-2xl font-bold mb-2 text-gray-900">{title}</h3>
      {description && <p className="text-gray-600 mb-4">{description}</p>}
      {price && <p className="text-slate-600 font-bold text-lg mb-4">{price}</p>}
      {link && (
        <Link to={link} className="block bg-slate-600 text-white px-5 py-3 rounded-lg hover:bg-slate-700 transition-colors duration-300">
          View Details
        </Link>
      )}
    </div>
  );
};

export default Card;
