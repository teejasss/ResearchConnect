import React, { useState } from 'react';

const ProjectSubmissionForm = () => {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token'); // Assuming you store a JWT token for authentication
      if (!token) {
        setError('You are not logged in');
        return;
      }

      const response = await fetch('http://localhost:3000/api/createProject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include authorization header if required
        },
        body: JSON.stringify({
          title: projectName, // Sending project title
          description,        // Sending project description
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setSuccess('Project submitted successfully!');
        // Reset form fields
        setProjectName('');
        setDescription('');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to submit the project');
      }
    } catch (err) {
      setError('An error occurred while submitting the project');
      console.error(err);
    }
  };

  return (
    <div className="submission-form">
      <h2>Submit a New Project Proposal</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Project Name:</label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
            className="form-control-custom"
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="form-control-custom"
          />
        </div>
        <button type="submit" className="btn-custom">Submit Proposal</button>
      </form>
      {success && <p className="success-text">{success}</p>}
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default ProjectSubmissionForm;
