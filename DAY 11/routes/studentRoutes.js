const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { validateStudentData } = require('../middleware/validationMiddleware');

// GET all students
router.get('/', studentController.getAllStudents);

// GET single student by ID
router.get('/:id', studentController.getStudentById);

// POST create new student
router.post('/', validateStudentData, studentController.createStudent);

// PUT update student
router.put('/:id', validateStudentData, studentController.updateStudent);

// DELETE student
router.delete('/:id', studentController.deleteStudent);

module.exports = router;