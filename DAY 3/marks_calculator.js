// Simple Marks Calculator in JavaScript

// Student class to store student information and calculate results
class Student {
    constructor(name) {
        this.name = name;
        this.subjects = [];
    }

    // Add a subject with marks
    addSubject(name, maxMarks, obtainedMarks) {
        this.subjects.push({
            name: name,
            maxMarks: maxMarks,
            obtainedMarks: obtainedMarks
        });
    }

    // Calculate total marks
    calculateTotalMarks() {
        let totalObtained = 0;
        let totalMax = 0;

        this.subjects.forEach(subject => {
            totalObtained += subject.obtainedMarks;
            totalMax += subject.maxMarks;
        });

        return {
            obtained: totalObtained,
            max: totalMax
        };
    }

    // Calculate percentage
    calculatePercentage() {
        const totals = this.calculateTotalMarks();
        if (totals.max === 0) return 0;
        return (totals.obtained / totals.max) * 100;
    }

    // Determine grade based on percentage
    calculateGrade() {
        const percentage = this.calculatePercentage();

        if (percentage >= 90) return { grade: 'A+', description: 'Pass with Distinction' };
        if (percentage >= 80) return { grade: 'A', description: 'Pass with Excellence' };
        if (percentage >= 70) return { grade: 'B', description: 'Pass with Very Good' };
        if (percentage >= 60) return { grade: 'C', description: 'Pass with Good' };
        if (percentage >= 50) return { grade: 'D', description: 'Pass' };
        return { grade: 'F', description: 'Fail' };
    }

    // Print the result card
    printResultCard() {
        const totals = this.calculateTotalMarks();
        const percentage = this.calculatePercentage();
        const gradeInfo = this.calculateGrade();

        console.log('\n===== STUDENT RESULT CARD =====');
        console.log(`Name: ${this.name}`);
        console.log('\nSubject-wise Marks:');
        console.log('Subject\t\tMax Marks\tObtained\tPercentage');
        console.log('--------------------------------------------------------');

        this.subjects.forEach(subject => {
            const subjectPercentage = (subject.obtainedMarks / subject.maxMarks) * 100;
            console.log(`${subject.name.padEnd(15)}\t${subject.maxMarks}\t\t${subject.obtainedMarks}\t\t${subjectPercentage.toFixed(2)}%`);
        });

        console.log('--------------------------------------------------------');
        console.log(`Total\t\t${totals.max}\t\t${totals.obtained}\t\t${percentage.toFixed(2)}%`);
        console.log(`\nGrade: ${gradeInfo.grade}`);
        console.log(`Result: ${gradeInfo.description}`);
        console.log('===============================\n');
    }
}

// Example usage
function main() {
    // Create a student
    const student1 = new Student('John Doe');

    // Add subjects with marks
    student1.addSubject('Mathematics', 100, 85);
    student1.addSubject('Science', 100, 78);
    student1.addSubject('English', 100, 92);
    student1.addSubject('History', 100, 65);
    student1.addSubject('Computer Science', 100, 88);

    // Print result card
    student1.printResultCard();

    // Another example
    const student2 = new Student('Jane Smith');
    student2.addSubject('Mathematics', 100, 95);
    student2.addSubject('Science', 100, 92);
    student2.addSubject('English', 100, 88);
    student2.addSubject('History', 100, 78);
    student2.addSubject('Computer Science', 100, 98);

    // Print result card
    student2.printResultCard();
}

// Run the main function
main();

// You can run this file with Node.js by typing:
// node marks_calculator.js