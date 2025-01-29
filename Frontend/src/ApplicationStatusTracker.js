import React, { useState } from 'react';

const ApplicationStatusTracker = () => {
  const [applications,] = useState([
    { id: 1, title: "Research Grant A", status: "Submitted", deadline: "2024-12-31" },
    { id: 2, title: "Innovation Fund B", status: "In Review", deadline: "2025-01-15" },
  ]);

  return (
    <div className="application-status-tracker">
      <h2>Status Tracking System</h2>
      <table className='styled-table'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Deadline</th>
          </tr>
        </thead>
        <tbody>
          {applications.map(application => (
            <tr key={application.id}>
              <td>{application.title}</td>
              <td>{application.status}</td>
              <td>{application.deadline}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationStatusTracker;
