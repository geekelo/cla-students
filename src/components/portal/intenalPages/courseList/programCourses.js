import React, { useState } from 'react';
import CourseList from './courseList';

function ProgramCourses() {
  const [activeStatus, setActiveStatus] = useState('active');

  const courses = {
    done: [
      { id: 1, name: 'Introduction to Programming', locked: false },
      { id: 2, name: 'Algorithms & Data Structures', locked: false },
    ],
    active: [
      { id: 3, name: 'React Basics', locked: false },
      { id: 4, name: 'Node.js Fundamentals', locked: true },
    ],
    pending: [
      { id: 5, name: 'Advanced Machine Learning', locked: true },
    ],
  };

  return (
    <div className="program-courses">
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
      <CourseList courses={courses[activeStatus]} />
    </div>
  );
}

export default ProgramCourses;
