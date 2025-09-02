import { useState } from 'react';
import styles from './ProductCardStyled.module.css';

// Alternative styling approach using CSS modules
const ProductCardStyled = ({ product }) => {
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
        <svg key={`star-${i}`} className={styles.star} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    
    // Half star
    if (hasHalfStar) {
      stars.push(
        <svg key="half-star" className={styles.star} fill="currentColor" viewBox="0 0 20 20">
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
        <svg key={`empty-star-${i}`} className={styles.emptyStar} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    
    return stars;
  };

  return (
    <div 
      className={`${styles.card} ${isHovered ? styles.hovered : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.imageContainer}>
        <img 
          src={image} 
          alt={name}
          className={styles.image}
        />
        {!inStock && (
          <div className={styles.outOfStock}>
            Out of Stock
          </div>
        )}
        <div className={styles.category}>
          {category}
        </div>
      </div>
      
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{name}</h3>
          <span className={styles.price}>{formattedPrice}</span>
        </div>
        
        <p className={styles.description}>{description}</p>
        
        <div className={styles.ratingContainer}>
          <div className={styles.stars}>
            {renderStars()}
          </div>
          <span className={styles.ratingText}>{rating.toFixed(1)}</span>
        </div>
        
        {colors.length > 0 && (
          <div className={styles.colorsContainer}>
            <span className={styles.colorsLabel}>Colors:</span>
            <div className={styles.colors}>
              {colors.map(color => (
                <div 
                  key={color}
                  className={styles.colorDot}
                  style={{ backgroundColor: color.toLowerCase() }}
                  title={color}
                />
              ))}
            </div>
          </div>
        )}
        
        <button 
          className={`${styles.button} ${!inStock ? styles.disabled : ''}`}
          disabled={!inStock}
        >
          {inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

export default ProductCardStyled;