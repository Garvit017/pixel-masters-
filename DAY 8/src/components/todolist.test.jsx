import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from './TodoList';

describe('TodoList Component', () => {
  it('renders initial todos', () => {
    render(<TodoList />);
    
    // Check if the initial todos are rendered
    expect(screen.getByText('Learn about React lists')).toBeInTheDocument();
    expect(screen.getByText('Practice using .map() for rendering')).toBeInTheDocument();
    expect(screen.getByText('Implement event handlers')).toBeInTheDocument();
  });

  it('adds a new todo when the Add Todo button is clicked', () => {
    render(<TodoList />);
    
    // Type in the input field
    const input = screen.getByPlaceholderText('Add a new todo...');
    fireEvent.change(input, { target: { value: 'Test new todo' } });
    
    // Click the Add Todo button
    const addButton = screen.getByText('Add Todo');
    fireEvent.click(addButton);
    
    // Check if the new todo is added
    expect(screen.getByText('Test new todo')).toBeInTheDocument();
    
    // Check if the input field is cleared
    expect(input.value).toBe('');
  });

  it('toggles todo completion when clicked', () => {
    render(<TodoList />);
    
    // Find a todo item that is not completed
    const todoText = screen.getByText('Practice using .map() for rendering');
    const todoItem = todoText.closest('.todo-item');
    
    // Initially, it should not have the 'completed' class
    expect(todoItem).not.toHaveClass('completed');
    
    // Click on the todo text to toggle completion
    fireEvent.click(todoText);
    
    // Now it should have the 'completed' class
    expect(todoItem).toHaveClass('completed');
    
    // Click again to toggle back
    fireEvent.click(todoText);
    
    // It should not have the 'completed' class again
    expect(todoItem).not.toHaveClass('completed');
  });

  it('deletes a todo when the Delete button is clicked', () => {
    render(<TodoList />);
    
    // Find the delete button for a specific todo
    const todoText = 'Implement event handlers';
    const todoElement = screen.getByText(todoText);
    const deleteButton = todoElement.parentElement.querySelector('.delete-button');
    
    // Click the delete button
    fireEvent.click(deleteButton);
    
    // Check if the todo is removed
    expect(screen.queryByText(todoText)).not.toBeInTheDocument();
  });

  it('clears completed todos when Clear Completed button is clicked', () => {
    render(<TodoList />);
    
    // Initially, 'Learn about React lists' is completed
    expect(screen.getByText('Learn about React lists')).toBeInTheDocument();
    
    // Click the Clear Completed button
    const clearButton = screen.getByText('Clear Completed');
    fireEvent.click(clearButton);
    
    // Check if the completed todo is removed
    expect(screen.queryByText('Learn about React lists')).not.toBeInTheDocument();
    
    // Check if non-completed todos are still there
    expect(screen.getByText('Practice using .map() for rendering')).toBeInTheDocument();
    expect(screen.getByText('Implement event handlers')).toBeInTheDocument();
  });

  it('adds a todo when Enter key is pressed in the input field', () => {
    render(<TodoList />);
    
    // Type in the input field
    const input = screen.getByPlaceholderText('Add a new todo...');
    fireEvent.change(input, { target: { value: 'Test todo with Enter key' } });
    
    // Press Enter key
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 });
    
    // Check if the new todo is added
    expect(screen.getByText('Test todo with Enter key')).toBeInTheDocument();
    
    // Check if the input field is cleared
    expect(input.value).toBe('');
  });
});