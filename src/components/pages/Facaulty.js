import React from 'react';
import { Link } from 'react-router-dom';
import facaultyData from '../../data/facaulty.json';
import '../../stylesheets/facaulty.css';

function Facaulty() {
  return (
    <>
      <div className="facaulty-page-background" />
      <div className="facaulty-container">
        <div className="facaulty-header">
          <h1 className="facaulty-title">Program Facaulty and Staff</h1>
        </div>
        <div className="facaulty-grid">
          {facaultyData.facaulty.map((member) => (
            <Link 
              to={`/facaulty/${member.id}`} 
              key={member.id}
              className="facaulty-card"
            >
              <img 
                src={member.image} 
                alt={member.name} 
                className="facaulty-image"
              />
              <div className="facaulty-info">
                <h2 className="facaulty-name">{member.name}</h2>
                <p className="facaulty-role">{member.role}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Facaulty; 