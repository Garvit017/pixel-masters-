# Real-time Chat Application

A full-stack real-time chat application built with the MERN stack (MongoDB, Express, React, Node.js) and Socket.io.

## Features

- Real-time messaging using Socket.io
- User authentication with JWT
- Global chat room
- Private messaging between users
- Online/offline status indicators
- Typing indicators
- Message history persistence with MongoDB
- Responsive design

## Tech Stack

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- Socket.io
- JWT Authentication
- Bcrypt for password hashing

### Frontend
- React (with Vite)
- Redux Toolkit for state management
- React Router for navigation
- Socket.io client
- React Bootstrap for UI components
- Axios for API requests

## Project Structure

```
├── backend/             # Backend server code
│   ├── config/          # Configuration files
│   ├── middleware/      # Express middleware
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   └── server.js        # Entry point
│
└── frontend/           # Frontend React application
    ├── public/          # Static files
    └── src/             # React source code
        ├── components/  # Reusable components
        ├── screens/     # Page components
        ├── slices/      # Redux slices
        └── services/    # API and socket services
```

## Setup and Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=30d
   ```

4. Start the backend server:
   ```
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the frontend development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/status` - Update user status
- `PUT /api/users/profile` - Update user profile

### Messages
- `POST /api/messages` - Send a new message
- `GET /api/messages/:userId` - Get messages between current user and another user
- `GET /api/messages/global` - Get global chat messages

## Socket.io Events

### Client to Server
- `sendMessage` - Send a message
- `typing` - Indicate user is typing

### Server to Client
- `message` - Receive a message
- `userList` - Get list of online users
- `userStatus` - User status change notification
- `typing` - User typing notification