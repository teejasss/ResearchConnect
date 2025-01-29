import React, { useState } from 'react';

const ProfileForm = ({ profileData, onProfileUpdate }) => {
  const [profile, setProfile] = useState(profileData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form validation and then update the profile
    onProfileUpdate(profile);
  };

  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={profile.name} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={profile.email} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="bio">Bio:</label>
        <textarea id="bio" name="bio" value={profile.bio} onChange={handleChange}></textarea>
      </div>
      <div>
        <label htmlFor="researchInterests">Research Interests:</label>
        <input
          type="text"
          id="researchInterests"
          name="researchInterests"
          value={profile.field_of_research.join(', ')}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default ProfileForm;
