import React from 'react';
import '../../../../stylesheets/profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

function Profile() {
  return (
    <div className="profile-container">
      <div className="profile-image">
        <img src="/avatar.jpg" alt="Student" className="profile-pic" />
      </div>

      <div className="profile-details">
        <h3 className="profile-name">John Doe</h3>
        <p className="profile-cohort"><span className="profile-label">Cohort:</span> Fall 2024</p>
        <p className="profile-email"><span className="profile-label">Email:</span> john.doe@example.com</p>
        <p className="profile-phone"><span className="profile-label">Phone: </span>+1234567890</p>

        <div className="profile-actions">
          <a href="/certificate" className="profile-link">
            <FontAwesomeIcon icon={faDownload} style={{ marginRight: '5px' }} /> Download Certificate
          </a>
          <div>
            <button type="button" className="profile-btn">Edit Profile</button>
            <button type="button" className="profile-btn">Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
