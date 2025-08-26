# Student CRUD API - Day 11

## Overview
This project is a RESTful API for managing student records. It provides endpoints for creating, reading, updating, and deleting student information using Express.js.

## Features
- Complete CRUD operations for student records
- Input validation for student data
- Error handling middleware
- In-memory data store (simulated database)

## Project Structure
```
├── controllers/
│   └── studentController.js    # Controller functions for student operations
├── middleware/
│   ├── errorMiddleware.js      # Error handling middleware
│   └── validationMiddleware.js  # Request validation middleware
├── models/
│   ├── Student.js              # Student model with validation
│   └── studentData.js          # In-memory data store
├── routes/
│   └── studentRoutes.js        # API routes for student operations
├── tests/
│   └── api-test.http           # HTTP request tests
├── server.js                   # Main application entry point
└── package.json                # Project dependencies
```

## API Endpoints

### GET /api/students
Returns a list of all students.

### GET /api/students/:id
Returns a single student by ID.

### POST /api/students
Creates a new student.

Request body:
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "age": 18,
  "grade": "A"
}
```

### PUT /api/students/:id
Updates an existing student.

Request body:
```json
{
  "name": "John Doe Updated",
  "email": "john.updated@example.com",
  "grade": "B"
}
```

### DELETE /api/students/:id
Deletes a student by ID.

## Validation
The API validates student data with the following rules:
- Name: Required, string, minimum 2 characters
- Email: Required, valid email format
- Age: Optional, number between 5 and 100
- Grade: Optional, one of: A, B, C, D, F

## Running the Project

1. Install dependencies:
```
npm install
```

2. Start the server:
```
npm start
```

Or for development with auto-reload:
```
npm run dev
```

3. The API will be available at http://localhost:5000

## Testing
You can test the API using the provided HTTP request file in the `tests` directory or using tools like Postman or curl.

Example curl commands:

```bash
# Get all students
curl http://localhost:5000/api/students

# Create a new student
curl -X POST http://localhost:5000/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"New Student","email":"new.student@example.com","age":21,"grade":"B"}'
```