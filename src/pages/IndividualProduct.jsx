import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import productsData from '../data/ProductData';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const ProductPage = () => {
  const navigation = useNavigate()
  const { id } = useParams();
  const dispatch = useDispatch();
 const handleNavigation = ()=>{
   navigation('/products')
 }

  const product = productsData.find(product => product.id === parseInt(id));

  if (!product) {
    return <p className="text-center text-gray-700">Product not found.</p>;
  }

  return (
    <div className="product-page container mx-auto my-10 px-4">
      <div className="flex flex-col lg:flex-row lg:space-x-12">
        <div className="lg:w-1/2 mb-6 lg:mb-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="lg:w-1/2">
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl text-indigo-600 font-semibold mb-4">{product.price}</p>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <div className="flex items-center space-x-4">
            <button
              className="bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700 transition duration-300"
              onClick={() => dispatch(addToCart(product))}
            >
              Add to Cart
            </button>
            <button
              className="bg-gray-300 text-gray-800 px-6 py-3 rounded hover:bg-gray-400 transition duration-300"
              onClick={handleNavigation} // Go back to previous page
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
