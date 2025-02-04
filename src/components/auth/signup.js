import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope, 
  faUser, 
  faLock,
  faIdCard
} from '@fortawesome/free-solid-svg-icons';
import '../../stylesheets/signup.css';

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    cla_role_id: '',
    cla_cohort_id: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { user: formData });
  };

  return (
    <>
      <div className="signup-page-background" />
      <div className="signup-container">
        <div className="signup-content">
          <div className="signup-left">
            <div className="signup-image">
              <img src="/JJRSF purple.png" alt="JJRSF Logo" />
            </div>
            <div className="signup-header">
              <h1 className="signup-title">
                Welcome
              </h1>
              <p className="signup-subtitle">
                Join our community of believers and start your journey of spiritual growth.
              </p>
            </div>
          </div>

          <div className="signup-right">
            <div className="signup-form-container">
              <form className="signup-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">
                    <FontAwesomeIcon icon={faUser} />
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    <FontAwesomeIcon icon={faEnvelope} />
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">
                    <FontAwesomeIcon icon={faLock} />
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Create a password"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password_confirmation">
                    <FontAwesomeIcon icon={faLock} />
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="password_confirmation"
                    name="password_confirmation"
                    value={formData.password_confirmation}
                    onChange={handleChange}
                    required
                    placeholder="Confirm your password"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="cla_role_id">
                      <FontAwesomeIcon icon={faIdCard} />
                      Role ID
                    </label>
                    <input
                      type="number"
                      id="cla_role_id"
                      name="cla_role_id"
                      value={formData.cla_role_id}
                      onChange={handleChange}
                      required
                      placeholder="Enter role ID"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="cla_cohort_id">
                      <FontAwesomeIcon icon={faIdCard} />
                      Cohort ID
                    </label>
                    <input
                      type="number"
                      id="cla_cohort_id"
                      name="cla_cohort_id"
                      value={formData.cla_cohort_id}
                      onChange={handleChange}
                      placeholder="Enter cohort ID"
                    />
                  </div>
                </div>

                <button type="submit" className="signup-submit-btn">
                  <FontAwesomeIcon icon={faUser} className="btn-icon" />
                  Create Account
                </button>

                <p className="login-message">
                  Already have an account?
                  {' '}
                  <Link to="/login" className="login-link">
                    Sign In
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp; 