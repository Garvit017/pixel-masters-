import React, { useState } from 'react';
import './TodoForm.css';

function TodoForm({ addTodo }) {
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate input
    if (!text.trim()) {
      setError('Todo text cannot be empty');
      return;
    }
    
    // Clear any previous errors
    setError('');
    
    // Add the todo
    addTodo(text);
    
    // Reset the form
    setText('');
  };

  return (
    <div className="todo-form-container">
      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          className="todo-input"
          placeholder="Add a new todo..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" className="add-button">Add</button>
      </form>
      {error && <div className="form-error">{error}</div>}
    </div>
  );
}

export default TodoForm;