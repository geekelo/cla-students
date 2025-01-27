import React from 'react';
import '../stylesheets/landing.css';

function Landing() {
  return (
    <div className="landing">
      <div className="overlay">
        <div className="content">
          <h1 className="title">CHRISTIAN LEADERSHIP ACADEMY</h1>
          <h2 className="subtitle">JJRS FOUNDATION EDUCATION SUPPORT INITIATIVE</h2>
          <p className="tagline">
            Our academy is committed to providing high-quality, faith-based training to students .
          </p>
          <a href="#apply" className="cta-button">
            APPLY HERE
          </a>
        </div>
      </div>
    </div>
  );
}

export default Landing;
