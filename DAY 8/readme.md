# Todo List Application - DAY 8

## Overview

This is a simple Todo List application built with React that demonstrates key concepts of list rendering with `.map()` and event handling with `onClick` and `onChange`. The application allows users to create, toggle, and delete todo items using only local state management.

## Features

- Add new todos with input field (supports Enter key and button click)
- Toggle todo completion status by clicking on the todo text
- Delete individual todos
- Clear all completed todos at once
- Responsive design with clean UI

## Project Structure

```
/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── TodoList.jsx       # Main component with todo functionality
│   │   ├── TodoList.css       # Styles for the TodoList component
│   │   └── TodoList.test.jsx  # Tests for the TodoList component
│   ├── App.jsx               # Main application component
│   ├── App.css               # Styles for the App component
│   ├── main.jsx              # Entry point for the React application
│   └── index.css             # Global styles
├── index.html                # HTML entry point
├── package.json              # Project dependencies and scripts
├── vite.config.js            # Vite configuration
├── LISTS_AND_EVENTS_CONCEPTS.md  # Documentation of React concepts
└── README.md                 # Project documentation
```

## Demonstrated React Concepts

### List Rendering with `.map()`

The application demonstrates how to render lists in React by mapping over an array of todo items and converting each item into a JSX element.

```jsx
const renderTodos = () => {
  return todos.map((todo) => (
    <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      {/* Todo item content */}
    </li>
  ));
};
```

### Event Handling

The application showcases various event handlers:

- `onClick` for buttons and todo items
- `onChange` for input fields
- `onKeyPress` for keyboard interactions

```jsx
// Click event
<button onClick={handleAddTodo}>Add Todo</button>

// Change event
<input onChange={handleInputChange} value={newTodoText} />

// Key press event
<input onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()} />
```

## Running the Application

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. Open your browser and navigate to the URL shown in the terminal (typically http://localhost:5173)

## Testing

The application includes comprehensive tests for all functionality. Run the tests with:

```
npm test
```

## Learning Resources

For more detailed explanations of the React concepts used in this project, see the [LISTS_AND_EVENTS_CONCEPTS.md](./LISTS_AND_EVENTS_CONCEPTS.md) file.

## Next Steps

Possible enhancements for this project:

1. Add local storage to persist todos between page refreshes
2. Add categories or tags for todos
3. Implement drag-and-drop for reordering todos
4. Add due dates and priority levels