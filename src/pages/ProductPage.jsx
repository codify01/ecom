import React from 'react';
import { useLocation } from 'react-router-dom';
import Card from '../components/Card';  // Import the Card component

const ProductsPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category');

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
