# Todo App Frontend

This is the frontend for the Todo application built with React. It provides a user interface for creating, viewing, and deleting todo items.

## Features

- Display a list of todos
- Add new todos
- Delete existing todos
- Mark todos as completed/incomplete
- Error handling and loading states

## Components

- **App**: Main component that manages state and API calls
- **TodoForm**: Form for adding new todos
- **TodoList**: Container for displaying all todo items
- **TodoItem**: Individual todo item with toggle and delete functionality

## Running the Frontend

1. Install dependencies: `npm install`
2. Start the development server: `npm start`

The application will be available at `http://localhost:3000`.

## API Integration

The frontend communicates with the backend API at `http://localhost:5000` for:

- Fetching all todos (GET /api/todos)
- Creating new todos (POST /api/todos)
- Updating todos (PUT /api/todos/:id)
- Deleting todos (DELETE /api/todos/:id)