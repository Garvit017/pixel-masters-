import { useState } from 'react';
import './TodoList.css';

const TodoList = () => {
  // State for the list of todos
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn about React lists', completed: true },
    { id: 2, text: 'Practice using .map() for rendering', completed: false },
    { id: 3, text: 'Implement event handlers', completed: false },
  ]);

  // State for the new todo input
  const [newTodoText, setNewTodoText] = useState('');

  // Event handler for input change
  const handleInputChange = (e) => {
    setNewTodoText(e.target.value);
  };

  // Event handler for adding a new todo
  const handleAddTodo = () => {
    if (newTodoText.trim() === '') return;
    
    const newTodo = {
      id: Date.now(), // Use timestamp as a simple unique ID
      text: newTodoText,
      completed: false
    };
    
    setTodos([...todos, newTodo]);
    setNewTodoText(''); // Clear the input field
  };

  // Event handler for toggling todo completion status
  const handleToggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Event handler for deleting a todo
  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Event handler for clearing completed todos
  const handleClearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  // Function to render the list of todos using .map()
  const renderTodos = () => {
    return todos.map((todo) => (
      <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
        <span 
          className="todo-text"
          onClick={() => handleToggleTodo(todo.id)}
        >
          {todo.text}
        </span>
        <button 
          className="delete-button"
          onClick={() => handleDeleteTodo(todo.id)}
        >
          Delete
        </button>
      </li>
    ));
  };

  return (
    <div className="todo-list-container">
      <div className="add-todo-form">
        <input
          type="text"
          placeholder="Add a new todo..."
          value={newTodoText}
          className="todo-input"
        />
        <button className="add-button">Add Todo</button>
      </div>

      <ul className="todo-list">
        {renderTodos()}
      </ul>

      <div className="todo-actions">
        <button 
          className="action-button"
          onClick={handleClearCompleted}
        >
          Clear Completed
        </button>
      </div>
    </div>
  );
};

export default TodoList;