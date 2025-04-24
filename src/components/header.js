import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../stylesheets/header.css';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    // Clear login data
    localStorage.clear();
    sessionStorage.clear();
    setIsLoggedIn(false);
    navigate('/');
  };

  // Create a function to check login status
  const checkLoginStatus = () => {
    const token = sessionStorage.getItem('authToken');
    setIsLoggedIn(!!token);
  };

  useEffect(() => {
    // Check login status when component mounts
    checkLoginStatus();
    
    // Set up event listener for logout events
    window.addEventListener('storage', (event) => {
      if (event.key === 'authToken' || event.key === null) {
        checkLoginStatus();
      }
    });
    
    // Listen for custom logout event
    window.addEventListener('user-logout', checkLoginStatus);
    
    // Cleanup event listeners
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
      window.removeEventListener('user-logout', checkLoginStatus);
    };
  }, []);

  return (
    <header className="header">
      <div className="logo-container">
        <img src="/JJRSF purple.png" alt="Logo" className="logo" />
      </div>
      <button className="mobile-menu-btn" onClick={toggleMenu}>
        <span className={`menu-icon ${isMenuOpen ? 'open' : ''}`}></span>
      </button>
      <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/programs" className="nav-link">
              Programs
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/faculty" className="nav-link">
              Faculty
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/faq" className="nav-link">
              FAQs
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link">
              Contact
            </Link>
          </li>
          <li className="nav-item">
            {isLoggedIn ? (
              <Link to="/" onClick={handleLogout} className="nav-link login">
                Logout
              </Link>
            ) : (
              <Link to="/login" className="nav-link login">
                Login
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
