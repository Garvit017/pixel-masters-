import { useState } from 'react';
import './Student.css';

const Student = ({ student }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="student-card">
      <div className="student-header">
        <h3 className="student-name">{student.name}</h3>
        <p className="student-email">{student.email}</p>
      </div>
      
      <button 
        className="details-button" 
        onClick={toggleDetails}
      >
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>
      
      {showDetails && (
        <div className="student-details">
          <p><strong>Age:</strong> {student.age}</p>
          <p><strong>Grade:</strong> {student.grade}</p>
          <div className="student-subjects">
            <strong>Subjects:</strong>
            <ul>
              {student.subjects.map((subject, index) => (
                <li key={index}>{subject}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Student;