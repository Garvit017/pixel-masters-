const express = require('express');
const router = express.Router();
const studentData = require('../data/studentData');
const Student = require('../models/studentModel');
const { validateStudentCreation, validateStudentUpdate, checkStudentExists } = require('../middleware/validationMiddleware');

// POST create new student
// POST /api/students
router.post('/', validateStudentCreation, (req, res) => {
  try {
    const newStudent = studentData.createStudent(req.body);
    
    res.status(201).json({
      success: true,
      data: newStudent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create student',
      error: error.message
    });
  }
});

// GET all students
// GET /api/students
// GET /api/students?name=John (with optional filtering)
router.get('/', (req, res) => {
  try {
    let students = studentData.getAllStudents();
    
    // Filter by name (case-insensitive partial match)
    if (req.query.name) {
      const nameFilter = req.query.name.toLowerCase();
      students = students.filter(student => 
        student.name.toLowerCase().includes(nameFilter)
      );
    }
    
    // Filter by email (case-insensitive partial match)
    if (req.query.email) {
      const emailFilter = req.query.email.toLowerCase();
      students = students.filter(student => 
        student.email.toLowerCase().includes(emailFilter)
      );
    }
    
    // Filter by grade (exact match)
    if (req.query.grade) {
      students = students.filter(student => 
        student.grade === req.query.grade
      );
    }
    
    res.status(200).json({
      success: true,
      count: students.length,
      data: students
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve students',
      error: error.message
    });
  }
});

// GET single student by ID
// GET /api/students/:id
router.get('/:id', (req, res) => {
  try {
    const student = studentData.getStudentById(req.params.id);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: `Student with ID ${req.params.id} not found`
      });
    }
    
    res.status(200).json({
      success: true,
      data: student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve student',
      error: error.message
    });
  }
});

// PUT update student
// PUT /api/students/:id
router.put('/:id', checkStudentExists, validateStudentUpdate, (req, res) => {
  try {
    // Update student
    const updatedStudent = studentData.updateStudent(req.params.id, req.body);
    
    res.status(200).json({
      success: true,
      data: updatedStudent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update student',
      error: error.message
    });
  }
});

// DELETE student
// DELETE /api/students/:id
router.delete('/:id', checkStudentExists, (req, res) => {
  try {
    // Delete student
    const deleted = studentData.deleteStudent(req.params.id);
    
    if (deleted) {
      res.status(200).json({
        success: true,
        message: `Student with ID ${req.params.id} deleted successfully`
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to delete student'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete student',
      error: error.message
    });
  }
});

module.exports = router;