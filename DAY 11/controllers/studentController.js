const studentData = require('../models/studentData');
const Student = require('../models/Student');

// Controller methods for student CRUD operations
const studentController = {
  // Get all students
  getAllStudents: (req, res) => {
    try {
      const students = studentData.getAll();
      res.status(200).json({
        success: true,
        count: students.length,
        data: students
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  },

  // Get single student by ID
  getStudentById: (req, res) => {
    try {
      const student = studentData.getById(req.params.id);
      
      if (!student) {
        return res.status(404).json({
          success: false,
          error: 'Student not found'
        });
      }

      res.status(200).json({
        success: true,
        data: student
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  },

  // Create new student
  createStudent: (req, res) => {
    try {
      const { name, email, age, grade } = req.body;
      
      // Create new student (validation handled by middleware)
      const newStudent = studentData.create({ name, email, age, grade });
      
      res.status(201).json({
        success: true,
        data: newStudent
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  },

  // Update student
  updateStudent: (req, res) => {
    try {
      // Check if student exists
      const student = studentData.getById(req.params.id);
      if (!student) {
        return res.status(404).json({
          success: false,
          error: 'Student not found'
        });
      }

      // Update student (validation handled by middleware)
      const updatedStudent = studentData.update(req.params.id, req.body);
      
      res.status(200).json({
        success: true,
        data: updatedStudent
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  },

  // Delete student
  deleteStudent: (req, res) => {
    try {
      // Check if student exists
      const student = studentData.getById(req.params.id);
      if (!student) {
        return res.status(404).json({
          success: false,
          error: 'Student not found'
        });
      }

      // Delete student
      const deleted = studentData.delete(req.params.id);
      
      if (deleted) {
        res.status(200).json({
          success: true,
          message: 'Student deleted successfully'
        });
      } else {
        res.status(500).json({
          success: false,
          error: 'Failed to delete student'
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }
};

module.exports = studentController;