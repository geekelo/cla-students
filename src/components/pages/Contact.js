import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope, 
  faUser, 
  faPhone, 
  faMessage 
} from '@fortawesome/free-solid-svg-icons';
import '../../stylesheets/contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    whatsapp: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
  };

  return (
    <>
      <div className="contact-page-background" />
      <div className="contact-container">
        <div className="contact-content">
          <div className="contact-left">
            <div className="contact-header">
              <h1 className="contact-title">
                Have any <span className="highlight">Question</span>? Get in Touch
              </h1>
              <p className="contact-subtitle">
                Our dedicated team is here to assist you and answer any questions you may have.
              </p>
            </div>
            <div className="contact-image">
              <img src="/contact-us.jpg" alt="Contact Us" />
            </div>
          </div>

          <div className="contact-right">
            <div className="contact-form-container">
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="fullName">
                    <FontAwesomeIcon icon={faUser} />
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
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
                  <label htmlFor="whatsapp">
                    <FontAwesomeIcon icon={faPhone} />
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    id="whatsapp"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    required
                    placeholder="Enter your WhatsApp number"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">
                    <FontAwesomeIcon icon={faMessage} />
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Type your message here"
                    rows="5"
                  />
                </div>

                <button type="submit" className="contact-submit-btn">
                  <FontAwesomeIcon icon={faEnvelope} className="btn-icon" />
                  Contact Us
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact; 