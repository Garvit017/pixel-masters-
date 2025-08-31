# Lists and Events in React

This document explains the key React concepts demonstrated in the Todo List application: rendering lists with `.map()` and handling events with `onClick` and `onChange`.

## Rendering Lists with `.map()`

### What is `.map()`?

`.map()` is a JavaScript array method that creates a new array by applying a function to each element of the original array. In React, we use it to transform arrays of data into arrays of JSX elements.

### How it's used in our Todo List:

```jsx
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
```

### Key Points:

1. **Unique Keys**: Each list item must have a unique `key` prop to help React identify which items have changed, been added, or removed.

2. **Transformation**: We transform each todo object into a JSX `<li>` element with appropriate styling and content.

3. **Conditional Classes**: We use template literals and ternary operators to conditionally apply CSS classes: `` className={`todo-item ${todo.completed ? 'completed' : ''}`} ``

4. **Rendering the List**: We call the function within JSX: `{renderTodos()}`

## Handling Events in React

### Event Handlers

React uses camelCase naming for events (e.g., `onClick` instead of `onclick`) and passes functions as event handlers rather than strings.

### Types of Events Used:

1. **onClick**: Triggered when an element is clicked
2. **onChange**: Triggered when the value of an input element changes
3. **onKeyPress**: Triggered when a key is pressed in an input element

### Examples from our Todo List:

#### 1. Input Change Handling:

```jsx
// Event handler for input change
const handleInputChange = (e) => {
  setNewTodoText(e.target.value);
};

// In JSX
<input
  type="text"
  placeholder="Add a new todo..."
  value={newTodoText}
  onChange={handleInputChange}
  className="todo-input"
  onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
/>
```

#### 2. Click Handling:

```jsx
// Event handler for adding a new todo
const handleAddTodo = () => {
  if (newTodoText.trim() === '') return;
  
  const newTodo = {
    id: Date.now(),
    text: newTodoText,
    completed: false
  };
  
  setTodos([...todos, newTodo]);
  setNewTodoText('');
};

// In JSX
<button 
  className="add-button"
  onClick={handleAddTodo}
>
  Add Todo
</button>
```

#### 3. Toggling Todo Completion:

```jsx
// Event handler for toggling todo completion status
const handleToggleTodo = (id) => {
  setTodos(todos.map(todo => 
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  ));
};

// In JSX
<span 
  className="todo-text"
  onClick={() => handleToggleTodo(todo.id)}
>
  {todo.text}
</span>
```

### Key Points:

1. **Event Object**: React events are synthetic events that wrap the browser's native events, providing cross-browser compatibility.

2. **Inline Functions vs. Named Handlers**: We can use both approaches:
   - Inline: `onClick={() => handleToggleTodo(todo.id)}`
   - Named handler: `onChange={handleInputChange}`

3. **Passing Parameters**: When we need to pass parameters to event handlers, we use arrow functions to create a closure.

4. **Conditional Execution**: We can use logical AND (`&&`) for conditional execution: `e.key === 'Enter' && handleAddTodo()`

5. **State Updates**: Event handlers often update state, which triggers re-rendering.

## Best Practices

1. **Keep Components Pure**: Event handlers should update state without side effects when possible.

2. **Avoid Inline Complex Logic**: Extract complex logic into separate functions.

3. **Debounce Input Handlers**: For performance-sensitive operations, consider debouncing event handlers.

4. **Use Event Delegation**: React's event system uses event delegation internally for better performance.

5. **Immutable Updates**: Always update state immutably, as shown in our `handleToggleTodo` function.

## Conclusion

The combination of list rendering with `.map()` and event handling with `onClick` and `onChange` forms the foundation of interactive React applications. These concepts allow us to create dynamic UIs that respond to user input while maintaining a declarative programming style.