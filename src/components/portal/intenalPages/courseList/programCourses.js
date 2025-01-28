import React, { useState } from 'react';
import CourseList from './courseList';
import courses from '../../../../data/courseList.json'

function ProgramCourses() {
  const [activeStatus, setActiveStatus] = useState('done');

  return (
    <div className="program-courses">
      {/* Tab Navigation for Status */}
      <div className="course-status-nav">
        <button
          type="button"
          onClick={() => setActiveStatus('done')}
          className={`status-btn ${activeStatus === 'done' ? 'active' : ''}`}
        >
          Done
        </button>
        <button
          type="button"
          onClick={() => setActiveStatus('active')}
          className={`status-btn ${activeStatus === 'active' ? 'active' : ''}`}
        >
          Active
        </button>
        <button
          type="button"
          onClick={() => setActiveStatus('pending')}
          className={`status-btn ${activeStatus === 'pending' ? 'active' : ''}`}
        >
          Pending
        </button>
      </div>

      {/* Course List */}
      <CourseList courses={courses[activeStatus]} />
    </div>
  );
}

export default ProgramCourses;
