import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import facultyData from '../../data/faculty.json';
import '../../stylesheets/faculty.css';

function FacultyDetail() {
  const { id } = useParams();
  const member = facultyData.faculty.find(f => f.id === parseInt(id));

  if (!member) {
    return <div>faculty member not found</div>;
  }

  return (
    <>
      <div className="faculty-page-background" />
      <div className="faculty-detail-container">
        <Link to="/faculty" className="back-button">
          <FontAwesomeIcon icon={faArrowLeft} />
          Back to Faculty
        </Link>
        <div className="faculty-detail-header">
          <div className="faculty-detail-image">
            <img src={member.image} alt={member.name} />
          </div>
          <div className="faculty-detail-info">
            <h1 className="faculty-detail-name">{member.name}</h1>
            <h2 className="faculty-detail-role">{member.role}</h2>
            <div className="faculty-detail-bio">
              <p>{member.bio}</p>
            </div>
            {member.additionalInfo && (
              <div className="faculty-detail-additional">
                {member.additionalInfo.map((info, index) => (
                  <p key={index}>{info}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default FacultyDetail; 