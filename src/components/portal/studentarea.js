import React, { useState } from 'react';
import '../../stylesheets/studentArea.css';
import Profile from './intenalPages/profile/profile';
import Courses from './intenalPages/courseList/index';
import Assignments from './intenalPages/assignments/index';
import Dashboard from './intenalPages/dashboard';

function StudentArea() {
  const [activePage, setActivePage] = useState('profile');

  // Render content based on the active page
  const renderContent = () => {
    switch (activePage) {
      case 'profile':
        return <Profile />;
      case 'courses':
        return <Courses />;
      case 'assignments':
        return <Assignments />;
      case 'dashboard':
        return <Dashboard />;
      case 'calendar':
        return <div className="student-display-area">Calendar Page Content</div>;
      default:
        return (
          <div className="student-display-area">
            <h2 className="student-display-title">Welcome to Your Student Area</h2>
            <p className="student-display-message">Select an option from the menu to get started.</p>
          </div>
        );
    }
  };

  return (
    <div className="student-area-container">
      {/* Left Side Nav */}
      <div className="student-side-nav">
        <ul className="student-nav-list">
          <li>
            <button
              type="button"
              onClick={() => setActivePage('profile')}
              className="student-nav-link"
              aria-label="View Profile"
            >
              Profile
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => setActivePage('courses')}
              className="student-nav-link"
              aria-label="View Courses"
            >
              Courses
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => setActivePage('assignments')}
              className="student-nav-link"
              aria-label="View Assignments"
            >
              Assignments
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => setActivePage('dashboard')}
              className="student-nav-link"
              aria-label="View Dashboard"
            >
              Progress Board
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => setActivePage('calendar')}
              className="student-nav-link"
              aria-label="View Calendar"
            >
              Calendar
            </button>
          </li>
        </ul>
      </div>

      {/* Right Display Area */}
      <div className="student-display-area">
        {renderContent()}
      </div>
    </div>
  );
}

export default StudentArea;
