import React, { useEffect, useState } from 'react';

const ProposalStatusTracker = () => {
  const [proposals, setProposals] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/projects'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }

        const data = await response.json();
        console.log(data);
        setProposals(data); // Assuming API returns an array of project objects
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError('Could not fetch project data.');
      }
    };

    fetchProposals();
  }, []);

  return (
    <div className="status-tracker">
      <h2>Status Tracker for Submitted Proposals</h2>
      {error && <p className="error-message">{error}</p>}
      <table className="styled-table">
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {proposals.length > 0 ? (
            proposals.map((proposal) => (
              <tr key={proposal.id}>
                <td>{proposal.title}</td>
                <td>{proposal.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No proposals available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProposalStatusTracker;
