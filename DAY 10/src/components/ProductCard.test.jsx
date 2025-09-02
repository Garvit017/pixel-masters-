import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProductCard from './ProductCard';

describe('ProductCard', () => {
  const mockProduct = {
    id: 1,
    name: 'Test Product',
    description: 'This is a test product description',
    price: 99.99,
    rating: 4.5,
    image: 'https://example.com/image.jpg',
    category: 'Test Category',
    inStock: true,
    colors: ['Red', 'Blue'],
  };

  it('renders product name and price', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
  });

  it('renders product description', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('This is a test product description')).toBeInTheDocument();
  });

  it('renders category badge', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('Test Category')).toBeInTheDocument();
  });

  it('renders correct rating', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('4.5')).toBeInTheDocument();
  });

  it('renders Add to Cart button when in stock', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('Add to Cart')).toBeInTheDocument();
    expect(screen.getByText('Add to Cart')).not.toBeDisabled();
  });

  it('renders Out of Stock button when not in stock', () => {
    const outOfStockProduct = { ...mockProduct, inStock: false };
    render(<ProductCard product={outOfStockProduct} />);
    expect(screen.getByText('Out of Stock')).toBeInTheDocument();
    expect(screen.getByText('Out of Stock')).toBeDisabled();
  });

  it('renders color options', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('Colors:')).toBeInTheDocument();
    // Check for color dots (they don't have text, but have title attributes)
    expect(screen.getByTitle('Red')).toBeInTheDocument();
    expect(screen.getByTitle('Blue')).toBeInTheDocument();
  });
});