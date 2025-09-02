const { validateStudentCreation, validateStudentUpdate, checkStudentExists } = require('../middleware/validationMiddleware');
const studentData = require('../data/studentData');

// Mock the studentData module
jest.mock('../data/studentData');

describe('Validation Middleware', () => {
  let req, res, next;
  
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    
    // Mock request, response, and next function
    req = {
      body: {},
      params: {}
    };
    
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    
    next = jest.fn();
  });
  
  describe('validateStudentCreation', () => {
    test('should call next() for valid student data', () => {
      req.body = {
        name: 'Test Student',
        email: 'test@example.com',
        grade: 'A'
      };
      
      validateStudentCreation(req, res, next);
      
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });
    
    test('should return 400 for missing required fields', () => {
      req.body = {
        name: 'Test Student'
        // Missing email and grade
      };
      
      validateStudentCreation(req, res, next);
      
      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        success: false,
        message: 'Validation failed'
      }));
    });
    
    test('should return 400 for invalid email format', () => {
      req.body = {
        name: 'Test Student',
        email: 'invalid-email',
        grade: 'A'
      };
      
      validateStudentCreation(req, res, next);
      
      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        success: false,
        errors: expect.arrayContaining(['Email must be a valid email address'])
      }));
    });
  });
  
  describe('validateStudentUpdate', () => {
    test('should call next() for valid update data', () => {
      req.body = {
        name: 'Updated Name',
        email: 'updated@example.com',
        grade: 'B'
      };
      
      validateStudentUpdate(req, res, next);
      
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });
    
    test('should call next() for partial update with valid data', () => {
      req.body = {
        name: 'Updated Name'
        // Only updating name
      };
      
      validateStudentUpdate(req, res, next);
      
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });
    
    test('should return 400 for invalid data', () => {
      req.body = {
        email: 'invalid-email',
        age: 3 // Too young
      };
      
      validateStudentUpdate(req, res, next);
      
      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        success: false,
        message: 'Validation failed'
      }));
    });
  });
  
  describe('checkStudentExists', () => {
    test('should call next() if student exists', () => {
      const mockStudent = { id: '123', name: 'Test Student' };
      studentData.getStudentById.mockReturnValue(mockStudent);
      
      req.params.id = '123';
      
      checkStudentExists(req, res, next);
      
      expect(studentData.getStudentById).toHaveBeenCalledWith('123');
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });
    
    test('should return 404 if student does not exist', () => {
      studentData.getStudentById.mockReturnValue(null);
      
      req.params.id = 'nonexistent';
      
      checkStudentExists(req, res, next);
      
      expect(studentData.getStudentById).toHaveBeenCalledWith('nonexistent');
      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        success: false,
        message: expect.stringContaining('not found')
      }));
    });
  });
});