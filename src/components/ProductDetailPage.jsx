import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetailPage = () => {
  const { id } = useParams();  // Extract the product ID from the URL

  // Dummy product data (replace with real data fetch logic in a real app)
  const product = {
    id: id,
    name: "Stylish Leather Jacket",
    description: "This is a high-quality leather jacket that combines style and comfort.",
    price: "$199.99",
    image: "/images/jacket1.jpg",
  };

  return (
    <div className="product-detail-page container mx-auto my-10">
      <div className="flex flex-col md:flex-row items-center bg-white p-6 rounded-lg shadow-lg">
        <img src={product.image} alt={product.name} className="w-full md:w-1/2 h-64 object-cover rounded-md mb-6 md:mb-0"/>
        <div className="md:ml-8">
          <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
          <p className="text-lg mb-4">{product.description}</p>
          <p className="text-slate-600 text-2xl font-bold mb-4">{product.price}</p>
          <button className="bg-slate-600 text-white px-6 py-3 rounded hover:bg-slate-700">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
