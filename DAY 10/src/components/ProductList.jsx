import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { products } from '../data/products';

const ProductList = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Get unique categories from products
  const categories = ['All', ...new Set(products.map(product => product.category))];
  
  // Filter products based on selected category
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-4 md:mb-8">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium transition-colors duration-200 ${selectedCategory === category 
              ? 'bg-primary text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            {category}
          </button>
        ))}
      </div>
      
      {/* Products Grid - Responsive layout with different columns based on screen size */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-8 md:py-10">
          <p className="text-gray-500 text-base md:text-lg">No products found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;