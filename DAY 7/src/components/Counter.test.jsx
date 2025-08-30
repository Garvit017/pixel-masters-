import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter';

// Mock test file to demonstrate how to test the Counter component
// In a real project, you would need to install testing libraries like @testing-library/react

describe('Counter Component', () => {
  test('renders with initial count of 0', () => {
    render(<Counter />);
    expect(screen.getByText(/count: 0/i)).toBeInTheDocument();
  });

  test('increments count when increment button is clicked', () => {
    render(<Counter />);
    const incrementButton = screen.getByText(/increment/i);
    fireEvent.click(incrementButton);
    expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
  });

  test('decrements count when decrement button is clicked', () => {
    render(<Counter />);
    const decrementButton = screen.getByText(/decrement/i);
    fireEvent.click(decrementButton);
    expect(screen.getByText(/count: -1/i)).toBeInTheDocument();
  });

  test('resets count to 0 when reset button is clicked', () => {
    render(<Counter />);
    const incrementButton = screen.getByText(/increment/i);
    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);
    
    const resetButton = screen.getByText(/reset/i);
    fireEvent.click(resetButton);
    
    expect(screen.getByText(/count: 0/i)).toBeInTheDocument();
  });

  test('increments by 5 when increment by 5 button is clicked', () => {
    render(<Counter />);
    const incrementBy5Button = screen.getByText(/increment by 5/i);
    fireEvent.click(incrementBy5Button);
    expect(screen.getByText(/count: 5/i)).toBeInTheDocument();
  });
});