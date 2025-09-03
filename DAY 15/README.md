# Full-Stack Authentication Application

A complete authentication system with JWT, protected routes, and user management built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- User registration and login
- JWT-based authentication
- Protected routes in React
- User profile management
- Responsive design

## Project Structure

### Backend

- **Server**: Express.js REST API
- **Authentication**: JWT implementation with bcrypt password hashing
- **Database**: MongoDB with Mongoose ODM
- **API Routes**: Registration, login, profile management

### Frontend

- **Framework**: React with hooks
- **Routing**: React Router v6 with protected routes
- **State Management**: Context API with custom auth provider
- **API Integration**: Axios for API requests
- **UI**: Custom CSS with responsive design

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

#### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=30d
   NODE_ENV=development
   ```

4. Start the server:
   ```
   npm run dev
   ```

#### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

## Usage

### Authentication Flow

1. **Register**: Create a new account with name, email, and password
2. **Login**: Authenticate with email and password
3. **Protected Routes**: Access restricted content only when authenticated
4. **Profile Management**: Update user information and password

### API Endpoints

- **POST /api/auth/register**: Register a new user
- **POST /api/auth/login**: Authenticate user and get token
- **GET /api/auth/me**: Get current user profile (protected)
- **PUT /api/auth/updateprofile**: Update user profile (protected)

## Testing

To test the authentication flow:

1. Register a new user account
2. Log in with the registered credentials
3. Try accessing protected routes (Dashboard, Profile)
4. Log out and verify that protected routes redirect to login
5. Test form validations and error handling

## Security Features

- JWT token authentication
- Password hashing with bcrypt
- Protected API routes with middleware
- Form validation
- HTTP-only cookies (optional enhancement)

## Technologies Used

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcryptjs

### Frontend
- React
- React Router
- Context API
- Axios
- React Toastify