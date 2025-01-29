import React, { useState, useContext } from 'react';
import './LoginPage.css'; // Import the CSS file
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';  // Import useNavigate for redirection

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize navigate hook
  const { login } = useContext(AuthContext);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.message === 'Login successful') {
        console.log(data);
        console.log(data.email, data.user_id, data.first_name, data.last_name);
        login(data.email, data.user_id, data.first_name, data.last_name);
        // console.log(data);

        // Store the JWT token in localStorage instead of cookies
        localStorage.setItem('token', data.token);

        // Redirect to the home page on successful login
        navigate('/');
      } else {
        setError(data.error || 'Invalid email or password.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <div className="container-custom">
        <section className="hero-section">
          <div className="hero-text">
            <h1 className="hero-title">Welcome Back</h1>
            <p className="hero-subtitle">Log in to access your account and connect with fellow researchers.</p>
          </div>
        </section>

        {/* Login Form */}
        <div className="row-custom mt-custom-3">
          <div className="col-custom-12 card-custom login-card">
            <h2 className="heading-custom">Log In</h2>
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className="form-input"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  className="form-input"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              {error && <p className="error-text">{error}</p>} {/* Display error message */}
              <button type="submit" className="cta-button login-button">Log In</button>
            </form>
            <p className="signup-text">
              Don't have an account? <a href="/register" className="signup-link">Sign Up</a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
