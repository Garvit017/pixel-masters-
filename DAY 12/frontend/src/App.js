import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch todos from API
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/todos');
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json();
        setTodos(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch todos. Please try again later.');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  // Add a new todo
  const addTodo = async (text) => {
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const newTodo = await response.json();
      setTodos([...todos, newTodo]);
    } catch (err) {
      setError('Failed to add todo. Please try again.');
      console.error('Add todo error:', err);
    }
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      setError('Failed to delete todo. Please try again.');
      console.error('Delete todo error:', err);
    }
  };

  // Toggle todo completion status
  const toggleComplete = async (id) => {
    try {
      const todoToUpdate = todos.find(todo => todo.id === id);
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          completed: !todoToUpdate.completed 
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const updatedTodo = await response.json();
      setTodos(todos.map(todo => 
        todo.id === id ? updatedTodo : todo
      ));
    } catch (err) {
      setError('Failed to update todo. Please try again.');
      console.error('Update todo error:', err);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Todo App</h1>
      </header>
      
      <main className="app-main">
        <TodoForm addTodo={addTodo} />
        
        {error && <div className="error-message">{error}</div>}
        
        {loading ? (
          <div className="loading">Loading todos...</div>
        ) : (
          <TodoList 
            todos={todos} 
            deleteTodo={deleteTodo} 
            toggleComplete={toggleComplete} 
          />
        )}
      </main>
    </div>
  );
}

export default App;