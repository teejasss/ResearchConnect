import React, { useState } from 'react';
import './RegisterPage.css'; // Import the CSS file
import Footer from './Footer';
import { useNavigate } from 'react-router-dom'; 

const Register = () => {
  // State to hold form values
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    institution: '',
    fieldOfResearch: '',
    bio: '',
    password: '',
    confirmPassword: '',
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, confirmPassword } = formData;

    // Check if passwords match
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        alert('Registration successful!');
        navigate('/login');
        console.log('Response:', data);
      } else {
        const error = await response.json();
        alert(`Registration failed: ${error.message}`);
        console.error('Error:', error);
      }
    } catch (error) {
      alert('An error occurred during registration.');
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <div className="container-custom">
        <section className="hero-section">
          <div className="hero-text">
            <h1 className="hero-title">Create an Account</h1>
            <p className="hero-subtitle">Join the platform to connect with researchers and collaborate on exciting projects.</p>
          </div>
        </section>

        {/* Registration Form */}
        <div className="row-custom mt-custom-3">
          <div className="col-custom-12 card-custom register-card">
            <h2 className="heading-custom">Sign Up</h2>
            <form className="register-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="role">Role</label>
                <select
                  id="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="researcher">Researcher</option>
                  <option value="admin">Admin</option>
                  <option value="student">Student</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="institution">Institution</label>
                <input
                  type="text"
                  id="institution"
                  placeholder="Enter your institution name"
                  value={formData.institution}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="fieldOfResearch">Field of Research</label>
                <input
                  type="text"
                  id="fieldOfResearch"
                  placeholder="Enter your research field"
                  value={formData.fieldOfResearch}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="bio">Bio</label>
                <textarea
                  id="bio"
                  placeholder="Tell us about yourself"
                  rows="4"
                  value={formData.bio}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="submit-button">Sign Up</button>
            </form>
            <p className="login-link">
              Already have an account? <a href="/login">Log In</a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
