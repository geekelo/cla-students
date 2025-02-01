import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import facaultyData from '../../data/facaulty.json';
import '../../stylesheets/facaulty.css';

function FacaultyDetail() {
  const { id } = useParams();
  const member = facaultyData.facaulty.find(f => f.id === parseInt(id));

  if (!member) {
    return <div>Facaulty member not found</div>;
  }

  return (
    <>
      <div className="facaulty-page-background" />
      <div className="facaulty-detail-container">
        <Link to="/facaulty" className="back-button">
          <FontAwesomeIcon icon={faArrowLeft} />
          Back to Facaulty
        </Link>
        <div className="facaulty-detail-header">
          <div className="facaulty-detail-image">
            <img src={member.image} alt={member.name} />
          </div>
          <div className="facaulty-detail-info">
            <h1 className="facaulty-detail-name">{member.name}</h1>
            <h2 className="facaulty-detail-role">{member.role}</h2>
            <div className="facaulty-detail-bio">
              <p>{member.bio}</p>
            </div>
            {member.additionalInfo && (
              <div className="facaulty-detail-additional">
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

export default FacaultyDetail; 