import React from 'react';
import '../../../../stylesheets/profile.css';

function Profile() {
  return (
    <div className="profile-container">
      <div className="profile-image">
        <img src="/path/to/student-picture.jpg" alt="Student" className="profile-pic" />
      </div>

      <div className="profile-details">
        <h3 className="profile-name">John Doe</h3>
        <p className="profile-cohort">Cohort: Fall 2024</p>
        <p className="profile-email">Email: john.doe@example.com</p>
        <p className="profile-phone">Phone: +1234567890</p>

        <div className="profile-actions">
          <a href="/certificate" className="profile-link">Download Certificate</a>
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
