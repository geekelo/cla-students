import React from 'react';
import '../../../../stylesheets/profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    studentId: '',
    cohort: '',
    email: '',
    name: '',
    roleId: '',
    cohortId: '',
    birthday: '',
    phoneNumber: ''
  });

  useEffect(() => {
    // Get data from localStorage
    const storedData = JSON.parse(localStorage.getItem('userData'));
    
    if (storedData) {
      setUserData({
        studentId: sessionStorage.getItem('userId'),
        cohort: storedData.cohortId,
        email: storedData.email,
        name: storedData.userName,
        roleId: storedData.roleId,
        cohortId: storedData.cohortId,
        birthday: storedData.birthday,
        phoneNumber: storedData.phoneNumber
      });
    }
  }, []);

  const handleEdit = () => {
    navigate('/signup', {
      state: {
        isEditMode: true,
        userData: {
          user: {
            name: userData.name,
            email: userData.email,
            cla_role_id: userData.roleId,
            cla_cohort_id: userData.cohortId,
            id: userData.studentId,
            birthday: userData.birthday,
            phone_number: userData.phoneNumber
          }
        }
      }
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="profile-container">
      <div className="profile-image">
        <img src="/avatar.jpg" alt="Student" className="profile-pic" />
      </div>

      <div className="profile-details">
        <h3 className="profile-name">{userData.name || 'User Name'}</h3>
        <p className="profile-info">
          <span className="profile-label">Student ID: </span>
          {userData.studentId}
        </p>
        <p className="profile-info">
          <span className="profile-label">Email: </span>
          {userData.email}
        </p>
        <p className="profile-info">
          <span className="profile-label">Phone Number: </span>
          {userData.phoneNumber || 'Not set'}
        </p>
        <p className="profile-info">
          <span className="profile-label">Birthday: </span>
          {formatDate(userData.birthday)}
        </p>
        <p className="profile-info">
          <span className="profile-label">Cohort: </span>
          {userData.cohort || 'Not assigned'}
        </p>

        <div className="profile-actions">
          <a href="/certificate" className="profile-link">
            <FontAwesomeIcon icon={faDownload} style={{ marginRight: '5px' }} />
            Download Certificate
          </a>
          <div>
            <button type="button" className="profile-btn" onClick={handleEdit}>
              Edit Profile
            </button>
            <button type="button" className="profile-btn">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
