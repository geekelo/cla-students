import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../stylesheets/forgotPassword.css';
import { createAxiosInstance } from '../../config';

const api = createAxiosInstance();

function ForgotPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/api/v1/forgot_password', {
        email: email
      });

      if (response) {
        toast.success('Reset link has been sent to your email!');
        
        // Wait for the success message to be shown before redirecting
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      let errorMessage = 'Failed to send reset link. Please try again.';

      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      }

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
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
      <div className="forgot-password-content">
        <div className="forgot-password-left">
          <div className="forgot-password-image">
            <img src="/JJRSF purple.png" alt="JJRSF Logo" />
          </div>
          <div className="forgot-password-header">
            <h1>Forgot Password?</h1>
            <p>Enter your email address and we&apos;ll send you a link to reset your password.</p>
          </div>
        </div>

        <div className="forgot-password-right">
          <form onSubmit={handleSubmit} className="forgot-password-form">
            <div className="form-group">
              <label htmlFor="email">
                <FontAwesomeIcon icon={faEnvelope} />
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                disabled={loading}
              />
            </div>

            <button 
              type="submit" 
              className="submit-button" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
                  Sending Reset Link...
                </>
              ) : (
                'Send Reset Link'
              )}
            </button>

            <button 
              type="button" 
              className="back-to-login"
              onClick={() => navigate('/login')}
              disabled={loading}
            >
              Back to Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword; 