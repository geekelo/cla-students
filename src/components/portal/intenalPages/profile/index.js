import React from 'react';
import '../../../../stylesheets/profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

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
        cohort: sessionStorage.getItem('cohortId'),
        email: sessionStorage.getItem('email'),
        name: sessionStorage.getItem('userName'),
        roleId: sessionStorage.getItem('roleId'),
        cohortName: sessionStorage.getItem('cohortName'),
        birthday: sessionStorage.getItem('birthday'),
        phoneNumber: sessionStorage.getItem('phoneNumber')
      });
    }
  }, []);

  const handleEdit = () => {
    navigate('/JJRSFCLA', {
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

  const handleLogout = () => {
    toast.info(
      <div>
        <p>Are you sure you want to logout?</p>
        <button 
          onClick={confirmLogout} 
          style={{
            background: '#6b4ca6',
            color: 'white',
            padding: '5px 10px',
            border: 'none',
            borderRadius: '4px',
            marginRight: '10px',
            cursor: 'pointer'
          }}
        >
          Yes, Logout
        </button>
      </div>,
      {
        autoClose: false,
        closeOnClick: false,
        closeButton: true
      }
    );
  };

  const confirmLogout = () => {
    toast.info('Logging out...', {
      autoClose: false,
      toastId: 'loggingOut'
    });

    // Clear all storage
    localStorage.clear();
    sessionStorage.clear();
    
    // Dismiss the logging out toast and show success message
    toast.dismiss('loggingOut');
    toast.success('Logged out successfully!', {
      onClose: () => {
        // Redirect to login page after the success toast is closed
        navigate('/login');
      }
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="profile-container">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
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
          {userData.cohortName || 'Not assigned'}
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
            <button type="button" className="profile-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
