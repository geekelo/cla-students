import React from 'react';
import { Link } from 'react-router-dom';
import facultyData from '../../data/faculty.json';
import '../../stylesheets/faculty.css';

function Faculty() {
  return (
    <>
      <div className="faculty-page-background" />
      <div className="faculty-container">
        <div className="faculty-header">
          <h1 className="faculty-title">Program faculty and Staff</h1>
        </div>
        <div className="faculty-grid">
          {facultyData.faculty.map((member) => (
            <Link 
              to={`/faculty/${member.id}`} 
              key={member.id}
              className="faculty-card"
            >
              <img 
                src={member.image} 
                alt={member.name} 
                className="faculty-image"
              />
              <div className="faculty-info">
                <h2 className="faculty-name">{member.name}</h2>
                <p className="faculty-role">{member.role}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Faculty; 