import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch todos from API
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('/api/todos');
        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }
        const data = await response.json();
        setTodos(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
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
        throw new Error('Failed to add todo');
      }

      const newTodo = await response.json();
      setTodos([...todos, newTodo]);
    } catch (error) {
      setError(error.message);
    }
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }

      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  // Toggle todo completion status
  const toggleTodo = async (id) => {
    try {
      const response = await fetch(`/api/todos/${id}/toggle`, {
        method: 'PUT',
      });

      if (!response.ok) {
        throw new Error('Failed to toggle todo');
      }

      const updatedTodo = await response.json();
      setTodos(todos.map(todo => 
        todo.id === id ? updatedTodo : todo
      ));
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <div className="container"><p>Loading...</p></div>;
  }

  if (error) {
    return <div className="container"><p>Error: {error}</p></div>;
  }

  return (
    <div className="container">
      <h1>Todo App</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList 
        todos={todos} 
        deleteTodo={deleteTodo} 
        toggleTodo={toggleTodo} 
      />
    </div>
  );
}

export default App;