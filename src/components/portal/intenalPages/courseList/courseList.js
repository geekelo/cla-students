import React from 'react';
import PropTypes from 'prop-types';

function CourseList({ courses }) {
  const handleCourseClick = (course) => {
    if (course.locked) {
      alert(`${course.name} is locked! Complete prerequisites first.`);
    } else {
      // Redirect to the course page
      window.location.href = `/courses/${course.id}`;
    }
  };

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

// Prop Validation
CourseList.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired, // Unique identifier
      name: PropTypes.string.isRequired, // Course name
      locked: PropTypes.bool.isRequired, // Lock status
    }),
  ).isRequired,
};

export default CourseList;
