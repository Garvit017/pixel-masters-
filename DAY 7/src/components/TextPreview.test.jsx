import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TextPreview from './TextPreview';

// Mock test file to demonstrate how to test the TextPreview component
// In a real project, you would need to install testing libraries like @testing-library/react

describe('TextPreview Component', () => {
  test('renders with empty input initially', () => {
    render(<TextPreview />);
    const textarea = screen.getByPlaceholderText(/type something here/i);
    expect(textarea.value).toBe('');
    expect(screen.getByText(/your text will appear here/i)).toBeInTheDocument();
  });

  test('updates preview when text is entered', () => {
    render(<TextPreview />);
    const textarea = screen.getByPlaceholderText(/type something here/i);
    fireEvent.change(textarea, { target: { value: 'Hello World' } });
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  test('toggles bold formatting when bold button is clicked', () => {
    render(<TextPreview />);
    const boldButton = screen.getByTitle('Bold');
    fireEvent.click(boldButton);
    
    // Check if the button has the active class
    expect(boldButton).toHaveClass('active');
    
    // Check if the preview has bold styling
    const previewContent = screen.getByText(/your text will appear here/i);
    expect(previewContent).toHaveStyle('font-weight: bold');
  });

  test('toggles italic formatting when italic button is clicked', () => {
    render(<TextPreview />);
    const italicButton = screen.getByTitle('Italic');
    fireEvent.click(italicButton);
    
    // Check if the button has the active class
    expect(italicButton).toHaveClass('active');
    
    // Check if the preview has italic styling
    const previewContent = screen.getByText(/your text will appear here/i);
    expect(previewContent).toHaveStyle('font-style: italic');
  });

  test('changes text color when color picker is used', () => {
    render(<TextPreview />);
    const colorPicker = screen.getByTitle('Text Color');
    fireEvent.change(colorPicker, { target: { value: '#ff0000' } });
    
    // Check if the preview has the new color
    const previewContent = screen.getByText(/your text will appear here/i);
    expect(previewContent).toHaveStyle('color: #ff0000');
  });

  test('clears all formatting and text when clear button is clicked', () => {
    render(<TextPreview />);
    
    // Add some text and formatting
    const textarea = screen.getByPlaceholderText(/type something here/i);
    fireEvent.change(textarea, { target: { value: 'Test Text' } });
    
    const boldButton = screen.getByTitle('Bold');
    fireEvent.click(boldButton);
    
    const colorPicker = screen.getByTitle('Text Color');
    fireEvent.change(colorPicker, { target: { value: '#ff0000' } });
    
    // Click clear button
    const clearButton = screen.getByTitle('Clear All');
    fireEvent.click(clearButton);
    
    // Check if everything is reset
    expect(textarea.value).toBe('');
    expect(boldButton).not.toHaveClass('active');
    expect(screen.getByText(/your text will appear here/i)).toHaveStyle({
      fontWeight: 'normal',
      color: '#000000'
    });
  });
});