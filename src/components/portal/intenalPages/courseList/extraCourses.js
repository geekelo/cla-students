import React, { useState } from 'react';
import CourseList from './courseList';
import StatusButtons from './StatusButtons';

function ExtraCourses() {
  const [activeStatus, setActiveStatus] = useState('done');

  const courses = {
    done: [
      { id: 6, name: 'UI/UX Design Basics', locked: false },
      { id: 7, name: 'Digital Marketing', locked: false },
    ],
    active: [
      { id: 8, name: 'Project Management', locked: false },
      { id: 9, name: 'Business Analytics', locked: true },
    ],
    pending: [
      { id: 10, name: 'Artificial Intelligence', locked: true },
    ],
  };

  return (
    <div className="extra-courses">
      <StatusButtons activeStatus={activeStatus} setActiveStatus={setActiveStatus} />
      <CourseList courses={courses[activeStatus]} />
    </div>
  );
}

export default ExtraCourses;
