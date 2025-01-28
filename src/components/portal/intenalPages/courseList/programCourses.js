import React, { useState } from 'react';
import CourseList from './courseList';

function ProgramCourses({ courses }) {
  const [activeStatus, setActiveStatus] = useState('done');

  const categorizedCourses = {
    done: courses.filter((course) => course.locked === false),
    active: courses.filter((course) => course.locked === true), 
    pending: courses.filter((course) => course.locked === true)
  };

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
      <CourseList courses={categorizedCourses[activeStatus]} />
    </div>
  );
}

export default ProgramCourses;
