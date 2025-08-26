import React from 'react';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <h1>React Todo List App</h1>
      <p className="app-description">
        A simple todo list application demonstrating list rendering with .map and event handling.
      </p>
      <TodoList />
    </div>
  );
}

export default App;