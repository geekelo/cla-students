import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import '../../../../stylesheets/dashboard.css';

function Dashboard() {
  // You can replace these static values with dynamic data from an API or state
  const totalCourses = 5;
  const totalCoursesTaken = 3;
  const totalScore = 85;
  const totalAssignmentsGiven = 10;
  const totalAssignmentsDone = 8;
  const totalClasses = 30;
  const totalAbsences = 2;

  const notices = [
    { id: 1, title: 'Important Announcement', content: 'Your final exam is scheduled for next week. Make sure to review all the materials.' },
    { id: 2, title: 'Assignment Deadline', content: 'The deadline for Assignment 6 is this Friday. Don\'t forget to submit it!' },
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Your Progress Board</h1>
        <p className="dashboard-subtitle">Quick overview of your progress and updates</p>
      </div>

      <div className="dashboard-stats">
        <div className="dashboard-stat">
          <h2 className="stat-title">Courses</h2>
          <p className="stat-value">
            {totalCoursesTaken}
            /
            {totalCourses}
          </p>
        </div>
        <div className="dashboard-stat">
          <h2 className="stat-title">Scores</h2>
          <p className="stat-value">
            {totalScore}
            %
            /
            100%
          </p>
        </div>
        <div className="dashboard-stat">
          <h2 className="stat-title">Assignments</h2>
          <p className="stat-value">
            {totalAssignmentsDone}
            /
            {totalAssignmentsGiven}
          </p>
        </div>
        <div className="dashboard-stat">
          <h2 className="stat-title">Attendance</h2>
          <p className="stat-value">
            {totalAbsences}
            /
            {totalClasses}
          </p>
        </div>
      </div>

      <div className="dashboard-notices">
        <h2 className="notices-title">
          <FontAwesomeIcon icon={faBell} className="notice-icon" /> Announcements
        </h2>
        <ul className="notices-list">
          {notices.map((notice) => (
            <li key={notice.id} className="notice-item">
              <h3 className="notice-title">{notice.title}</h3>
              <p className="notice-content">{notice.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
