import React, { useState } from 'react';
import CourseList from './courseList';
import courses from '../../../../data/courseList.json'
import StatusButtons from './StatusButtons';

function ExtraCourses() {
  const [activeStatus, setActiveStatus] = useState('done');

  return (
    <div className="extra-courses">
      {/* Tab Navigation for Status */}
      <StatusButtons activeStatus={activeStatus} setActiveStatus={setActiveStatus}/>

      {/* Course List */}
      <CourseList courses={courses[activeStatus]} />
    </div>
  );
}

export default ExtraCourses;
