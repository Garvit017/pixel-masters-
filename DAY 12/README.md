# Todo App (DAY 12)

A full-stack Todo application with a React frontend and Node.js/Express backend. This application allows users to create, view, update, and delete todo items.

## Project Structure

The project is organized into two main directories:

- **frontend**: React application for the user interface
- **backend**: Express API for data management

## Features

- Create new todo items
- View a list of all todos
- Mark todos as completed/incomplete
- Delete todos
- Filter todos by completion status and text
- Responsive design with CSS styling
- Error handling and loading states

## Backend API

The backend provides a RESTful API with the following endpoints:

- **GET /api/todos**: Get all todos (with optional filtering)
- **GET /api/todos/:id**: Get a specific todo by ID
- **POST /api/todos**: Create a new todo
- **PUT /api/todos/:id**: Update an existing todo
- **DELETE /api/todos/:id**: Delete a todo

## Frontend Components

- **App**: Main component that manages state and API calls
- **TodoForm**: Form for adding new todos
- **TodoList**: Container for displaying all todo items
- **TodoItem**: Individual todo item with toggle and delete functionality

## Running the Application

### Backend

1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Start the server: `npm start` or `npm run dev` for development

The API will be available at `http://localhost:5000`.

### Frontend

1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start the development server: `npm start`

The application will be available at `http://localhost:3000`.

## Technologies Used

- **Frontend**: React, CSS
- **Backend**: Node.js, Express
- **Data Storage**: In-memory storage (could be extended to use a database)