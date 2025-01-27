import React from 'react';
import '../../stylesheets/login.css';

function LoginPage() {
  return (
    <div className="login-container">
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
          <form className="login-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label" aria-label="email">
                Email Address
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  placeholder="you@example.com"
                  required
                  aria-label="password"
                />
              </label>
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-input"
                  placeholder="********"
                  required
                  aria-label="password"
                />
              </label>
            </div>

            <div className="form-options">
              <label className="form-remember" htmlFor="checkbox">
                <span>Remember me</span>
                <input
                  type="checkbox"
                  className="form-checkbox"
                  id="checkbox"
                />
              </label>

              <a href="/ggg" className="form-forgot">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="form-button"
            >
              Sign In
            </button>
          </form>

          <p className="signup-message">
            Don’t have an account?
            {' '}
            <a href="/ggg" className="signup-link">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
