import React from 'react';
import '../../stylesheets/programs.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBible, faHandsHelping, faUsers }from '@fortawesome/free-solid-svg-icons';


function Programs() {
  return (
    <>
      <div className="programs-page-background" />
      <div className="programs-container">
        <div className="programs-header">
          <h1 className="programs-title">Courses to be Offered</h1>
          <p className="programs-subtitle">Our Wide Array of Specialized Training Courses</p>
        </div>
        <div className="programs-cards">
          <div className="program-card">
            <div className="program-card-icon">
            <FontAwesomeIcon icon={faBible} className="form-icon" />
            </div>
            <h2 className="program-card-title">Believer-Beginners&apos; Class</h2>
            <p className="program-card-description">
              Build a Strong Foundation: Join our Believer-Beginners&apos; Class and embark on your journey of faith.
            </p>
          </div>
          
          <div className="program-card">
            <div className="program-card-icon">
            <FontAwesomeIcon icon={faHandsHelping} className="form-icon" />
            </div>
            <h2 className="program-card-title">Minister-Service Class</h2>
            <p className="program-card-description">
              The Minister-Service Class helps you to develop the skills and knowledge needed for effective ministry.
            </p>
          </div>
          
          <div className="program-card">
            <div className="program-card-icon">
            <FontAwesomeIcon icon={faUsers} className="form-icon" />
            </div>
            <h2 className="program-card-title">Leader-Managerial Class</h2>
            <p className="program-card-description">
              The Leader-Managerial Class gives you essential skills and strategies for successful management and effective leadership.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Programs; 