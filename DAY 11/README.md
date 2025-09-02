# Student CRUD API

A RESTful API for managing student records built with Express.js. This API provides endpoints for creating, reading, updating, and deleting student information.

## Features

- **Complete CRUD Operations**: Create, read, update, and delete student records
- **Data Validation**: Input validation for all API endpoints
- **Error Handling**: Comprehensive error handling with appropriate status codes
- **Filtering**: Filter students by name, email, and grade
- **In-Memory Data Store**: Uses an in-memory data structure for storage (can be extended to use a database)
- **Testing**: Comprehensive test suite using Jest

## Project Structure

```
├── data/
│   └── studentData.js       # Data storage and operations
├── middleware/
│   └── validationMiddleware.js  # Input validation middleware
├── models/
│   └── studentModel.js      # Student model definition
├── routes/
│   └── studentRoutes.js     # API route handlers
├── tests/
│   ├── studentModel.test.js      # Tests for student model
│   ├── studentRoutes.test.js     # Tests for API routes
│   └── validationMiddleware.test.js  # Tests for validation middleware
├── API_DOCUMENTATION.md     # Detailed API documentation
├── jest.config.js          # Jest configuration
├── package.json            # Project dependencies
├── README.md               # Project overview (this file)
└── server.js               # Main application entry point
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the server:
   ```
   npm start
   ```
   Or for development with auto-reload:
   ```
   npm run dev
   ```

## API Endpoints

- **GET /api/students**: Get all students (with optional filtering)
- **GET /api/students/:id**: Get a specific student by ID
- **POST /api/students**: Create a new student
- **PUT /api/students/:id**: Update an existing student
- **DELETE /api/students/:id**: Delete a student

For detailed API documentation, see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md).

## Testing

Run the test suite:

```
npm test
```

Run tests with coverage report:

```
npm run test:coverage
```

Run tests in watch mode during development:

```
npm run test:watch
```

## Student Model

The Student model includes the following properties:

- **id**: Unique identifier (UUID)
- **name**: Student's full name
- **email**: Student's email address
- **age**: Student's age (optional)
- **grade**: Student's grade (A, B, C, D, F, A+, B+, C+, D+)
- **createdAt**: Timestamp when the record was created
- **updatedAt**: Timestamp when the record was last updated

## Validation Rules

- **Name**: Required, string
- **Email**: Required, valid email format
- **Age**: Optional, number between 5 and 100
- **Grade**: Required, one of: A, B, C, D, F, A+, B+, C+, D+

## Future Enhancements

- Add persistent database storage (MongoDB, PostgreSQL)
- Implement authentication and authorization
- Add pagination for GET endpoints
- Create a frontend interface
- Deploy to a cloud platform