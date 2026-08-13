import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLinkedin,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import {
  faEnvelope,
  faGlobe,
  faPhone,
  faCross,
} from '@fortawesome/free-solid-svg-icons';
import '../stylesheets/footer.css';

function FooterSection() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <img src="/JJRSF purple.png" alt="JJRSF Christian Leadership Academy" className="footer-logo" />
          <p>
            Christian Leadership Academy is committed to providing high-quality,
            faith-based training that equips believers to become servant-
            transformational leaders.
          </p>
        </div>

        <div className="footer-links-block">
          <h6>Quick Links</h6>
          <ul className="footer-links">
            <li><Link to="/about">About</Link></li>
            <li><Link to="/programs">Programs</Link></li>
            <li><Link to="/faculty">Faculty</Link></li>
            <li><Link to="/faq">FAQs</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/login">Student Login</Link></li>
          </ul>
        </div>

        <div className="footer-connect">
          <h6>Connect With Us</h6>
          <ul className="footer-contact-list">
            <li>
              <FontAwesomeIcon icon={faEnvelope} />
              <a href="mailto:jjrsfoundation@gmail.com">jjrsfoundation@gmail.com</a>
            </li>
            <li>
              <FontAwesomeIcon icon={faPhone} />
              <a href="https://wa.me/+2347070392387" target="_blank" rel="noopener noreferrer">
                +234 707 039 2387
              </a>
            </li>
            <li>
              <FontAwesomeIcon icon={faGlobe} />
              <a href="https://cla.jjrsf.org" target="_blank" rel="noopener noreferrer">
                cla.jjrsf.org
              </a>
            </li>
          </ul>
          <ul className="social-icons">
            <li>
              <a
                href="https://www.linkedin.com/showcase/jjrsf-cla/?viewAsMember=true"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/@jesusjirehrapha4725"
                aria-label="YouTube"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faYoutube} />
              </a>
            </li>
            <li>
              <a href="mailto:jjrsfoundation@gmail.com" aria-label="Email">
                <FontAwesomeIcon icon={faEnvelope} />
              </a>
            </li>
            <li>
              <a href="https://cla.jjrsf.org" aria-label="Website" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faGlobe} />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} JJRSF Christian Leadership Academy. All Rights Reserved.</p>
        <p className="footer-tagline">
          Empowered by Faith. Driven by Purpose.
          <FontAwesomeIcon icon={faCross} />
        </p>
      </div>
    </footer>
  );
}

export default FooterSection;
