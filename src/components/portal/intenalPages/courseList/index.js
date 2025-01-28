import React, { useState } from 'react';
import '../../../../stylesheets/courses.css';
import ProgramCourses from './programCourses';
import ExtraCourses from './extraCourses';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faBookOpen } from '@fortawesome/free-solid-svg-icons';

function Courses() {
  const [activeTab, setActiveTab] = useState('program');

  return (
    <div className="courses-page">
      {/* Top Navigation */}
      <div className="courses-nav">
        <button
          type="button"
          onClick={() => setActiveTab('program')}
          className={`courses-nav-btn ${activeTab === 'program' ? 'active' : ''}`}
        >
          <FontAwesomeIcon icon={faGraduationCap} className="me-2" /> Program Courses
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('extra')}
          className={`courses-nav-btn ${activeTab === 'extra' ? 'active' : ''}`}
        >
          <FontAwesomeIcon icon={faBookOpen} className="me-2" /> Extra Courses
        </button>
      </div>

      {/* Content Section */}
      <div className="courses-content">
        {activeTab === 'program' ? <ProgramCourses /> : <ExtraCourses />}
      </div>
    </div>
  );
}

export default Courses;
