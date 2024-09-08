import React from 'react';
import { useLocation } from 'react-router-dom';
import Card from '../components/Card';  // Import the Card component

const ProductsPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category');

  // Dummy product data
  const allProducts = [
    { id: 1, name: 'Leather Jacket', category: 'clothing', price: '$199', image: '/images/clothing.jpg' },
    { id: 2, name: 'Casual Sneakers', category: 'shoes', price: '$89', image: '/images/shoes.jpg' },
    { id: 3, name: 'Stylish Sunglasses', category: 'sunglasses', price: '$49', image: '/images/sunglasses.jpg' },
    // Add more products here...
  ];

  // Filter products by the selected category
  const filteredProducts = allProducts.filter(product => product.category === category);

  return (
    <div className="products-page container mx-auto my-10">
      <h2 className="text-4xl font-bold text-center mb-6">Products in {category}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <Card
            key={product.id}
            image={product.image}
            title={product.name}
            price={product.price}
            link={`/products/${product.id}`}  // Link to individual product page
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
