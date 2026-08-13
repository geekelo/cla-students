import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import '../stylesheets/header.css';

const APPLY_URL = 'https://forms.gle/LPTgtCnJDonnXkgh6';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleNavItemClick = () => {
    setIsMenuOpen(false);
  };

  const handleLogoutClick = () => {
    setIsMenuOpen(false);
    handleLogout();
  };

  const checkLoginStatus = () => {
    const token = sessionStorage.getItem('authToken');
    setIsLoggedIn(!!token);
  };

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  useEffect(() => {
    checkLoginStatus();

    window.addEventListener('storage', (event) => {
      if (event.key === 'authToken' || event.key === null) {
        checkLoginStatus();
      }
    });

    window.addEventListener('user-logout', checkLoginStatus);

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
      window.removeEventListener('user-logout', checkLoginStatus);
    };
  }, []);

  return (
    <header className="header">
      <div className="logo-container">
        <Link to="/" onClick={handleNavItemClick}>
          <img src="/JJRSF purple.png" alt="JJRSF Christian Leadership Academy" className="logo" />
        </Link>
      </div>
      <button type="button" className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle menu">
        <span className={`menu-icon ${isMenuOpen ? 'open' : ''}`} />
      </button>
      <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
        <ul className="nav-list">
          <li className="nav-item">
            <Link
              to="/"
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
              onClick={handleNavItemClick}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/about"
              className={`nav-link ${isActive('/about') ? 'active' : ''}`}
              onClick={handleNavItemClick}
            >
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/programs"
              className={`nav-link ${isActive('/programs') ? 'active' : ''}`}
              onClick={handleNavItemClick}
            >
              Programs
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/faculty"
              className={`nav-link ${isActive('/faculty') ? 'active' : ''}`}
              onClick={handleNavItemClick}
            >
              Faculty
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/faq"
              className={`nav-link ${isActive('/faq') ? 'active' : ''}`}
              onClick={handleNavItemClick}
            >
              FAQs
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/contact"
              className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
              onClick={handleNavItemClick}
            >
              Contact
            </Link>
          </li>
          <li className="nav-item nav-actions">
            <a
              href={APPLY_URL}
              className="nav-link apply-btn"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleNavItemClick}
            >
              Apply Now
            </a>
            {isLoggedIn ? (
              <button type="button" onClick={handleLogoutClick} className="nav-link auth-btn">
                <FontAwesomeIcon icon={faPowerOff} />
                Logout
              </button>
            ) : (
              <Link to="/login" className="nav-link auth-btn" onClick={handleNavItemClick}>
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
