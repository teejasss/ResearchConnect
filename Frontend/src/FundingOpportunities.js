import React, { useState, useEffect } from 'react';

const FundingOpportunities = () => {
  // Load opportunities from localStorage or use default if none exists
  const loadOpportunities = () => {
    const storedOpportunities = JSON.parse(localStorage.getItem('opportunities'));
    if (storedOpportunities) {
      return storedOpportunities;
    }
    return [
      { id: 1, title: "Research Grant A", amount: "$50,000", deadline: "2024-12-31" },
      { id: 2, title: "Innovation Fund B", amount: "$25,000", deadline: "2025-01-15" },
      { id: 3, title: "Community Development Grant C", amount: "$10,000", deadline: "2024-11-30" },
    ];
  };

  const [opportunities, setOpportunities] = useState(loadOpportunities);
  const [editing, setEditing] = useState(null); // To track which opportunity is being edited
  const [editedAmount, setEditedAmount] = useState('');

  useEffect(() => {
    // Save opportunities to localStorage whenever they change
    localStorage.setItem('opportunities', JSON.stringify(opportunities));
  }, [opportunities]);

  const handleEdit = (id) => {
    const opportunity = opportunities.find(o => o.id === id);
    setEditing(id);
    setEditedAmount(opportunity.amount);
  };

  const handleSave = (id) => {
    setOpportunities(opportunities.map(opportunity =>
      opportunity.id === id
        ? { ...opportunity, amount: editedAmount }
        : opportunity
    ));
    setEditing(null);
    setEditedAmount('');
  };

  return (
    <div className="funding-opportunities">
      <h2>Funding Opportunities</h2>
      <table className='styled-table'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Deadline</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {opportunities.map(opportunity => (
            <tr key={opportunity.id}>
              <td>{opportunity.title}</td>
              <td>
                {editing === opportunity.id ? (
                  <input
                    type="text"
                    value={editedAmount}
                    onChange={(e) => setEditedAmount(e.target.value)}
                  />
                ) : (
                  opportunity.amount
                )}
              </td>
              <td>{opportunity.deadline}</td>
              <td>
                {editing === opportunity.id ? (
                  <button onClick={() => handleSave(opportunity.id)}>Save</button>
                ) : (
                  <button onClick={() => handleEdit(opportunity.id)}>Add</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FundingOpportunities;
