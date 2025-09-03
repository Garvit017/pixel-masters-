# Authentication System with JWT

A backend authentication system built with Node.js, Express, MongoDB, and JWT (JSON Web Tokens).

## Features

- User registration with password hashing
- User login with JWT generation
- Protected routes with JWT verification
- Role-based authorization
- Error handling and validation

## Project Structure

```
├── backend/
│   ├── controllers/
│   │   └── authController.js    # Authentication logic
│   ├── middleware/
│   │   └── auth.js              # JWT verification middleware
│   ├── models/
│   │   └── User.js              # User model with password hashing
│   ├── routes/
│   │   └── authRoutes.js        # API routes for authentication
│   ├── tests/
│   │   └── auth.test.js         # Test script for authentication
│   ├── .env                     # Environment variables
│   ├── package.json             # Dependencies
│   └── server.js                # Entry point
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)

### Installation

1. Clone the repository

2. Install dependencies:
   ```
   cd backend
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in the backend directory with the following variables:
     ```
     PORT=5000
     MONGODB_URI=mongodb://localhost:27017/auth-app
     NODE_ENV=development
     JWT_SECRET=your_jwt_secret_key_here
     JWT_EXPIRE=30d
     ```

### Running the Application

1. Start the backend server:
   ```
   cd backend
   npm run dev
   ```

2. The server will start on port 5000 (or the port specified in your .env file)

## API Endpoints

### Authentication

| Method | Endpoint           | Description                | Access      |
|--------|-------------------|----------------------------|-------------|
| POST   | /api/auth/register | Register a new user        | Public      |
| POST   | /api/auth/login    | Login and get JWT token    | Public      |
| GET    | /api/auth/me       | Get current user profile   | Private     |

## Authentication Flow

1. **Registration**:
   - Client sends POST request to `/api/auth/register` with name, email, and password
   - Server creates a new user with hashed password
   - Server returns JWT token

2. **Login**:
   - Client sends POST request to `/api/auth/login` with email and password
   - Server verifies credentials
   - Server returns JWT token and user data

3. **Accessing Protected Routes**:
   - Client includes JWT token in Authorization header: `Bearer <token>`
   - Server verifies token and grants access to protected resources

## Testing

A test script is provided in `tests/auth.test.js` to demonstrate the authentication flow. To run the test:

1. Start the server
2. Run the test script:
   ```
   node tests/auth.test.js
   ```

## Security Features

- Password hashing with bcrypt
- JWT for stateless authentication
- Protected routes with middleware
- Role-based authorization
- Input validation

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcrypt.js for password hashing
- validator.js for input validation