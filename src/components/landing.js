import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faBookOpen,
  faBuildingColumns,
  faBullseye,
  faCross,
  faEye,
  faGraduationCap,
  faLaptop,
  faShieldHalved,
  faUserGraduate,
  faUsers,
  faGlobe,
} from '@fortawesome/free-solid-svg-icons';
import '../stylesheets/landing.css';

const APPLY_URL = 'https://forms.gle/LPTgtCnJDonnXkgh6';

function Landing() {
  return (
    <main className="home">
      <section className="home-hero">
        <div className="home-hero-overlay" />
        <div className="home-hero-content">
          <p className="home-hero-kicker">
            <FontAwesomeIcon icon={faCross} className="home-hero-cross" />
            JJRS FOUNDATION EDUCATION SUPPORT INITIATIVE
          </p>
          <h1 className="home-hero-title">Christian Leadership Academy</h1>
          <p className="home-hero-text">
            Our academy is committed to providing high-quality, faith-based
            training to students worldwide.
          </p>
          <div className="home-hero-actions">
            <a href={APPLY_URL} className="home-btn home-btn-primary" target="_blank" rel="noopener noreferrer">
              Apply Now
              <FontAwesomeIcon icon={faArrowRight} />
            </a>
            <Link to="/about" className="home-btn home-btn-outline">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <section className="home-section home-info">
        <div className="home-container home-info-grid">
          <article className="home-info-card">
            <div className="home-info-icon">
              <FontAwesomeIcon icon={faBuildingColumns} />
            </div>
            <h2>About Us</h2>
            <p>
              Christian Leadership Academy equips believers with faith-based
              knowledge and skills to lead with integrity in every sphere of
              influence.
            </p>
          </article>
          <article className="home-info-card">
            <div className="home-info-icon">
              <FontAwesomeIcon icon={faBullseye} />
            </div>
            <h2>Mission</h2>
            <p>
              To develop Christian-driven leaders who are adaptive in bringing
              change and influential in advancing God&apos;s kingdom on earth.
            </p>
          </article>
          <article className="home-info-card">
            <div className="home-info-icon">
              <FontAwesomeIcon icon={faEye} />
            </div>
            <h2>Vision</h2>
            <p>
              To produce servant-transformational leaders who bring true change
              in every endeavour of life.
            </p>
          </article>
        </div>
      </section>

      <section className="home-section home-programs-section">
        <div className="home-container home-programs-layout">
          <div className="home-panel home-programs">
            <div className="home-programs-intro">
              <h2>Our Programs</h2>
              <p>
                Practical, scripture-centered courses designed to grow your faith
                and leadership capacity.
              </p>
            </div>
            <div className="home-program-items">
              <div className="home-program-item">
                <div className="home-program-icon">
                  <FontAwesomeIcon icon={faBookOpen} />
                </div>
                <h3>Believer-Beginners&apos; Class</h3>
                <p>
                  Build a strong foundation and embark on your journey of faith
                  with clarity and confidence.
                </p>
              </div>
              <div className="home-program-item">
                <div className="home-program-icon">
                  <FontAwesomeIcon icon={faUsers} />
                </div>
                <h3>Minister-Service Class</h3>
                <p>
                  Develop the skills and knowledge needed for effective ministry
                  and servant leadership.
                </p>
              </div>
              <div className="home-program-item">
                <div className="home-program-icon">
                  <FontAwesomeIcon icon={faGlobe} />
                </div>
                <h3>Leader-Managerial Class</h3>
                <p>
                  Gain essential strategies for successful management and
                  transformational leadership.
                </p>
              </div>
            </div>
            <Link to="/programs" className="home-text-link">
              View All Programs
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>

          <aside className="home-panel home-why">
            <h2>Why Study With Us?</h2>
            <ul className="home-why-list">
              <li>
                <span className="home-why-icon">
                  <FontAwesomeIcon icon={faShieldHalved} />
                </span>
                <div>
                  <h3>Faith-Centered Education</h3>
                  <p>Every course is rooted in biblical truth and Christian values.</p>
                </div>
              </li>
              <li>
                <span className="home-why-icon">
                  <FontAwesomeIcon icon={faGlobe} />
                </span>
                <div>
                  <h3>Global Community</h3>
                  <p>Learn alongside believers from diverse backgrounds worldwide.</p>
                </div>
              </li>
              <li>
                <span className="home-why-icon">
                  <FontAwesomeIcon icon={faUserGraduate} />
                </span>
                <div>
                  <h3>Experienced Faculty</h3>
                  <p>Learn from mentors committed to spiritual and academic growth.</p>
                </div>
              </li>
              <li>
                <span className="home-why-icon">
                  <FontAwesomeIcon icon={faLaptop} />
                </span>
                <div>
                  <h3>Flexible Learning</h3>
                  <p>Access quality training designed to fit your pace and calling.</p>
                </div>
              </li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="home-section home-cta-section">
        <div className="home-container">
          <div className="home-cta">
            <div className="home-cta-copy">
              <span className="home-cta-icon">
                <FontAwesomeIcon icon={faGraduationCap} />
              </span>
              <div>
                <h2>Ready to answer your calling?</h2>
                <p>
                  Take the next step in your leadership journey with JJRSF
                  Christian Leadership Academy.
                </p>
              </div>
            </div>
            <a href={APPLY_URL} className="home-btn home-btn-light" target="_blank" rel="noopener noreferrer">
              Apply Now
              <FontAwesomeIcon icon={faArrowRight} />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Landing;
