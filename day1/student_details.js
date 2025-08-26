// Define a student object with various properties
const student = {
    id: "S12345",
    name: "John Doe",
    age: 20,
    email: "john.doe@example.com",
    phone: "123-456-7890",
    address: {
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zipCode: "10001"
    },
    courses: [
        { name: "Mathematics", code: "MATH101", grade: "A" },
        { name: "Computer Science", code: "CS102", grade: "A-" },
        { name: "Physics", code: "PHY103", grade: "B+" },
        { name: "English Literature", code: "ENG104", grade: "B" }
    ],
    gpa: 3.7,
    isEnrolled: true,
    enrollmentDate: new Date(2022, 8, 1), // September 1, 2022
    graduationYear: 2026,
    achievements: ["Dean's List 2022", "Programming Competition Winner", "Academic Scholarship Recipient"]
};

// Function to print student details
function printStudentDetails(student) {
    console.log("\n===== STUDENT DETAILS =====");
    console.log(`Name: ${student.name}`);
    console.log(`ID: ${student.id}`);
    console.log(`Age: ${student.age}`);
    console.log(`Email: ${student.email}`);
    console.log(`Phone: ${student.phone}`);
    console.log(`Address: ${student.address.street}, ${student.address.city}, ${student.address.state} ${student.address.zipCode}`);
    console.log(`GPA: ${student.gpa}`);
    console.log(`Status: ${student.isEnrolled ? 'Enrolled' : 'Not Enrolled'}`);
    console.log(`Enrollment Date: ${student.enrollmentDate.toLocaleDateString()}`);
    console.log(`Expected Graduation: ${student.graduationYear}`);
    
    console.log("\nAchievements:");
    student.achievements.forEach((achievement, index) => {
        console.log(`${index + 1}. ${achievement}`);
    });
    
    console.log("\nCourses & Grades:");
    console.log("Course Code\tCourse Name\t\tGrade");
    console.log("-------------------------------------------");
    student.courses.forEach(course => {
        console.log(`${course.code}\t\t${course.name.padEnd(20)}\t${course.grade}`);
    });
    console.log("===========================\n");
}

// Call the function to print student details
printStudentDetails(student);

// You can run this file with Node.js by typing:
// node student_details.js