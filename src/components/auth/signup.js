import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope, 
  faUser, 
  faLock,
  faIdCard,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../stylesheets/signup.css';

// Create axios instance with default config
const api = axios.create({
  baseURL: 'https://cla-portal-api.onrender.com',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      cla_role_id: '',
      cla_cohort_id: ''
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const value = e.target.type === 'number' ? 
      parseInt(e.target.value, 10) || '' : 
      e.target.value;
      
    // Store role information when role ID is selected
    if (e.target.name === 'cla_role_id') {
      sessionStorage.setItem('userRole', value === 2 ? 'facilitator' : 'student');
      sessionStorage.setItem('roleId', value);
    }

    // Store cohort ID when selected
    if (e.target.name === 'cla_cohort_id') {
      sessionStorage.setItem('cohortId', value);
    }
      
    setFormData(prev => ({
      user: {
        ...prev.user,
        [e.target.name]: value
      }
    }));
    
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Password validation
    if (formData.user.password !== formData.user.password_confirmation) {
      setError('Passwords do not match');
      setLoading(false);
      toast.error('Passwords do not match');
      return;
    }

    try {
      // Prepare the data according to the API spec
      const userData = {
        user: {
          ...formData.user,
          cla_role_id: parseInt(formData.user.cla_role_id, 10),
          cla_cohort_id: formData.user.cla_cohort_id ? parseInt(formData.user.cla_cohort_id, 10) : 0
        }
      };

      console.log('Submitting form data:', userData);
      
      const response = await api.post('/api/v1/sign_up', userData);
      console.log('Server response:', response.data);

      if (response.data.message === 'User created successfully') {
        // Show success toast and navigate
        toast.success('Account created successfully!', {
          onClose: () => {
            navigate('/login', { 
              state: { 
                message: 'Registration successful! Please login to continue.' 
              }
            });
          }
        });
      } else {
        throw new Error('Registration failed');
      }
    } catch (err) {
      console.error('Registration error:', err);
      let errorMessage = 'Something went wrong. Please try again.';

      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (err.response.data.error) {
          errorMessage = err.response.data.error;
        } else if (err.response.data.errors) {
          errorMessage = Object.entries(err.response.data.errors)
            .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
            .join('\n');
        }
      } else if (err.request) {
        // The request was made but no response was received
        errorMessage = 'No response from server. Please check your internet connection.';
      }

      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="signup-page-background" />
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
              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}
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
                    value={formData.user.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                    disabled={loading}
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
                    value={formData.user.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email address"
                    disabled={loading}
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
                    value={formData.user.password}
                    onChange={handleChange}
                    required
                    placeholder="Create a password"
                    disabled={loading}
                    minLength="6"
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
                    value={formData.user.password_confirmation}
                    onChange={handleChange}
                    required
                    placeholder="Confirm your password"
                    disabled={loading}
                    minLength="6"
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
                      value={formData.user.cla_role_id}
                      onChange={handleChange}
                      placeholder="Enter role ID"
                      disabled={loading}
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
                      value={formData.user.cla_cohort_id}
                      onChange={handleChange}
                      placeholder="Enter cohort ID"
                      disabled={loading}

                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="signup-submit-btn" 
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <FontAwesomeIcon icon={faSpinner} className="btn-icon fa-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faUser} className="btn-icon" />
                      Create Account
                    </>
                  )}
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