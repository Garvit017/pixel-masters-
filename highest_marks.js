// JavaScript program to find highest marks from an array

// Method 1: Using Math.max() with spread operator
function findHighestMarks(marks) {
    if (!Array.isArray(marks) || marks.length === 0) {
        return null; // Return null for invalid or empty arrays
    }
    
    return Math.max(...marks);
}

// Method 2: Using a loop (traditional approach)
function findHighestMarksUsingLoop(marks) {
    if (!Array.isArray(marks) || marks.length === 0) {
        return null; // Return null for invalid or empty arrays
    }
    
    let highest = marks[0]; // Start with the first element
    
    for (let i = 1; i < marks.length; i++) {
        if (marks[i] > highest) {
            highest = marks[i];
        }
    }
    
    return highest;
}

// Method 3: Using array reduce method
function findHighestMarksUsingReduce(marks) {
    if (!Array.isArray(marks) || marks.length === 0) {
        return null; // Return null for invalid or empty arrays
    }
    
    return marks.reduce((highest, current) => {
        return current > highest ? current : highest;
    }, marks[0]);
}

// Sample data: Array of student marks
const studentMarks = [85, 92, 78, 95, 88, 76, 90, 83];

// Find highest marks using different methods
const highestMarksMath = findHighestMarks(studentMarks);
const highestMarksLoop = findHighestMarksUsingLoop(studentMarks);
const highestMarksReduce = findHighestMarksUsingReduce(studentMarks);

// Print results
console.log("Student Marks:", studentMarks);
console.log("Highest Marks (using Math.max):", highestMarksMath);
console.log("Highest Marks (using loop):", highestMarksLoop);
console.log("Highest Marks (using reduce):", highestMarksReduce);

// Example with student objects
const students = [
    { name: "Alice", marks: 85 },
    { name: "Bob", marks: 92 },
    { name: "Charlie", marks: 78 },
    { name: "Diana", marks: 95 },
    { name: "Edward", marks: 88 }
];

// Find student with highest marks
function findStudentWithHighestMarks(students) {
    if (!Array.isArray(students) || students.length === 0) {
        return null;
    }
    
    return students.reduce((highest, current) => {
        return current.marks > highest.marks ? current : highest;
    }, students[0]);
}

const topStudent = findStudentWithHighestMarks(students);
console.log("\nStudent with highest marks:", topStudent.name, "with", topStudent.marks, "marks");