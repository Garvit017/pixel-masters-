# Notes App - Full Stack CRUD Application

A full-stack Notes application with CRUD functionality built using the MERN stack (MongoDB, Express, React, Node.js).

## Features

- Create, read, update, and delete notes
- Search notes by title, content, or category
- Filter notes by category
- Mark notes as complete/incomplete
- Responsive design for mobile and desktop

## Project Structure

```
├── backend/               # Backend Express server
│   ├── config/           # Configuration files
│   ├── controllers/      # Request handlers
│   ├── middleware/       # Express middleware
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── .env              # Environment variables
│   ├── package.json      # Backend dependencies
│   └── server.js         # Entry point
│
└── frontend/             # React frontend
    ├── public/           # Static files
    ├── src/              # Source files
    │   ├── components/   # React components
    │   ├── services/     # API services
    │   ├── styles/       # CSS files
    │   ├── utils/        # Utility functions
    │   ├── App.js        # Main App component
    │   └── index.js      # Entry point
    └── package.json      # Frontend dependencies
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)

### Installation

1. Clone the repository

2. Install backend dependencies:
   ```
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```
   cd frontend
   npm install
   ```

4. Configure environment variables:
   - Create a `.env` file in the backend directory with the following variables:
     ```
     PORT=5000
     MONGODB_URI=mongodb://localhost:27017/notesapp
     NODE_ENV=development
     ```

### Running the Application

1. Start the backend server:
   ```
   cd backend
   npm run dev
   ```

2. Start the frontend development server:
   ```
   cd frontend
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

| Method | Endpoint        | Description                |
|--------|----------------|----------------------------|
| GET    | /api/notes     | Get all notes              |
| GET    | /api/notes/:id | Get a specific note        |
| POST   | /api/notes     | Create a new note          |
| PUT    | /api/notes/:id | Update an existing note    |
| DELETE | /api/notes/:id | Delete a note              |

## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Cors
- Dotenv

### Frontend
- React
- Axios
- React Icons