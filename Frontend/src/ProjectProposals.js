import React, { useState, useEffect } from 'react';
import ProjectSubmissionForm from './ProjectSubmissionForm';
import ProposalStatusTracker from './ProposalStatusTracker';
import ReviewFeedbackSystem from './ReviewFeedbackSystem';

const ProjectProposals = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [selectedProjectName, setSelectedProjectName] = useState('');

  // Fetch the projects from the API on component mount
  useEffect(() => {
    fetch('http://localhost:3000/api/projects')
      .then((response) => response.json())
      .then((data) => {
        setProjects(data); // Assuming the API returns an array of project objects
      })
      .catch((error) => {
        console.error('Error fetching projects:', error);
      });
  }, []);

  const handleProjectChange = (e) => {
    const selectedId = parseInt(e.target.value, 10); // Convert value to integer
    const selectedProject = projects.find((project) => project.id === selectedId); // Find the project
    console.log(selectedId);
    if (selectedProject) {
      setSelectedProjectId(selectedId);
      setSelectedProjectName(selectedProject.title);
    }
    
  };

  return (
    <div className="project-proposals container-custom">
      <h1>Project Proposals</h1>
      <ProjectSubmissionForm />
      <br></br>
      <ProposalStatusTracker />
      <br></br>
      <div className="project-dropdown">
        <strong>Select project to review: </strong>
        <select
          value={selectedProjectId}
          onChange={handleProjectChange}
          className="form-control-custom"
        >
          <option value="">-- Select a Project --</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.title} {/* Assuming each project has an `id` and `name` */}
            </option>
          ))}
        </select>
      </div>
      <br></br>
      <ReviewFeedbackSystem selectedProjectId={selectedProjectId} projectTitle={selectedProjectName} />
    </div>
  );
};

export default ProjectProposals;
