import React from 'react';
import { Link } from 'react-router-dom';
import hero from '../assets/images/hero.jpg';
import clothing from '../assets/images/clothing.jpg';
import shoes from '../assets/images/shoes.jpg';
import sunglasses from '../assets/images/sunglasses.jpg';
import hat from '../assets/images/hat.jpg';
import bag from '../assets/images/bag.jpg';
import jewel from '../assets/images/jewel.jpg';
import newArrivals from '../assets/images/hero.jpg';
import bestSellers from '../assets/images/hero.jpg';
import seasonalSale from '../assets/images/hero.jpg';

// Dummy data for products
const products = {
  newArrivals: [
    { id: 1, name: 'Stylish Jacket', image: clothing, price: 59.99 },
    { id: 2, name: 'Cool Sneakers', image: shoes, price: 89.99 },
    { id: 3, name: 'Trendy Sunglasses', image: sunglasses, price: 29.99 },
  ],
  bestSellers: [
    { id: 4, name: 'Classic Hat', image: hat, price: 19.99 },
    { id: 5, name: 'Leather Bag', image: bag, price: 129.99 },
    { id: 6, name: 'Elegant Jewelry', image: jewel, price: 99.99 },
  ],
  seasonalSale: [
    { id: 7, name: 'Summer Dress', image: clothing, price: 39.99 },
    { id: 8, name: 'Winter Boots', image: shoes, price: 109.99 },
    { id: 9, name: 'Fancy Sunglasses', image: sunglasses, price: 49.99 },
  ],
};

const Home = () => {
  const renderCarousel = (productList) => (
    <div className="carousel flex overflow-x-scroll space-x-4 py-4">
      {productList.map((product) => (
        <div key={product.id} className="carousel-item bg-white rounded-lg shadow-lg p-4 flex-shrink-0 w-60">
          <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-md mb-2" />
          <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
          <p className="text-lg text-gray-700">${product.price.toFixed(2)}</p>
          <Link to={`/products/${product.id}`} className="text-indigo-600 hover:text-indigo-800 mt-2 block">View Details</Link>
        </div>
      ))}
    </div>
  );

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section bg-cover bg-center bg-gray-900 text-white h-screen flex flex-col justify-center items-center px-3" style={{ backgroundImage: `linear-gradient(#111827aa, #111827), url(${hero})` }}>
        <h1 className="text-6xl font-bold mb-4">Discover Your Style</h1>
        <p className="text-2xl mb-6">Exclusive Collections for Everyone</p>
        <Link to="/products" className="bg-slate-600 text-white px-10 py-4 rounded-full hover:bg-slate-700 transition duration-300 ease-in-out">
          Shop Now
        </Link>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto categories-section my-20 px-4">
        <h2 className="text-5xl font-bold text-center mb-12">Shop by Categories</h2>
        <div className="categories grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {[
            { name: 'Clothing', image: clothing, link: '/products?category=clothing' },
            { name: 'Shoes', image: shoes, link: '/products?category=shoes' },
            { name: 'Sunglasses', image: sunglasses, link: '/products?category=sunglasses' },
            { name: 'Hats', image: hat, link: '/products?category=hats' },
            { name: 'Jewelry', image: jewel, link: '/products?category=jewelry' },
            { name: 'Bags', image: bag, link: '/products?category=bags' },
          ].map((category, index) => (
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

      {/* New Arrivals Section */}
      <section className="new-arrivals-section bg-gray-100 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-12">New Arrivals</h2>
          <div className="bg-cover bg-center h-72 rounded-lg shadow-lg relative" style={{ backgroundImage: `url(${newArrivals})` }}>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white p-4">
              <h3 className="text-3xl font-semibold">Check Out the Latest Trends</h3>
            </div>
          </div>
          {renderCarousel(products.newArrivals)}
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="best-sellers-section py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-12">Best Sellers</h2>
          <div className="bg-cover bg-center h-72 rounded-lg shadow-lg relative" style={{ backgroundImage: `url(${bestSellers})` }}>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white p-4">
              <h3 className="text-3xl font-semibold">Popular Items You'll Love</h3>
            </div>
          </div>
          {renderCarousel(products.bestSellers)}
        </div>
      </section>

      {/* Seasonal Sale Section */}
      <section className="seasonal-sale-section bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-12">Seasonal Sale</h2>
          <div className="bg-cover bg-center h-72 rounded-lg shadow-lg relative" style={{ backgroundImage: `url(${seasonalSale})` }}>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white p-4">
              <h3 className="text-3xl font-semibold">Unbeatable Discounts on All Items</h3>
            </div>
          </div>
          {renderCarousel(products.seasonalSale)}
        </div>
      </section>
    </div>
  );
};

export default Home;
