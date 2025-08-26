const Student = require('./Student');

// Initial student data
let students = [
  new Student(
    '1',
    'John Doe',
    'john.doe@example.com',
    18,
    'A'
  ),
  new Student(
    '2',
    'Jane Smith',
    'jane.smith@example.com',
    17,
    'B'
  ),
  new Student(
    '3',
    'Bob Johnson',
    'bob.johnson@example.com',
    19,
    'C'
  )
];

module.exports = {
  getAll: () => students,
  getById: (id) => students.find(student => student.id === id),
  create: (studentData) => {
    const newStudent = new Student(
      null,
      studentData.name,
      studentData.email,
      studentData.age,
      studentData.grade
    );
    students.push(newStudent);
    return newStudent;
  },
  update: (id, updatedData) => {
    const index = students.findIndex(student => student.id === id);
    if (index === -1) return null;
    
    const updatedStudent = {
      ...students[index],
      ...updatedData,
      id: students[index].id, // Ensure ID doesn't change
      updatedAt: new Date().toISOString()
    };
    
    students[index] = updatedStudent;
    return updatedStudent;
  },
  delete: (id) => {
    const index = students.findIndex(student => student.id === id);
    if (index === -1) return false;
    
    students.splice(index, 1);
    return true;
  }
};