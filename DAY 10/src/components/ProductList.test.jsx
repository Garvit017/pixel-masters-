import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProductList from './ProductList';

// Mock the products data
vi.mock('../data/products', () => ([
  {
    id: 1,
    name: 'Test Product 1',
    description: 'Description for product 1',
    price: 99.99,
    rating: 4.5,
    image: 'https://example.com/image1.jpg',
    category: 'Electronics',
    inStock: true,
    colors: ['Red', 'Blue'],
  },
  {
    id: 2,
    name: 'Test Product 2',
    description: 'Description for product 2',
    price: 149.99,
    rating: 3.5,
    image: 'https://example.com/image2.jpg',
    category: 'Clothing',
    inStock: true,
    colors: ['Black', 'White'],
  },
  {
    id: 3,
    name: 'Out of Stock Item',
    description: 'This item is out of stock',
    price: 199.99,
    rating: 4.0,
    image: 'https://example.com/image3.jpg',
    category: 'Electronics',
    inStock: false,
    colors: ['Silver'],
  },
]));

describe('ProductList', () => {
  it('renders all products initially', () => {
    render(<ProductList />);
    expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    expect(screen.getByText('Test Product 2')).toBeInTheDocument();
    expect(screen.getByText('Out of Stock Item')).toBeInTheDocument();
  });

  it('filters products by search term', () => {
    render(<ProductList />);
    
    // Get the search input
    const searchInput = screen.getByPlaceholderText('Search by name or description...');
    
    // Search for 'Product 1'
    fireEvent.change(searchInput, { target: { value: 'Product 1' } });
    
    // Product 1 should be visible, others should not
    expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    expect(screen.queryByText('Test Product 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Out of Stock Item')).not.toBeInTheDocument();
  });

  it('filters products by category', () => {
    render(<ProductList />);
    
    // Get the category select
    const categorySelect = screen.getByLabelText('Category');
    
    // Select 'Electronics' category
    fireEvent.change(categorySelect, { target: { value: 'Electronics' } });
    
    // Electronics products should be visible, others should not
    expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    expect(screen.queryByText('Test Product 2')).not.toBeInTheDocument();
    expect(screen.getByText('Out of Stock Item')).toBeInTheDocument();
  });

  it('sorts products by price (low to high)', () => {
    render(<ProductList />);
    
    // Get the sort select
    const sortSelect = screen.getByLabelText('Sort By');
    
    // Select 'Price: Low to High'
    fireEvent.change(sortSelect, { target: { value: 'price-low-high' } });
    
    // Check that products are in the correct order
    const productNames = screen.getAllByText(/Test Product|Out of Stock Item/);
    expect(productNames[0].textContent).toBe('Test Product 1');
    expect(productNames[1].textContent).toBe('Test Product 2');
    expect(productNames[2].textContent).toBe('Out of Stock Item');
  });

  it('sorts products by price (high to low)', () => {
    render(<ProductList />);
    
    // Get the sort select
    const sortSelect = screen.getByLabelText('Sort By');
    
    // Select 'Price: High to Low'
    fireEvent.change(sortSelect, { target: { value: 'price-high-low' } });
    
    // Check that products are in the correct order
    const productNames = screen.getAllByText(/Test Product|Out of Stock Item/);
    expect(productNames[0].textContent).toBe('Out of Stock Item');
    expect(productNames[1].textContent).toBe('Test Product 2');
    expect(productNames[2].textContent).toBe('Test Product 1');
  });

  it('sorts products by rating', () => {
    render(<ProductList />);
    
    // Get the sort select
    const sortSelect = screen.getByLabelText('Sort By');
    
    // Select 'Rating'
    fireEvent.change(sortSelect, { target: { value: 'rating' } });
    
    // Check that products are in the correct order
    const productNames = screen.getAllByText(/Test Product|Out of Stock Item/);
    expect(productNames[0].textContent).toBe('Test Product 1');
    expect(productNames[1].textContent).toBe('Out of Stock Item');
    expect(productNames[2].textContent).toBe('Test Product 2');
  });

  it('shows no products found message when search has no results', () => {
    render(<ProductList />);
    
    // Get the search input
    const searchInput = screen.getByPlaceholderText('Search by name or description...');
    
    // Search for something that doesn't exist
    fireEvent.change(searchInput, { target: { value: 'nonexistent product' } });
    
    // No products should be visible
    expect(screen.queryByText('Test Product 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Test Product 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Out of Stock Item')).not.toBeInTheDocument();
    
    // No products found message should be visible
    expect(screen.getByText('No products found')).toBeInTheDocument();
  });
});