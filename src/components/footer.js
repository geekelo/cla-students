import React from "react";
// import { p } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faGlobe } from "@fortawesome/free-solid-svg-icons";
import "../stylesheets/footer.css";
// import footerlogo from '../../assets/footerlogo.png';

// FooterSection component
function FooterSection() {
  return (
    <footer className="site-footer">
      {/* Main container for the footer */}
      <div className="container">
        <div className="row">
          {/* First column: Information for guests */}
          <div className="column-one-text">
            <h6>About</h6>
            <p className="text-justify">
              Christian Leadership Academy (CLA) is an academy committed to
              providing high-quality, faith-based training to students
              worldwide. In the first year of running this program, all our
              courses will be free for all students. We aim to foster a
              supportive environment where believers can grow spiritually
            </p>
          </div>

          {/* Second column: Information for organizers */}
          <div className="mission-vision">
            <div className="">
              <h6>Vision</h6>
              <p className="text-justify">
                To produce servant-transformational leaders who bring true
                change in every endeavour of life.
              </p>
            </div>
            <div>
              <h6>Mision</h6>
              <p className="text-justify">
                Our Mission is to develop Christain-driven leaders who are
                adaptive in bringing change and influential in advancing God’s
                kingdom on earth.
              </p>
            </div>
          </div>

          {/* Third column: Quick links to other pages */}
          <div className="column-one-link">
            <h6>Quick Links</h6>
            <ul className="footer-links">
              <li>
                <p to="/about" className="links">
                  About
                </p>
              </li>
              <li>
                <p to="/contact" className="links">
                  Contact
                </p>
              </li>
              <li>
                <p to="/features" className="links">
                  Features
                </p>
              </li>
              <li>
                <p to="/privacy-policy" className="links">
                  Privacy Policy
                </p>
              </li>
              <li>
                <p to="/facaulties" className="links">
                  Facaulties
                </p>
              </li>
              <li>
                <p to="/courses" className="links">
                  Courses
                </p>
              </li>
              <li>
                <p to="/faqs" className="links">
                  Help | FAQs
                </p>
              </li>
            </ul>
          </div>
        </div>
        <hr />
      </div>

      {/* Container for footer bottom section */}
      <div className="container">
        <div className="row">
          {/* Footer logo and copyright text */}
          <div className="column-two">
            <div>
              {/* <img src={footerlogo} className="footerlogo" alt="logo" /> */}
              <p className="copyright-text">
                Copyright &copy; 2024 All Rights Reserved by &nbsp;
                <a href="https://geekelo.com.ng">JJRSF CLA</a>
              </p>
            </div>
          </div>

          {/* Social media icons for developer connection */}
          <div className="column-two">
            <div className="social-icons">
              <p>Connect with Us:</p>
              <ul className="social-icons">
                <li>
                  <a
                    className="linkedin"
                    href="https://linkedin.com/in/eloghene-otiede"
                    aria-label="LinkedIn"
                  >
                    <FontAwesomeIcon icon={faLinkedin} />
                  </a>
                </li>
                <li>
                  <a
                    className="email"
                    href="https://youtube.com/@geekelo"
                    aria-label="YouTube"
                  >
                    <FontAwesomeIcon icon={faYoutube} />
                  </a>
                </li>
                <li>
                  <a
                    className="twitter"
                    href="https://x.com/geekelo_xyz"
                    aria-label="Twitter"
                  >
                    <FontAwesomeIcon icon={faTwitter} />
                  </a>
                </li>
                <li>
                  <a
                    className="globe"
                    href="https://geekelo.com.ng"
                    aria-label="Website"
                  >
                    <FontAwesomeIcon icon={faGlobe} />
                  </a>
                </li>
                <li>
                  <a
                    className="facebook"
                    href="mailto:efuelight12@gmail.com"
                    aria-label="Email"
                  >
                    <FontAwesomeIcon icon={faEnvelope} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterSection;
