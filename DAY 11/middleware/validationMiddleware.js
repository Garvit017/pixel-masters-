const Student = require('../models/studentModel');

// Middleware for validating student creation
const validateStudentCreation = (req, res, next) => {
  const validationErrors = Student.validate(req.body);
  
  if (validationErrors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: validationErrors
    });
  }
  
  next();
};

// Middleware for validating student update
const validateStudentUpdate = (req, res, next) => {
  // For updates, we only validate the fields that are provided
  const fieldsToValidate = {};
  const allowedFields = ['name', 'email', 'age', 'grade'];
  
  allowedFields.forEach(field => {
    if (req.body[field] !== undefined) {
      fieldsToValidate[field] = req.body[field];
    }
  });
  
  const validationErrors = Student.validate(fieldsToValidate);
  
  if (validationErrors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: validationErrors
    });
  }
  
  next();
};

// Middleware for checking if student exists
const checkStudentExists = (req, res, next) => {
  const studentData = require('../data/studentData');
  const student = studentData.getStudentById(req.params.id);
  
  if (!student) {
    return res.status(404).json({
      success: false,
      message: `Student with ID ${req.params.id} not found`
    });
  }
  
  // Attach student to request object for later use
  req.student = student;
  next();
};

module.exports = {
  validateStudentCreation,
  validateStudentUpdate,
  checkStudentExists
};