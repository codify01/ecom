import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const categories = [
    { name: 'Clothing', image: '/images/clothing.jpg', link: '/products?category=clothing' },
    { name: 'Shoes', image: '/images/shoes.jpg', link: '/products?category=shoes' },
    { name: 'Sunglasses', image: '/images/sunglasses.jpg', link: '/products?category=sunglasses' },
    { name: 'Hats', image: '/images/hats.jpg', link: '/products?category=hats' },
    { name: 'Jewelry', image: '/images/jewelry.jpg', link: '/products?category=jewelry' },
    { name: 'Bags', image: '/images/bags.jpg', link: '/products?category=bags' },
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section bg-cover bg-center bg-gray-900 text-white h-screen flex flex-col justify-center items-center px-3" style={{ backgroundImage: 'url(/images/hero-bg.jpg)' }}>
        <h1 className="text-6xl font-bold mb-4">Discover Your Style</h1>
        <p className="text-2xl mb-6">Exclusive Collections for Everyone</p>
        <Link to="/products" className="bg-indigo-600 text-white px-10 py-4 rounded-full hover:bg-indigo-700 transition duration-300 ease-in-out">
          Shop Now
        </Link>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto categories-section my-20 px-4">
        <h2 className="text-5xl font-bold text-center mb-12">Shop by Categories</h2>
        <div className="categories grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <div key={index} className="category-card group relative bg-gray-100 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
              <Link to={category.link}>
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-56 object-cover opacity-90 group-hover:opacity-100 transition duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                  <h3 className="text-white text-2xl font-semibold">{category.name}</h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
