import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../stylesheets/header.css";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    // Clear login data (you can adjust this based on your auth logic)
    localStorage.clear();
    sessionStorage.clear();
  };

  useEffect(() => {
    // Check if the user is logged in by checking if a token exists in localStorage
    const token = sessionStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <header className="header">
      <div className="logo-container">
        <img src="/JJRSF purple.png" alt="Logo" className="logo" />
      </div>
      <button className="mobile-menu-btn" onClick={toggleMenu}>
        <span className={`menu-icon ${isMenuOpen ? "open" : ""}`}></span>
      </button>
      <nav className={`nav ${isMenuOpen ? "nav-open" : ""}`}>
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
