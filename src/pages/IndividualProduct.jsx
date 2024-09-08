import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import productsData from '../data/ProductData';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const ProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  
  const handleNavigation = () => {
    navigate('/products');
  };

  const product = productsData.find(product => product.id === parseInt(id));

  if (!product) {
    return (
      <div className="container mx-auto my-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Oops! Product Not Found</h1>
        <p className="text-lg text-gray-600 mb-6">It looks like the product you’re looking for doesn’t exist.</p>
        <button
          onClick={handleNavigation}
          className="bg-slate-700 text-white px-8 py-3 rounded-lg shadow-md hover:bg-slate-800 transition duration-300"
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="product-page container mx-auto my-16 px-6 lg:px-12">
      <div className="lg:flex lg:items-start lg:space-x-12">
        {/* Product Image */}
        <div className="lg:w-1/2 mb-8 lg:mb-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-lg"
          />
        </div>
        {/* Product Details */}
        <div className="lg:w-1/2">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
          <p className="text-2xl text-slate-700 font-semibold mb-4">{product.price}</p>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <div className="flex flex-col sm:flex-row sm:space-x-4">
            <button
              className="bg-slate-700 text-white px-6 py-3 rounded-lg shadow-md hover:bg-slate-800 transition duration-300 mb-4 sm:mb-0"
              onClick={() => dispatch(addToCart(product))}
            >
              Add to Cart
            </button>
            <button
              className="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg shadow-md hover:bg-gray-400 transition duration-300"
              onClick={handleNavigation}
            >
              Back to Products
            </button>
          </div>
        </div>
      </div>

      {/* Additional Product Information */}
      <section className="mt-16">
        <h2 className="text-3xl font-semibold text-gray-900 mb-6">Product Details</h2>
        <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">More Information</h3>
          <p className="text-gray-700">
           More information about the product will be display here
          </p>
        </div>
      </section>
    </div>
  );
};

export default ProductPage;
