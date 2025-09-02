# Todo App Backend API

This is the backend API for the Todo application. It provides endpoints for creating, reading, updating, and deleting todo items.

## API Endpoints

### GET /api/todos

Returns all todos. Supports optional query parameters for filtering:
- `completed`: Filter by completion status (`true` or `false`)
- `text`: Filter todos containing the specified text

### GET /api/todos/:id

Returns a single todo by ID.

### POST /api/todos

Creates a new todo. Requires a JSON body with:
- `text`: The text content of the todo

### PUT /api/todos/:id

Updates an existing todo. Accepts a JSON body with any of these fields:
- `text`: New text content
- `completed`: New completion status (boolean)

### DELETE /api/todos/:id

Deletes a todo by ID.

## Running the API

1. Install dependencies: `npm install`
2. Start the server: `npm start`
3. For development with auto-reload: `npm run dev`

The API will be available at `http://localhost:5000`.