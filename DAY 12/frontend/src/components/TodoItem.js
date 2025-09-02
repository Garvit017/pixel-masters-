import React from 'react';
import './TodoItem.css';

function TodoItem({ todo, deleteTodo, toggleComplete }) {
  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleComplete(todo.id)}
          className="todo-checkbox"
        />
        <span className="todo-text">{todo.text}</span>
      </div>
      <button 
        onClick={() => deleteTodo(todo.id)} 
        className="delete-button"
        aria-label="Delete todo"
      >
        ×
      </button>
    </div>
  );
}

export default TodoItem;