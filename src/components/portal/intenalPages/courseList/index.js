import React, { useState } from 'react';
import '../../../../stylesheets/courses.css';
import ProgramCourses from './programCourses';
import ExtraCourses from './extraCourses';
import courseData from '../../../../data/courseList.json';


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

      {/* Content Section */}
      <div className="courses-content">
        {activeTab === 'program' ? <ProgramCourses courses={courseData.courses} /> : <ExtraCourses />}
      </div>
    </div>
  );
}

export default Courses;
