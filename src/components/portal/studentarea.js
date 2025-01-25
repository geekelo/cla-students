import React from 'react';
import '../../stylesheets/studentArea.css';

function StudentArea() {
  return (
    <div className="student-area-container">
      {/* Left Side Nav */}
      <div className="student-side-nav">
        <ul className="student-nav-list">
          <li><a href="/profile" className="student-nav-link">Profile</a></li>
          <li><a href="/courses" className="student-nav-link">Courses</a></li>
          <li><a href="/assignments" className="student-nav-link">Assignments</a></li>
          <li><a href="/dashboard" className="student-nav-link">Dashboard</a></li>
          <li><a href="/certificate" className="student-nav-link">Certificate</a></li>
          <li><a href="/calendar" className="student-nav-link">Calendar</a></li>
          <li><a href="/notes" className="student-nav-link">Notes</a></li>
        </ul>
      </div>

      {/* Right Display Area */}
      <div className="student-display-area">
        <h2 className="student-display-title">Welcome to Your Student Area</h2>
        <p className="student-display-message">Select an option from the menu to get started.</p>
      </div>
    </div>
  );
}

export default StudentArea;
