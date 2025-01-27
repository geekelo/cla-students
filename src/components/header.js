import React from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/header.css';

function Header() {
  return (
    <header className="header">
      <div className="logo-container">
        <img src="/JJRSF purple.png" alt="Logo" className="logo" />
      </div>
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item">
            <a href="#about" className="nav-link">
              About
            </a>
          </li>
          <li className="nav-item">
            <a href="#programs" className="nav-link">
              Programs
            </a>
          </li>
          <li className="nav-item">
            <a href="#facauties" className="nav-link">
              Facaulties
            </a>
          </li>
          <li className="nav-item">
            <a href="#faqs" className="nav-link">
              FAQs
            </a>
          </li>
          <li className="nav-item">
            <a href="#contact" className="nav-link">
              Contact
            </a>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link login">
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
