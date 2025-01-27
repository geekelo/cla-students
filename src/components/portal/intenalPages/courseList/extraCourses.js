import React, { useState } from 'react';
import CourseList from './courseList';

function ExtraCourses() {
  const [activeStatus, setActiveStatus] = useState('done');

  const courses = {
    done: [
      { id: 1, name: 'Photography Essentials', locked: false },
      { id: 2, name: 'Art History Basics', locked: false },
    ],
    active: [
      { id: 3, name: 'Creative Writing', locked: false },
      { id: 4, name: 'Public Speaking', locked: true },
    ],
    pending: [
      { id: 5, name: 'Financial Planning Basics', locked: true },
      { id: 6, name: 'Digital Marketing 101', locked: true },
    ],
  };

  return (
    <div className="extra-courses">
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

export default ExtraCourses;
