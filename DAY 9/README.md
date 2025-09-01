# Student Directory Application

## Overview

This Student Directory application demonstrates the use of React's `useEffect` hook and the Fetch API to retrieve and display student data from a backend server. The application showcases how to implement data fetching, state management, and search functionality in a React application.

## Features

- Display a list of students with their basic information
- Toggle detailed view for each student
- Search/filter students by name or email
- Responsive design with light/dark mode support
- Error handling and loading states

## Project Structure

```
DAY 9/
├── backend/                 # Node.js backend server
│   ├── data/                # Data storage
│   │   └── students.js      # Student data
│   ├── package.json         # Backend dependencies
│   └── server.js            # Express server setup
│
└── frontend/               # React frontend application
    ├── public/              # Static assets
    ├── src/                 # Source code
    │   ├── components/      # React components
    │   │   ├── Student.jsx       # Individual student component
    │   │   ├── Student.css       # Student component styles
    │   │   ├── StudentList.jsx   # List component with useEffect & Fetch
    │   │   └── StudentList.css   # StudentList component styles
    │   ├── App.jsx          # Main application component
    │   ├── App.css          # Application styles
    │   ├── main.jsx         # Application entry point
    │   └── index.css        # Global styles
    ├── index.html           # HTML template
    ├── package.json         # Frontend dependencies
    └── vite.config.js       # Vite configuration
```

## Demonstrated React Concepts

### 1. useEffect Hook

The application demonstrates the use of the `useEffect` hook for:
- Data fetching when a component mounts
- Managing loading and error states
- Implementing cleanup to prevent memory leaks

### 2. Fetch API

The application shows how to:
- Make HTTP requests to a backend API
- Handle responses and errors
- Process and display fetched data

## Running the Application

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd "DAY 9/backend"
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the server:
   ```
   npm start
   ```
   The server will run on http://localhost:3000

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd "DAY 9/frontend"
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```
   The application will be available at http://localhost:5173

## Testing

The application includes tests for both the `Student` and `StudentList` components. To run the tests:

```
cd "DAY 9/frontend"
npm test
```

## Learning Resources

For more information about the concepts demonstrated in this application, refer to:

- [USEEFFECT_AND_FETCH_CONCEPTS.md](./USEEFFECT_AND_FETCH_CONCEPTS.md) - Detailed documentation of useEffect and Fetch API concepts
- [React Documentation - useEffect](https://react.dev/reference/react/useEffect)
- [MDN Web Docs - Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

## Next Steps

Possible enhancements for this application:

1. Add form to create new students
2. Implement editing and deletion of student records
3. Add pagination for large datasets
4. Implement sorting by different fields
5. Add authentication and user accounts
6. Expand the backend with a database instead of in-memory data