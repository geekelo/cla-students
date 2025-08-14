import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faClipboardList,
  faComments,
  faGraduationCap,
  faCalendarAlt,
  faUser,
  faSignOutAlt,
  faBullhorn,
  faLaptop,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import '../../../stylesheets/studentArea.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const currentPath = location.pathname.split('/')[2] || 'dashboard';


  const handleNavigation = (path) => {
    navigate(`/portal/${path}`);
    // Close mobile menu when navigating
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const getButtonClass = (path) => {
    return currentPath === path ? 'student-nav-link active' : 'student-nav-link';
  };

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      {isMobile && (
        <button 
          className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <FontAwesomeIcon icon={faChevronRight} className="nav-icon" />
        </button>
      )}

      {/* Sidebar */}
      <nav className={`student-side-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <ul className="student-nav-list">
          {sessionStorage.getItem('userRole') === 'student' && (
          <li>
            <button
              onClick={() => handleNavigation('dashboard')}
              className={getButtonClass('dashboard')}
              aria-label="View Dashboard"
            >
              <FontAwesomeIcon icon={faHome} className="nav-icon" />&nbsp; Dashboard
            </button>
          </li>)}

          {sessionStorage.getItem('userRole') === 'facilitator' && (
            <li>
              <button
                onClick={() => handleNavigation('instructorDesk')}
                className={getButtonClass('instructorDesk')}
                aria-label="View Instructor Desk"
              >
                <FontAwesomeIcon icon={faLaptop} className="nav-icon" />&nbsp; Instructor Desk
              </button>
            </li>
          )}

          <li>
            <button
              onClick={() => handleNavigation('courses')}
              className={getButtonClass('courses')}
              aria-label="View Courses"
            >
              <FontAwesomeIcon icon={faGraduationCap} className="nav-icon" />&nbsp; Courses
            </button>
          </li>

          <li>
            <button
              onClick={() => handleNavigation('assignments')}
              className={getButtonClass('assignments')}
              aria-label="View Assignments"
            >
              <FontAwesomeIcon icon={faClipboardList} className="nav-icon" />&nbsp; Assignments
            </button>
          </li>

          <li>
            <button
              onClick={() => handleNavigation('contributions')}
              className={getButtonClass('contributions')}
              aria-label="View Contributions"
            >
              <FontAwesomeIcon icon={faComments} className="nav-icon" />&nbsp; Contributions
            </button>
          </li>

          <li>
            <button
              onClick={() => handleNavigation('cbts')}
              className={getButtonClass('cbts')}
              aria-label="View Cbts"
            >
              <FontAwesomeIcon icon={faGraduationCap} className="nav-icon" />&nbsp; Tests
            </button>
          </li>

          {sessionStorage.getItem('userRole') === 'facilitator' && (
          <li>
            <button
              onClick={() => handleNavigation('announcements')}
              className={getButtonClass('announcements')}
              aria-label="View Announcements"
            >
              <FontAwesomeIcon icon={faBullhorn} className="nav-icon" />&nbsp; Announcements
            </button>
          </li>
          )}

          <li>
            <button
              onClick={() => handleNavigation('events')}
              className={getButtonClass('events')}
              aria-label="View Events"
            >
              <FontAwesomeIcon icon={faCalendarAlt} className="nav-icon" />&nbsp; Events
            </button>
          </li>

          <li>
            <button
              onClick={() => handleNavigation('profile')}
              className={getButtonClass('profile')}
              aria-label="View Profile"
            >
              <FontAwesomeIcon icon={faUser} className="nav-icon" />&nbsp; Profile
            </button>
          </li>

          <li style={{ marginTop: 'auto', paddingTop: '20px' }}>
            <button
              onClick={() => {
                sessionStorage.clear();
                window.location.href = '/login';
              }}
              className="student-nav-link"
              aria-label="Sign Out"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="nav-icon" />&nbsp; Sign Out
            </button>
          </li>
        </ul>
      </nav>

      {/* Mobile Overlay */}
      {isMobile && isMobileMenuOpen && (
        <div 
          className="mobile-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
          }}
        />
      )}
    </>
  );
};

export default Sidebar; 