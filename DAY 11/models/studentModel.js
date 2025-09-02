const { v4: uuidv4 } = require('uuid');

class Student {
  constructor(name, email, age, grade) {
    this.id = uuidv4();
    this.name = name;
    this.email = email;
    this.age = age;
    this.grade = grade;
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  update(data) {
    const allowedFields = ['name', 'email', 'age', 'grade'];
    
    allowedFields.forEach(field => {
      if (data[field] !== undefined) {
        this[field] = data[field];
      }
    });
    
    this.updatedAt = new Date().toISOString();
  }

  static validate(data) {
    const errors = [];
    
    // Name validation
    if (!data.name) {
      errors.push('Name is required');
    } else if (typeof data.name !== 'string') {
      errors.push('Name must be a string');
    }
    
    // Email validation
    if (!data.email) {
      errors.push('Email is required');
    } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      errors.push('Email format is invalid');
    }
    
    // Age validation
    if (data.age !== undefined) {
      if (isNaN(Number(data.age)) || Number(data.age) < 0) {
        errors.push('Age must be a positive number');
      }
    }
    
    // Grade validation
    if (data.grade !== undefined) {
      if (typeof data.grade !== 'string') {
        errors.push('Grade must be a string');
      }
    }
    
    return errors;
  }
}

module.exports = Student;