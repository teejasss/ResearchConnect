import React, { useState, useEffect } from 'react';

const ConnectResearchers = () => {
  const [researchers, setResearchers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch researchers from an API (Mock data for now)
    const fetchResearchers = () => {
      const data = [
        { name: 'Alice Smith', interests: ['AI', 'Data Mining'] },
        { name: 'Bob Johnson', interests: ['Quantum Computing', 'Cryptography'] },
        { name: 'Charlie Lee', interests: ['Natural Language Processing', 'Machine Learning'] },
      ];
      setResearchers(data);
    };
    fetchResearchers();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredResearchers = researchers.filter((researcher) =>
    researcher.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="connect-researchers">
      <h2>Connect with Researchers</h2>
      <input
        type="text"
        placeholder="Search researchers"
        value={searchTerm}
        onChange={handleSearch}
      />
      <ul>
        {filteredResearchers.map((researcher, index) => (
          <li key={index}>
            <strong>{researcher.name}</strong> - Interests: {researcher.interests.join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConnectResearchers;
