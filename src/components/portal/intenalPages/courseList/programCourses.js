import React, { useState } from 'react';
import CourseList from './courseList';
import StatusButtons from './StatusButtons';

function ProgramCourses() {
  const [activeStatus, setActiveStatus] = useState('done');

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
      <StatusButtons activeStatus={activeStatus} setActiveStatus={setActiveStatus} />
      <CourseList courses={courses[activeStatus]} />
    </div>
  );
}

export default ProgramCourses;
