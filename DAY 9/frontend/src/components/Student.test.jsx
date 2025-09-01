import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Student from './Student';

describe('Student Component', () => {
  const mockStudent = {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@example.com',
    age: 20,
    grade: 'A',
    subjects: ['Mathematics', 'Physics', 'Computer Science']
  };

  it('renders student name and email', () => {
    render(<Student student={mockStudent} />);
    
    expect(screen.getByText('John Smith')).toBeInTheDocument();
    expect(screen.getByText('john.smith@example.com')).toBeInTheDocument();
  });

  it('does not show details by default', () => {
    render(<Student student={mockStudent} />);
    
    expect(screen.queryByText('Age:')).not.toBeInTheDocument();
    expect(screen.queryByText('Grade:')).not.toBeInTheDocument();
    expect(screen.queryByText('Subjects:')).not.toBeInTheDocument();
  });

  it('shows details when Show Details button is clicked', () => {
    render(<Student student={mockStudent} />);
    
    // Click the Show Details button
    fireEvent.click(screen.getByText('Show Details'));
    
    // Check that details are now visible
    expect(screen.getByText('Age: 20')).toBeInTheDocument();
    expect(screen.getByText('Grade: A')).toBeInTheDocument();
    expect(screen.getByText('Subjects:')).toBeInTheDocument();
    expect(screen.getByText('Mathematics')).toBeInTheDocument();
    expect(screen.getByText('Physics')).toBeInTheDocument();
    expect(screen.getByText('Computer Science')).toBeInTheDocument();
  });

  it('hides details when Hide Details button is clicked', () => {
    render(<Student student={mockStudent} />);
    
    // First show details
    fireEvent.click(screen.getByText('Show Details'));
    
    // Then hide details
    fireEvent.click(screen.getByText('Hide Details'));
    
    // Check that details are now hidden
    expect(screen.queryByText('Age: 20')).not.toBeInTheDocument();
    expect(screen.queryByText('Grade: A')).not.toBeInTheDocument();
    expect(screen.queryByText('Subjects:')).not.toBeInTheDocument();
  });
});