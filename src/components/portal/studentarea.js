import React, { useState } from 'react';
import '../../stylesheets/studentArea.css';
import Profile from './intenalPages/profile/index';
import Courses from './intenalPages/courseList/index';
import Assignments from './intenalPages/assignments/index';
import Dashboard from './intenalPages/dashboard/index';
import Calendar from './intenalPages/calender/index';
import Submissions from './intenalPages/submissions/index';
import InstructorDesk from './intenalPages/instructorDesk/index';

function StudentArea() {
  const [activePage, setActivePage] = useState('dashboard');

  // Add this function to determine button class
  const getButtonClass = (pageName) => `student-nav-link ${activePage === pageName ? 'active' : ''}`;


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
      case 'submissions':
        return <Submissions />;
      case 'calendar':
        return <Calendar />;
      case 'instructorDesk':
        return <InstructorDesk />;
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
              onClick={() => setActivePage('dashboard')}
              className={getButtonClass('dashboard')}
              aria-label="View Dashboard"
            >
              Progress Board
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => setActivePage('instructorDesk')}
              className={getButtonClass('instructorDesk')}
              aria-label="View My Desk"
            >
              My Desk
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => setActivePage('courses')}
              className={getButtonClass('courses')}
              aria-label="View Courses"
            >
              Courses
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => setActivePage('assignments')}
              className={getButtonClass('assignments')}
              aria-label="View Assignments"
            >
              Assignments
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => setActivePage('submissions')}
              className={getButtonClass('submissions')}
              aria-label="View Submissions"
            >
              Submissions
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => setActivePage('calendar')}
              className={getButtonClass('calendar')}
              aria-label="View Calendar"
            >
              Live Classes
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => setActivePage('profile')}
              className={getButtonClass('profile')}
              aria-label="View Profile"
            >
              Profile
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
