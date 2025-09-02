# Student CRUD API Documentation

This document provides information about the Student CRUD API endpoints, request/response formats, and usage examples.

## Base URL

```
http://localhost:3000/api/students
```

## API Endpoints

### Get All Students

- **URL**: `/api/students`
- **Method**: `GET`
- **Query Parameters**:
  - `name` (optional): Filter students by name
  - `email` (optional): Filter students by email
  - `grade` (optional): Filter students by grade
- **Success Response**:
  - **Code**: 200
  - **Content**:
    ```json
    {
      "success": true,
      "count": 2,
      "data": [
        {
          "id": "550e8400-e29b-41d4-a716-446655440000",
          "name": "John Doe",
          "email": "john@example.com",
          "age": 18,
          "grade": "A",
          "createdAt": "2023-06-15T10:30:00.000Z",
          "updatedAt": "2023-06-15T10:30:00.000Z"
        },
        {
          "id": "550e8400-e29b-41d4-a716-446655440001",
          "name": "Jane Smith",
          "email": "jane@example.com",
          "age": 17,
          "grade": "B",
          "createdAt": "2023-06-15T11:30:00.000Z",
          "updatedAt": "2023-06-15T11:30:00.000Z"
        }
      ]
    }
    ```
- **Error Response**:
  - **Code**: 500
  - **Content**:
    ```json
    {
      "success": false,
      "message": "Failed to fetch students",
      "error": "Error message"
    }
    ```

### Get Student by ID

- **URL**: `/api/students/:id`
- **Method**: `GET`
- **URL Parameters**:
  - `id`: Student ID
- **Success Response**:
  - **Code**: 200
  - **Content**:
    ```json
    {
      "success": true,
      "data": {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "name": "John Doe",
        "email": "john@example.com",
        "age": 18,
        "grade": "A",
        "createdAt": "2023-06-15T10:30:00.000Z",
        "updatedAt": "2023-06-15T10:30:00.000Z"
      }
    }
    ```
- **Error Response**:
  - **Code**: 404
  - **Content**:
    ```json
    {
      "success": false,
      "message": "Student with ID 550e8400-e29b-41d4-a716-446655440000 not found"
    }
    ```

### Create Student

- **URL**: `/api/students`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "age": 18,
    "grade": "A"
  }
  ```
- **Required Fields**: `name`, `email`, `grade`
- **Success Response**:
  - **Code**: 201
  - **Content**:
    ```json
    {
      "success": true,
      "data": {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "name": "John Doe",
        "email": "john@example.com",
        "age": 18,
        "grade": "A",
        "createdAt": "2023-06-15T10:30:00.000Z",
        "updatedAt": "2023-06-15T10:30:00.000Z"
      }
    }
    ```
- **Error Response**:
  - **Code**: 400
  - **Content**:
    ```json
    {
      "success": false,
      "message": "Validation failed",
      "errors": ["Name is required", "Email is required", "Grade is required"]
    }
    ```

### Update Student

- **URL**: `/api/students/:id`
- **Method**: `PUT`
- **URL Parameters**:
  - `id`: Student ID
- **Request Body**:
  ```json
  {
    "name": "John Doe Updated",
    "email": "john.updated@example.com",
    "age": 19,
    "grade": "A+"
  }
  ```
- **Success Response**:
  - **Code**: 200
  - **Content**:
    ```json
    {
      "success": true,
      "data": {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "name": "John Doe Updated",
        "email": "john.updated@example.com",
        "age": 19,
        "grade": "A+",
        "createdAt": "2023-06-15T10:30:00.000Z",
        "updatedAt": "2023-06-15T11:45:00.000Z"
      }
    }
    ```
- **Error Response**:
  - **Code**: 404
  - **Content**:
    ```json
    {
      "success": false,
      "message": "Student with ID 550e8400-e29b-41d4-a716-446655440000 not found"
    }
    ```
  - **Code**: 400
  - **Content**:
    ```json
    {
      "success": false,
      "message": "Validation failed",
      "errors": ["Email must be a valid email address"]
    }
    ```

### Delete Student

- **URL**: `/api/students/:id`
- **Method**: `DELETE`
- **URL Parameters**:
  - `id`: Student ID
- **Success Response**:
  - **Code**: 200
  - **Content**:
    ```json
    {
      "success": true,
      "message": "Student with ID 550e8400-e29b-41d4-a716-446655440000 deleted successfully"
    }
    ```
- **Error Response**:
  - **Code**: 404
  - **Content**:
    ```json
    {
      "success": false,
      "message": "Student with ID 550e8400-e29b-41d4-a716-446655440000 not found"
    }
    ```

## Validation Rules

- **Name**: Required, string
- **Email**: Required, valid email format
- **Age**: Optional, number between 5 and 100
- **Grade**: Required, string (A, B, C, D, F, A+, B+, C+, D+)

## Error Handling

All endpoints return standardized error responses with the following format:

```json
{
  "success": false,
  "message": "Error message description",
  "errors": ["Specific error 1", "Specific error 2"] // Optional field for validation errors
}
```

## Running the API

1. Install dependencies: `npm install`
2. Start the server: `npm start`
3. The API will be available at `http://localhost:3000`