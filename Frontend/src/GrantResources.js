import React from 'react';

const GrantResources = () => {
  const resources = [
    { id: 1, title: "Grant Writing Guide", link: "#" },
    { id: 2, title: "Funding Application Checklist", link: "#" },
    { id: 3, title: "Best Practices for Grant Applications", link: "#" },
  ];

  return (
    <div className="styled-table">
      <h2>Grant Application Resources</h2>
      <table className="resources-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Resource Title</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {resources.map(resource => (
            <tr key={resource.id}>
              <td>{resource.id}</td>
              <td>{resource.title}</td>
              <td>
                <a href={resource.link} target="_blank" rel="noopener noreferrer">View Resource</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GrantResources;
