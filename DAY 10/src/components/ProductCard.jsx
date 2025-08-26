import React from 'react';

const ProductCard = ({ product }) => {
  const { name, description, price, rating, image, category, inStock, discount, colors } = product;
  
  // Calculate discounted price if applicable
  const discountedPrice = discount > 0 ? price - (price * discount / 100) : null;
  
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-card transition-all duration-300 hover:shadow-card-hover transform hover:-translate-y-1">
      {/* Product Image with Category Badge */}
      <div className="relative">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-40 sm:h-48 object-cover"
        />
        <span className="absolute top-2 left-2 bg-primary px-1.5 py-0.5 md:px-2 md:py-1 text-xs text-white font-medium rounded-full">
          {category}
        </span>
        {discount > 0 && (
          <span className="absolute top-2 right-2 bg-secondary px-1.5 py-0.5 md:px-2 md:py-1 text-xs text-white font-bold rounded-full">
            {discount}% OFF
          </span>
        )}
      </div>
      
      {/* Product Details */}
      <div className="p-3 md:p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-1">{name}</h3>
          <div className="flex items-center">
            <svg className="w-3 h-3 md:w-4 md:h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="ml-1 text-xs md:text-sm font-medium text-gray-600">{rating}</span>
          </div>
        </div>
        
        <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-3 line-clamp-2">{description}</p>
        
        {/* Price Section */}
        <div className="flex items-center mb-2 md:mb-3">
          {discountedPrice ? (
            <>
              <span className="text-base md:text-lg font-bold text-primary mr-2">${discountedPrice.toFixed(2)}</span>
              <span className="text-xs md:text-sm text-gray-500 line-through">${price.toFixed(2)}</span>
            </>
          ) : (
            <span className="text-base md:text-lg font-bold text-primary">${price.toFixed(2)}</span>
          )}
        </div>
        
        {/* Color Options */}
        <div className="flex items-center mb-3 md:mb-4">
          <span className="text-xs text-gray-500 mr-2">Colors:</span>
          <div className="flex space-x-1">
            {colors.map((color, index) => (
              <span 
                key={index} 
                className="w-3 h-3 md:w-4 md:h-4 rounded-full border border-gray-300" 
                style={{ backgroundColor: color.toLowerCase() }}
                title={color}
              />
            ))}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button 
            className={`flex-1 py-1.5 md:py-2 px-3 md:px-4 rounded-lg text-xs md:text-sm font-medium transition-colors duration-200 ${inStock 
              ? 'bg-primary text-white hover:bg-primary-dark' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            disabled={!inStock}
          >
            {inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
          <button className="p-1.5 md:p-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors duration-200">
            <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;