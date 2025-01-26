import React, { useState } from 'react';
import CourseList from './courseList';

function ExtraCourses() {
  const [activeStatus, setActiveStatus] = useState('active');

  const courses = {
    done: [
      { id: 1, name: 'Photography Essentials', locked: false },
    ],
    active: [
      { id: 2, name: 'Creative Writing', locked: false },
      { id: 3, name: 'Public Speaking', locked: true },
    ],
    pending: [
      { id: 4, name: 'Financial Planning Basics', locked: true },
    ],
  };

  return (
    <div className="extra-courses">
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

export default ExtraCourses;
