import { useState, useEffect } from 'react';
import Student from './Student';
import './StudentList.css';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // This effect will run once when the component mounts
    const fetchStudents = async () => {
      try {
        setLoading(true);
        // Fetch data from our backend API
        const response = await fetch('http://localhost:3000/api/students');
        
        // Check if the response is ok (status in the range 200-299)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        // Parse the JSON response
        const data = await response.json();
        
        // Update state with the fetched data
        setStudents(data);
        setError(null);
      } catch (err) {
        setError(`Failed to fetch students: ${err.message}`);
        setStudents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();

    // The empty dependency array means this effect runs once on mount
    // and not on subsequent re-renders
  }, []);

  // Filter students based on search term
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  if (loading) {
    return <div className="loading">Loading students...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="student-list-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      
      {filteredStudents.length === 0 ? (
        <p className="no-results">No students found matching your search.</p>
      ) : (
        <div className="student-list">
          {filteredStudents.map(student => (
            <Student key={student.id} student={student} />
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentList;