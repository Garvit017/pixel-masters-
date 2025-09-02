import React from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';

function TodoList({ todos, deleteTodo, toggleComplete }) {
  if (todos.length === 0) {
    return <div className="empty-list">No todos yet. Add one above!</div>;
  }

  return (
    <div className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          deleteTodo={deleteTodo}
          toggleComplete={toggleComplete}
        />
      ))}
    </div>
  );
}

export default TodoList;