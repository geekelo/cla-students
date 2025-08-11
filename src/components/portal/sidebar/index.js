import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartLine,
  faBook,
  faClipboardList,
  faInbox,
  faVideo,
  faUser,
  faLaptop,
} from '@fortawesome/free-solid-svg-icons';
import '../../../stylesheets/studentArea.css';

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.split('/')[2] || 'dashboard';

  const getButtonClass = (pageName) => `student-nav-link ${currentPath === pageName ? 'active' : ''}`;

  const handleNavigation = (path) => {
    navigate(`/portal/${path}`);
  };

  return (
    <div className="student-side-nav">
      <ul className="student-nav-list">
        {sessionStorage.getItem('userRole') === 'student' && (
          <li>
            <button
              type="button"
              onClick={() => handleNavigation('dashboard')}
              className={getButtonClass('dashboard')}
              aria-label="View Dashboard"
            >
              <FontAwesomeIcon icon={faChartLine} className="nav-icon" /> Dashboard
            </button>
          </li>
        )}
        {sessionStorage.getItem('userRole') === 'facilitator' && (
          <li>
            <button
              type="button"
              onClick={() => handleNavigation('instructorDesk')}
              className={getButtonClass('instructorDesk')}
              aria-label="View My Desk"
            >
              <FontAwesomeIcon icon={faLaptop} className="nav-icon" /> My Desk
            </button>
          </li>
        )}
        <li>
          <button
            type="button"
            onClick={() => handleNavigation('courses')}
            className={getButtonClass('courses')}
            aria-label="View Courses"
          >
            <FontAwesomeIcon icon={faBook} className="nav-icon" /> Courses
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => handleNavigation('assignments')}
            className={getButtonClass('assignments')}
            aria-label="View Assignments"
          >
            <FontAwesomeIcon icon={faClipboardList} className="nav-icon" /> Assignments
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => handleNavigation('contributions')}
            className={getButtonClass('contributions')}
            aria-label="View Contributions"
          >
            <FontAwesomeIcon icon={faClipboardList} className="nav-icon" /> Contributions
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => handleNavigation('submissions')}
            className={getButtonClass('submissions')}
            aria-label="View Submissions"
          >
            <FontAwesomeIcon icon={faInbox} className="nav-icon" /> Submissions
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => handleNavigation('events')}
            className={getButtonClass('calendar')}
            aria-label="View Calendar"
          >
            <FontAwesomeIcon icon={faVideo} className="nav-icon" /> Live Classes
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => handleNavigation('profile')}
            className={getButtonClass('profile')}
            aria-label="View Profile"
          >
            <FontAwesomeIcon icon={faUser} className="nav-icon" /> Profile
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar; 