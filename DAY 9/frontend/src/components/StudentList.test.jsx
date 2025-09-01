import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import StudentList from './StudentList';

// Mock the fetch function
global.fetch = vi.fn();

describe('StudentList Component', () => {
  const mockStudents = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@example.com',
      age: 20,
      grade: 'A',
      subjects: ['Mathematics', 'Physics', 'Computer Science']
    },
    {
      id: 2,
      name: 'Emma Johnson',
      email: 'emma.johnson@example.com',
      age: 21,
      grade: 'B+',
      subjects: ['Biology', 'Chemistry', 'Psychology']
    }
  ];

  beforeEach(() => {
    // Reset mock before each test
    fetch.mockReset();
    
    // Mock successful fetch response
    fetch.mockResolvedValue({
      ok: true,
      json: async () => mockStudents
    });
  });

  it('shows loading state initially', () => {
    render(<StudentList />);
    expect(screen.getByText('Loading students...')).toBeInTheDocument();
  });

  it('fetches and displays students', async () => {
    render(<StudentList />);
    
    // Wait for students to load
    await waitFor(() => {
      expect(screen.queryByText('Loading students...')).not.toBeInTheDocument();
    });
    
    // Check if students are displayed
    expect(screen.getByText('John Smith')).toBeInTheDocument();
    expect(screen.getByText('Emma Johnson')).toBeInTheDocument();
  });

  it('filters students based on search term', async () => {
    render(<StudentList />);
    
    // Wait for students to load
    await waitFor(() => {
      expect(screen.queryByText('Loading students...')).not.toBeInTheDocument();
    });
    
    // Type in search box
    const searchInput = screen.getByPlaceholderText('Search by name or email');
    fireEvent.change(searchInput, { target: { value: 'john' } });
    
    // Check filtered results
    expect(screen.getByText('John Smith')).toBeInTheDocument();
    expect(screen.queryByText('Emma Johnson')).not.toBeInTheDocument();
  });

  it('shows no results message when search has no matches', async () => {
    render(<StudentList />);
    
    // Wait for students to load
    await waitFor(() => {
      expect(screen.queryByText('Loading students...')).not.toBeInTheDocument();
    });
    
    // Type in search box with no matches
    const searchInput = screen.getByPlaceholderText('Search by name or email');
    fireEvent.change(searchInput, { target: { value: 'xyz' } });
    
    // Check no results message
    expect(screen.getByText('No students found matching your search.')).toBeInTheDocument();
  });

  it('handles fetch error', async () => {
    // Mock fetch error
    fetch.mockRejectedValueOnce(new Error('Failed to fetch'));
    
    render(<StudentList />);
    
    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText(/Failed to fetch students:/)).toBeInTheDocument();
    });
  });
});