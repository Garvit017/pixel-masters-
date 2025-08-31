import { useState } from 'react'
import TodoList from './components/TodoList'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <h1>Todo List App</h1>
      <div className="app-description">
        <p>This Todo List app demonstrates:</p>
        <ul className="concept-list">
          <li><strong>List Rendering</strong> - Using <code>.map()</code> to render todo items</li>
          <li><strong>Event Handling</strong> - Using <code>onClick</code> and <code>onChange</code> for user interactions</li>
          <li><strong>State Management</strong> - Using <code>useState</code> to track todos and input values</li>
        </ul>
      </div>
      <TodoList />
    </div>
  )
}

export default App