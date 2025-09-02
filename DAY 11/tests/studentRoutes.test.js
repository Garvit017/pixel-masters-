const request = require('supertest');
const express = require('express');
const studentRoutes = require('../routes/studentRoutes');
const studentData = require('../data/studentData');

// Mock the studentData module
jest.mock('../data/studentData');

const app = express();
app.use(express.json());
app.use('/api/students', studentRoutes);

describe('Student API Routes', () => {
  let mockStudent;
  
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    
    mockStudent = {
      id: '123456',
      name: 'Test Student',
      email: 'test@example.com',
      age: 18,
      grade: 'A',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  });
  
  describe('GET /api/students', () => {
    test('should return all students', async () => {
      studentData.getAllStudents.mockReturnValue([mockStudent]);
      
      const res = await request(app).get('/api/students');
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.count).toBe(1);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].id).toBe(mockStudent.id);
    });
    
    test('should filter students by name', async () => {
      studentData.getAllStudents.mockReturnValue([mockStudent]);
      
      const res = await request(app).get('/api/students?name=Test');
      
      expect(res.statusCode).toBe(200);
      expect(studentData.getAllStudents).toHaveBeenCalledWith({ name: 'Test' });
    });
    
    test('should handle errors', async () => {
      studentData.getAllStudents.mockImplementation(() => {
        throw new Error('Test error');
      });
      
      const res = await request(app).get('/api/students');
      
      expect(res.statusCode).toBe(500);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('Failed to fetch students');
    });
  });
  
  describe('GET /api/students/:id', () => {
    test('should return a student by id', async () => {
      studentData.getStudentById.mockReturnValue(mockStudent);
      
      const res = await request(app).get(`/api/students/${mockStudent.id}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.id).toBe(mockStudent.id);
    });
    
    test('should return 404 if student not found', async () => {
      studentData.getStudentById.mockReturnValue(null);
      
      const res = await request(app).get('/api/students/nonexistent');
      
      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });
  
  describe('POST /api/students', () => {
    test('should create a new student', async () => {
      studentData.createStudent.mockReturnValue(mockStudent);
      
      const res = await request(app)
        .post('/api/students')
        .send({
          name: 'Test Student',
          email: 'test@example.com',
          age: 18,
          grade: 'A'
        });
      
      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.id).toBe(mockStudent.id);
    });
    
    test('should return 400 for invalid data', async () => {
      const res = await request(app)
        .post('/api/students')
        .send({
          name: 'Test Student',
          // Missing email and grade
        });
      
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });
  
  describe('PUT /api/students/:id', () => {
    test('should update a student', async () => {
      studentData.getStudentById.mockReturnValue(mockStudent);
      studentData.updateStudent.mockReturnValue({
        ...mockStudent,
        name: 'Updated Name'
      });
      
      const res = await request(app)
        .put(`/api/students/${mockStudent.id}`)
        .send({
          name: 'Updated Name',
          email: 'test@example.com',
          grade: 'A'
        });
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe('Updated Name');
    });
    
    test('should return 404 if student not found', async () => {
      studentData.getStudentById.mockReturnValue(null);
      
      const res = await request(app)
        .put('/api/students/nonexistent')
        .send({
          name: 'Updated Name',
          email: 'test@example.com',
          grade: 'A'
        });
      
      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });
  
  describe('DELETE /api/students/:id', () => {
    test('should delete a student', async () => {
      studentData.getStudentById.mockReturnValue(mockStudent);
      studentData.deleteStudent.mockReturnValue(true);
      
      const res = await request(app).delete(`/api/students/${mockStudent.id}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(studentData.deleteStudent).toHaveBeenCalledWith(mockStudent.id);
    });
    
    test('should return 404 if student not found', async () => {
      studentData.getStudentById.mockReturnValue(null);
      
      const res = await request(app).delete('/api/students/nonexistent');
      
      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
    });
    
    test('should handle deletion failure', async () => {
      studentData.getStudentById.mockReturnValue(mockStudent);
      studentData.deleteStudent.mockReturnValue(false);
      
      const res = await request(app).delete(`/api/students/${mockStudent.id}`);
      
      expect(res.statusCode).toBe(500);
      expect(res.body.success).toBe(false);
    });
  });
});