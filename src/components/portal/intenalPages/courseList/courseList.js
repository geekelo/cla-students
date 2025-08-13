import React from 'react';
import '../../../../stylesheets/courses.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function CourseList({ course }) {
  const navigate = useNavigate();

  const handleCourseClick = (course) => {
    if (course.locked) {
      alert(`${course.name} is locked! Complete prerequisites first.`);
    } else {
      navigate(`/portal/courses/${course.id}`, { state: { course } });
    }
  };

  return (
    <div className="courses-page">
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
        <div className="event-actions">
          <p type="button" className="action-icon" title="Join Class">
            <FontAwesomeIcon icon={faEye} />
          </p>
        </div>
      </button>
    </div>
  );
}

export default CourseList;
