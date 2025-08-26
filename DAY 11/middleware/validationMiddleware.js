const Student = require('../models/Student');

// Middleware for validating student data in requests
const validateStudentData = (req, res, next) => {
  // Skip validation for GET and DELETE requests
  if (['GET', 'DELETE'].includes(req.method)) {
    return next();
  }

  const validationErrors = Student.validate(req.body);
  
  if (validationErrors.length > 0) {
    return res.status(400).json({
      success: false,
      errors: validationErrors
    });
  }
  
  next();
};

module.exports = { validateStudentData };