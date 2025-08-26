const express = require('express');
const cors = require('cors');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample student data
const students = [
  {
    id: 1,
    name: 'John Doe',
    age: 20,
    grade: 'A',
    major: 'Computer Science'
  },
  {
    id: 2,
    name: 'Jane Smith',
    age: 21,
    grade: 'B+',
    major: 'Mathematics'
  },
  {
    id: 3,
    name: 'Bob Johnson',
    age: 19,
    grade: 'A-',
    major: 'Physics'
  },
  {
    id: 4,
    name: 'Alice Williams',
    age: 22,
    grade: 'A+',
    major: 'Biology'
  },
  {
    id: 5,
    name: 'Charlie Brown',
    age: 20,
    grade: 'B',
    major: 'Chemistry'
  }
];

// API Routes

// GET /api/students - Returns all students
app.get('/api/students', (req, res) => {
  res.json(students);
});

// GET /api/students/:id - Returns a specific student by ID
app.get('/api/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find(s => s.id === id);
  
  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }
  
  res.json(student);
});

// Root route
app.get('/', (req, res) => {
  res.send('Student API - Use /api/students to get the list of students');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});