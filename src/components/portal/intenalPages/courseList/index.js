import React, { useState } from 'react';
import '../../../../stylesheets/courses.css';
import ProgramCourses from './programCourses';
import ExtraCourses from './extraCourses';

function Courses() {
  const [activeTab, setActiveTab] = useState('program');

  const renderSection = () => {
    switch (activeTab) {
      case 'program':
        return <ProgramCourses />;
      case 'extra':
        return <ExtraCourses />;
      default:
        return null;
    }
  };

  return (
    <div className="courses-container">
      <div className="courses-nav">
        <button
          type="button"
          onClick={() => setActiveTab('program')}
          className={`courses-nav-btn ${activeTab === 'program' ? 'active' : ''}`}
        >
          Program Courses
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('extra')}
          className={`courses-nav-btn ${activeTab === 'extra' ? 'active' : ''}`}
        >
          Extra Courses
        </button>
      </div>
      <div className="courses-content">{renderSection()}</div>
    </div>
  );
}

export default Courses;
