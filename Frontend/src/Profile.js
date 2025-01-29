import React, { useState, useEffect } from 'react';
import ConnectResearchers from './ConnectResearchers';
import './Profile.css';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    bio: '',
    role: '',
    institution: '',
    field_of_research: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }

        const response = await fetch('http://localhost:3000/api/user', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Send the token in the Authorization header
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        if (response.ok) {
          setProfileData(data);
        } else {
          console.error('Failed to fetch user data:', data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      setError('You are not logged in');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,  // Send token in Authorization header
        },
        body: JSON.stringify(profileData),  // Send updated user info
      });

      const data = await response.json();

      if (response.ok) {
        alert('User info updated successfully!');
        setIsEditing(false); // Exit editing mode after update
      } else {
        setError(data.error || 'Failed to update user info');
      }
    } catch (error) {
      console.error('Error during user update:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      {!isEditing && (
        <div className="profile-info">
          <div className="profile-field">
            <strong>Email:</strong> {profileData.email}
          </div>
          <div className="profile-field">
            <strong>First Name:</strong> {profileData.first_name}
          </div>
          <div className="profile-field">
            <strong>Last Name:</strong> {profileData.last_name}
          </div>
          <div className="profile-field">
            <strong>Bio:</strong> {profileData.bio}
          </div>
          <div className="profile-field">
            <strong>Institution:</strong> {profileData.institution}
          </div>
          <div className="profile-field">
            <strong>Field of Research:</strong> {profileData.field_of_research}
          </div>
          <div className="profile-field">
            <strong>Role:</strong> {profileData.role}
          </div>

          {/* Button to toggle edit mode */}
          <button className="edit-button" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>
      )}
      {isEditing && (
        <form className="profile-form" onSubmit={handleSubmit}>
          <label>
            First Name:
            <input 
              type="text" 
              name="first_name" 
              value={profileData.first_name} 
              onChange={handleChange} 
            />
          </label>
          <label>
            Last Name:
            <input 
              type="text" 
              name="last_name" 
              value={profileData.last_name} 
              onChange={handleChange} 
            />
          </label>
          <label>
            Bio:
            <textarea 
              name="bio" 
              value={profileData.bio} 
              onChange={handleChange} 
            ></textarea>
          </label>
          <label>
            Institution:
            <input 
              type="text" 
              name="institution" 
              value={profileData.institution} 
              onChange={handleChange} 
            />
          </label>
          <label>
            Field of Research:
            <input 
              type="text" 
              name="field_of_research" 
              value={profileData.field_of_research} 
              onChange={handleChange} 
            />
          </label>
          <label>
            Role:
             <select
                  id="role"
                  value={profileData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="researcher">Researcher</option>
                  <option value="admin">Admin</option>
                  <option value="student">Student</option>
                </select>
          </label>
          <button type="submit" className="save-button">Save Changes</button>
        </form>
      )}
      {error && <p className="error-text">{error}</p>}
      <ConnectResearchers />
    </div>
  );
};

export default Profile;
