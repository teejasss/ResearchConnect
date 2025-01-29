import React, { useState, useEffect } from 'react';

const DiscussionForums = () => {
  const [discussions, setDiscussions] = useState([]);
  const [topic, setTopic] = useState('');

  // Load discussions from localStorage on component mount
  useEffect(() => {
    const savedDiscussions = JSON.parse(localStorage.getItem('discussions')) || [];
    setDiscussions(savedDiscussions);
  }, []);

  // Save discussions to localStorage whenever discussions change
  useEffect(() => {
    localStorage.setItem('discussions', JSON.stringify(discussions));
  }, [discussions]);

  const handleAddDiscussion = (e) => {
    e.preventDefault();
    if (topic.trim()) {
      setDiscussions([...discussions, topic]);
      setTopic('');
    }
  };

  return (
    <div className="discussion-forums container-custom">
      <h2>Discussion Forums</h2>
      <form onSubmit={handleAddDiscussion}>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="New discussion topic"
          required
          className="form-control-custom"
        />
        <br></br>
        <button type="submit" className="btn-custom">
          Create Topic
        </button>
      </form>
      <br></br>
      <div className="discussion-list">
        <h3>Active Discussions</h3>
        <ul>
          {discussions.map((dis, index) => (
            <li key={index}>{dis}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DiscussionForums;
