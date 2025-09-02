const Student = require('../models/studentModel');

// In-memory data store
let students = [
  new Student('John Doe', 'john.doe@example.com', 20, 'A'),
  new Student('Jane Smith', 'jane.smith@example.com', 22, 'B+'),
  new Student('Bob Johnson', 'bob.johnson@example.com', 21, 'A-'),
  new Student('Alice Brown', 'alice.brown@example.com', 19, 'B'),
  new Student('Charlie Davis', 'charlie.davis@example.com', 23, 'A+')
];

// Get all students
const getAllStudents = () => {
  return [...students];
};

// Get student by ID
const getStudentById = (id) => {
  return students.find(student => student.id === id);
};

// Create a new student
const createStudent = (studentData) => {
  const newStudent = new Student(
    studentData.name,
    studentData.email,
    studentData.age,
    studentData.grade
  );
  
  students.push(newStudent);
  return newStudent;
};

// Update a student
const updateStudent = (id, studentData) => {
  const studentIndex = students.findIndex(student => student.id === id);
  
  if (studentIndex === -1) {
    return null;
  }
  
  students[studentIndex].update(studentData);
  return students[studentIndex];
};

// Delete a student
const deleteStudent = (id) => {
  const initialLength = students.length;
  students = students.filter(student => student.id !== id);
  
  return initialLength !== students.length;
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
};