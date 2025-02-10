import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../stylesheets/login.css';

// Create axios instance with default config
const api = axios.create({
  baseURL: 'https://cla-portal-api.onrender.com',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

function LoginPage() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    user: {
      email: '',
      password: ''
    }
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      user: {
        ...prev.user,
        [e.target.name]: e.target.value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/api/v1/sign_in', formData);
      console.log('Full Login Response:', response);
      console.log('User Data:', response.data.user);
      console.log('Role ID:', response.data.user.cla_role_id);
      console.log('Cohort ID:', response.data.user.cla_cohort_id);

      if (response.data.token) {
        // Store authentication token
        sessionStorage.setItem('authToken', response.data.token);
        sessionStorage.setItem('userId', response.data.user.id);

        // Store role and cohort information
        const roleId = response.data.user.cla_role_id;
        const cohortId = response.data.user.cla_cohort_id;
        const isStudent = roleId !== 2;

        // Update both localStorage and sessionStorage
        localStorage.setItem('userRole', isStudent ? 'student' : 'facilitator');
        localStorage.setItem('roleId', roleId);
        localStorage.setItem('cohortId', cohortId);
        sessionStorage.setItem('userRole', isStudent ? 'student' : 'facilitator');
        sessionStorage.setItem('roleId', roleId);
        sessionStorage.setItem('cohortId', cohortId);

        toast.success('Login successful!');
      } else {
        throw new Error('Authentication failed');
      }
    } catch (err) {
      console.error('Login error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      let errorMessage = 'Login failed. Please check your credentials.';

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

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Show registration success message if redirected from signup
  React.useEffect(() => {
    if (location.state?.message) {
      toast.success(location.state.message);
      // Clear the message from location state
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  return (
    <div className="login-container">
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
      <div className="login-wrapper">
        {/* Left Column */}
        <div className="login-left">
          <img src="/lightBg.png" alt="Logo" className="login-logo" />
          <h2 className="login-welcome">Welcome Back!</h2>
          <p className="login-message">Sign in to access your account and explore more courses.</p>
        </div>

        {/* Right Column */}
        <div className="login-right">
          <h2 className="login-title">Login</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                placeholder="you@example.com"
                required
                value={formData.user.email}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-input"
                placeholder="********"
                required
                value={formData.user.password}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="form-options">
              <label className="form-remember" htmlFor="checkbox">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  id="checkbox"
                />
                <span>Remember me</span>
              </label>

              <Link to="/forgot-password" className="form-forgot">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="form-button"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="signup-message">
            Don&apos;t have an account?
            {' '}
            <Link to="/signup" className="signup-link">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
