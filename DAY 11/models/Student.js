const { v4: uuidv4 } = require('uuid');

class Student {
  constructor(id, name, email, age, grade) {
    this.id = id || uuidv4();
    this.name = name;
    this.email = email;
    this.age = age;
    this.grade = grade;
    this.createdAt = new Date().toISOString();
  }

  static validate(studentData) {
    const errors = [];

    // Validate name
    if (!studentData.name) {
      errors.push('Name is required');
    } else if (typeof studentData.name !== 'string' || studentData.name.trim().length < 2) {
      errors.push('Name must be a string with at least 2 characters');
    }

    // Validate email
    if (!studentData.email) {
      errors.push('Email is required');
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(studentData.email)) {
      errors.push('Email is invalid');
    }

    // Validate age
    if (studentData.age !== undefined) {
      const age = Number(studentData.age);
      if (isNaN(age) || age < 5 || age > 100) {
        errors.push('Age must be a number between 5 and 100');
      }
    }

    // Validate grade
    if (studentData.grade !== undefined) {
      const validGrades = ['A', 'B', 'C', 'D', 'F'];
      if (!validGrades.includes(studentData.grade)) {
        errors.push(`Grade must be one of: ${validGrades.join(', ')}`);
      }
    }

    return errors;
  }
}

module.exports = Student;