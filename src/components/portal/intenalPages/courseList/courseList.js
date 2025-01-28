import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function CourseList({ courses }) {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleCourseClick = (course) => {
    if (course.locked) {
      alert(`${course.name} is locked! Complete prerequisites first.`);
    } else {
      // Redirect to the course page
      navigate(`/portal/courses/${course.id}`, { state: { course } });
    }
  };

  console.log(courses);

  return (
    <div className="course-list">
     
      {courses.map((course) => (
        <button
          key={course.id}
          className={`course-item ${course.locked ? 'locked' : 'unlocked'}`}
          onClick={() => handleCourseClick(course)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleCourseClick(course);
          }}
          tabIndex={0}
          type="button"
        >
          {course.name}
          {course.locked && (
            <span className="lock-icon" aria-label="locked course">
              🔒
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

CourseList.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      locked: PropTypes.bool.isRequired,
    }),
  ).isRequired,
};

export default CourseList;
