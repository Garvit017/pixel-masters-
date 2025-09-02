const Student = require('../models/studentModel');

describe('Student Model', () => {
  let studentData;

  beforeEach(() => {
    studentData = {
      name: 'Test Student',
      email: 'test@example.com',
      age: 18,
      grade: 'A'
    };
  });

  test('should create a student instance with valid data', () => {
    const student = new Student(studentData);
    
    expect(student).toHaveProperty('id');
    expect(student).toHaveProperty('name', 'Test Student');
    expect(student).toHaveProperty('email', 'test@example.com');
    expect(student).toHaveProperty('age', 18);
    expect(student).toHaveProperty('grade', 'A');
    expect(student).toHaveProperty('createdAt');
    expect(student).toHaveProperty('updatedAt');
  });

  test('should update student properties', () => {
    const student = new Student(studentData);
    const updateData = {
      name: 'Updated Name',
      email: 'updated@example.com',
      age: 19,
      grade: 'B'
    };
    
    const originalCreatedAt = student.createdAt;
    const originalId = student.id;
    
    student.update(updateData);
    
    expect(student.name).toBe('Updated Name');
    expect(student.email).toBe('updated@example.com');
    expect(student.age).toBe(19);
    expect(student.grade).toBe('B');
    expect(student.id).toBe(originalId); // ID should not change
    expect(student.createdAt).toBe(originalCreatedAt); // createdAt should not change
    expect(student.updatedAt).not.toBe(originalCreatedAt); // updatedAt should change
  });

  test('validate should return errors for missing required fields', () => {
    const invalidData = {};
    const errors = Student.validate(invalidData);
    
    expect(errors).toContain('Name is required');
    expect(errors).toContain('Email is required');
    expect(errors).toContain('Grade is required');
  });

  test('validate should return error for invalid email format', () => {
    const invalidData = {
      name: 'Test Student',
      email: 'invalid-email',
      grade: 'A'
    };
    
    const errors = Student.validate(invalidData);
    
    expect(errors).toContain('Email must be a valid email address');
  });

  test('validate should return error for invalid age', () => {
    const invalidData = {
      name: 'Test Student',
      email: 'test@example.com',
      age: 3, // Too young
      grade: 'A'
    };
    
    const errors = Student.validate(invalidData);
    
    expect(errors).toContain('Age must be between 5 and 100');
    
    invalidData.age = 101; // Too old
    const errors2 = Student.validate(invalidData);
    
    expect(errors2).toContain('Age must be between 5 and 100');
  });

  test('validate should return error for invalid grade', () => {
    const invalidData = {
      name: 'Test Student',
      email: 'test@example.com',
      grade: 'Z' // Invalid grade
    };
    
    const errors = Student.validate(invalidData);
    
    expect(errors).toContain('Grade must be one of: A, B, C, D, F, A+, B+, C+, D+');
  });

  test('validate should return empty array for valid data', () => {
    const errors = Student.validate(studentData);
    
    expect(errors).toEqual([]);
  });
});