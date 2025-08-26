import React, { useState } from 'react';
import './TodoList.css';

const TodoList = () => {
  // Initial todos state with some example items
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React Basics', completed: true },
    { id: 2, text: 'Practice Components', completed: true },
    { id: 3, text: 'Master State Management', completed: false },
    { id: 4, text: 'Build Todo List App', completed: false },
  ]);

  // State for the new todo input
  const [newTodo, setNewTodo] = useState('');

  // Toggle the completed status of a todo
  const toggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Delete a todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Add a new todo
  const addTodo = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    
    const newItem = {
      id: Date.now(),
      text: newTodo,
      completed: false
    };
    
    setTodos([...todos, newItem]);
    setNewTodo('');
  };

  // Handle input change
  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  return (
    <div className="todo-container">
      <h2>Todo List</h2>
      
      {/* Form to add new todos */}
      <form onSubmit={addTodo} className="todo-form">
        <input
          type="text"
          value={newTodo}
          onChange={handleInputChange}
          placeholder="Add a new task..."
          className="todo-input"
        />
        <button type="submit" className="add-button">Add</button>
      </form>
      
      {/* List of todos using .map */}
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <span 
              className="todo-text"
              onClick={() => toggleComplete(todo.id)}
            >
              {todo.text}
            </span>
            <button 
              className="delete-button"
              onClick={() => deleteTodo(todo.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      
      {/* Summary */}
      <div className="todo-summary">
        <p>Total: {todos.length}</p>
        <p>Completed: {todos.filter(todo => todo.completed).length}</p>
        <p>Remaining: {todos.filter(todo => !todo.completed).length}</p>
      </div>
    </div>
  );
};

export default TodoList;