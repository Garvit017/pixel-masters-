import React from 'react';

function TodoItem({ todo, deleteTodo, toggleTodo }) {
  return (
    <li className="todo-item">
      <span 
        className={`todo-text ${todo.completed ? 'completed' : ''}`}
        onClick={() => toggleTodo(todo.id)}
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
  );
}

export default TodoItem;