import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import productsData from '../data/ProductData';

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  
  const searchParams = new URLSearchParams(location.search);
  const categoryFromUrl = searchParams.get('category');
  const category = selectedCategory || categoryFromUrl || '';
  
  const filteredProducts = category
    ? productsData.filter(product => product.category === category)
    : productsData;

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory);
    navigate(`?category=${selectedCategory}`);
  };

  return (
    <div className="products-page container mx-auto my-10">
      {/* Category Selector */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-4xl font-bold">
          {category ? `Products in ${category}` : 'All Products'}
        </h2>
        <select
          className="border-2 border-sec rounded-lg py-3 px-2 focus:border-none focus:outline-none transition text-gray-100 bg-pry"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">All Categories</option>
          <option value="clothing">Clothing</option>
          <option value="shoes">Shoes</option>
          <option value="sunglasses">Sunglasses</option>
          <option value="hats">Hats</option>
          <option value="jewelry">Jewelry</option>
          <option value="bags">Bags</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.map(product => (
          <Card
            key={product.id}
            image={product.image}
            title={product.name}
            price={product.price}
            link={`/products/${product.id}`}
            className="bg-gray-900 text-white shadow-lg hover:bg-gray-800 transition"
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
