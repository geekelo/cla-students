import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import '../../../../stylesheets/instructorDesk.css';

function InstructorDesk({
  stats,
  onCreateLiveClass,
}) {
  const navigate = useNavigate();

  const onCreateCourse = () => {
    navigate('/portal/course/new', { state: { course: {} } });
  };

  const onCreateAssignment = () => {
    navigate('/portal/assignment/new', { state: { assignment: {} } });
  }

  return (
    <div className="instructor-desk">
      <h1 className="desk-title">My Desk</h1>

      {/* Quick Actions */}
      <div className="desk-actions">
        <button
          type="button"
          className="action-button"
          onClick={onCreateCourse}
        >
          Create Course
        </button>
        <button
          type="button"
          href="/portal/course/new"
          className="action-button"
          onClick={onCreateAssignment}
        >
          Create Assignment
        </button>
        <button
          type="button"
          className="action-button"
          onClick={onCreateLiveClass}
        >
          Create Live Class
        </button>
      </div>

      {/* Statistics Section */}
      <div className="desk-stats">
        <div className="stat-card">
          <h2>Total Courses</h2>
          <p>{stats?.courses}</p>
        </div>
        <div className="stat-card">
          <h2>Total Assignments</h2>
          <p>{stats?.assignments}</p>
        </div>
        <div className="stat-card">
          <h2>Total Live Classes</h2>
          <p>{stats?.liveClasses}</p>
        </div>
        <div className="stat-card">
          <h2>Pending Submissions</h2>
          <p>{stats?.pendingSubmissions}</p>
        </div>
      </div>
    </div>
  );
}

InstructorDesk.propTypes = {
  stats: PropTypes.shape({
    courses: PropTypes.number.isRequired,
    assignments: PropTypes.number.isRequired,
    liveClasses: PropTypes.number.isRequired,
    pendingSubmissions: PropTypes.number.isRequired,
  }).isRequired,
  onCreateCourse: PropTypes.func.isRequired,
  onCreateAssignment: PropTypes.func.isRequired,
  onCreateLiveClass: PropTypes.func.isRequired,
};

export default InstructorDesk;
