import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope, 
  faUser, 
  faLock,
  faIdCard,
  faSpinner,
  faPhone,
  faCalendarAlt
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
  const location = useLocation();
  const { isEditMode, userData } = location.state || {};
  const [cohorts, setCohorts] = useState([]);
  const [roles, setRoles] = useState([]);

  const [formData, setFormData] = useState({
    user: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      cla_role_id: '',
      cla_cohort_id: '',
      birthday: '',
      phone_number: ''
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch cohorts
        const cohortsResponse = await api.get('/api/v1/cla_cohorts');
        setCohorts(cohortsResponse.data.cohorts || []);

        // Fetch roles
        const rolesResponse = await api.get('/api/v1/cla_roles');
        setRoles(rolesResponse.data.roles || []);
        
        console.log('Cohorts:', cohortsResponse.data.cohorts);
        console.log('Roles:', rolesResponse.data.roles);
      } catch (error) {
        console.error('Error fetching data:', error);
        if (error.response) {
          toast.error('Failed to load data. Please try again.');
        }
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (isEditMode && userData) {
      setFormData({
        user: {
          ...userData.user,
          birthday: userData.user.birthday || '',
          phone_number: userData.user.phone_number || ''
        }
      });
    }
  }, [isEditMode, userData]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = e.target.type === 'number' ? 
      parseInt(value, 10) || '' : 
      value;
      
    setFormData(prev => ({
      user: {
        ...prev.user,
        [name]: parsedValue
      }
    }));
    
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Password validation only for non-edit mode
    if (!isEditMode && formData.user.password !== formData.user.password_confirmation) {
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
          cla_cohort_id: parseInt(formData.user.cla_cohort_id, 10) || null
        }
      };

      // Remove password fields and id for edit mode
      if (isEditMode) {
        delete userData.user.password;
        delete userData.user.password_confirmation;
        delete userData.user.id; // Remove the id from payload
      }

      console.log('Submitting form data:', userData);
      
      let response;
      if (isEditMode) {
        response = await api.put(`/api/v1/edit_profile?id=${formData.user.id}`, userData);
        toast.success('Profile updated successfully!');
        navigate('/portal/profile');
      } else {
        response = await api.post('/api/v1/sign_up', userData);
        if (response.data.message === 'User created successfully') {
          toast.success('Account created successfully!', {
            onClose: () => {
              navigate('/login', { 
                state: { 
                  message: 'Registration successful! Please login to continue.' 
                }
              });
            }
          });
        }
      }

      console.log('Server response:', response.data);
    } catch (err) {
      console.error('Registration/Update error:', err);
      let errorMessage = 'Something went wrong. Please try again.';

      if (err.response) {
        if (err.response.data.error) {
          errorMessage = err.response.data.error;
        } else if (err.response.data.errors) {
          errorMessage = Object.entries(err.response.data.errors)
            .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
            .join('\n');
        }
      } else if (err.request) {
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
                {isEditMode ? 'Edit Profile' : 'Welcome'}
              </h1>
              <p className="signup-subtitle">
                {isEditMode ? 'Update your profile information' : 'Join our community of believers and start your journey of spiritual growth.'}
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
                  <label htmlFor="phone_number">
                    <FontAwesomeIcon icon={faPhone} />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone_number"
                    name="phone_number"
                    value={formData.user.phone_number}
                    onChange={handleChange}
                    required
                    placeholder="Enter your phone number"
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="birthday">
                    <FontAwesomeIcon icon={faCalendarAlt} />
                    Birthday
                  </label>
                  <input
                    type="date"
                    id="birthday"
                    name="birthday"
                    value={formData.user.birthday}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>

                {!isEditMode && (
                  <>
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
                  </>
                )}

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="cla_role_id">
                      <FontAwesomeIcon icon={faIdCard} />
                      Role ID
                    </label>
                    <select
                      id="cla_role_id"
                      name="cla_role_id"
                      value={formData.user.cla_role_id}
                      onChange={handleChange}
                      required
                      disabled={loading}
                      className="form-select"
                    >
                      <option value="">Select Role ID</option>
                      {roles.map((role) => (
                        <option key={role.id} value={role.id}>
                          ID: {role.id} - {role.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="cla_cohort_id">
                      <FontAwesomeIcon icon={faIdCard} />
                      Cohort ID
                    </label>
                    <select
                      id="cla_cohort_id"
                      name="cla_cohort_id"
                      value={formData.user.cla_cohort_id}
                      onChange={handleChange}
                      required
                      disabled={loading}
                      className="form-select"
                    >
                      <option value="">Select Cohort ID</option>
                      {cohorts.map((cohort) => (
                        <option key={cohort.id} value={cohort.id}>
                          ID: {cohort.id} - {cohort.name}
                        </option>
                      ))}
                    </select>
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
                      {isEditMode ? 'Updating Profile...' : 'Creating Account...'}
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faUser} className="btn-icon" />
                      {isEditMode ? 'Save Changes' : 'Create Account'}
                    </>
                  )}
                </button>

                {!isEditMode && (
                  <p className="login-message">
                    Already have an account?
                    {' '}
                    <Link to="/login" className="login-link">
                      Sign In
                    </Link>
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp; 