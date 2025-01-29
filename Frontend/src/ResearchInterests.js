import React from 'react';

const ResearchInterests = ({ researchInterests }) => {
  return (
    <div className="research-interests">
      <h2>Research Interests</h2>
      <ul>
        {researchInterests.map((interest, index) => (
          <li key={index}>{interest}</li>
        ))}
      </ul>
    </div>
  );
};

export default ResearchInterests;
