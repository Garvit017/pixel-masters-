import { useState } from 'react';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const { name, description, price, rating, image, category, inStock, colors } = product;
  
  // Format price to 2 decimal places
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price);
  
  // Generate stars for rating
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`star-${i}`} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    
    // Half star
    if (hasHalfStar) {
      stars.push(
        <svg key="half-star" className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="half-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="50%" stopColor="currentColor" stopOpacity="1" />
              <stop offset="50%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <path fill="url(#half-gradient)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    
    // Empty stars
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-star-${i}`} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    
    return stars;
  };

  return (
    <div 
      className={`bg-white dark:bg-gray-800 rounded-lg overflow-hidden transition-all duration-300 ${isHovered ? 'shadow-product-hover scale-105' : 'shadow-product'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative pb-[56.25%] overflow-hidden bg-gray-200 dark:bg-gray-700">
        <img 
          src={image} 
          alt={name}
          className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 ease-in-out"
        />
        {!inStock && (
          <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-2 py-1 m-2 rounded">
            Out of Stock
          </div>
        )}
        <div className="absolute top-0 left-0 bg-primary-600 text-white text-xs font-bold px-2 py-1 m-2 rounded">
          {category}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white truncate">{name}</h3>
          <span className="text-lg font-bold text-primary-600 dark:text-primary-400">{formattedPrice}</span>
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">{description}</p>
        
        <div className="flex items-center mb-3">
          <div className="flex mr-2">
            {renderStars()}
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400">{rating.toFixed(1)}</span>
        </div>
        
        {colors.length > 0 && (
          <div className="flex items-center mb-3">
            <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">Colors:</span>
            <div className="flex space-x-1">
              {colors.map(color => (
                <div 
                  key={color}
                  className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600"
                  style={{ backgroundColor: color.toLowerCase() }}
                  title={color}
                />
              ))}
            </div>
          </div>
        )}
        
        <button 
          className={`w-full py-2 px-4 rounded font-medium transition-colors ${inStock 
            ? 'bg-primary-600 hover:bg-primary-700 text-white' 
            : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'}`}
          disabled={!inStock}
        >
          {inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;