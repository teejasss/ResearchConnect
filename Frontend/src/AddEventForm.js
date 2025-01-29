import React, { useState } from 'react';

const AddEventForm = () => {
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    start: '',
    end: ''
  });

  const [loading, setLoading] = useState(false); // Loading state for API call
  const [error, setError] = useState(null);     // Error state
  const [success, setSuccess] = useState(null); // Success message state

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('http://localhost:3000/api/createEvent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newEvent.title,
          description: newEvent.description,
          start_date: newEvent.start,
          end_date: newEvent.end,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add event');
      }

      const data = await response.json();
      console.log('API Response:', data);

      setSuccess('Event added successfully!');
      setNewEvent({ title: '', description: '', start: '', end: '' }); // Reset form fields
    } catch (err) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-event-container">
      <h2>Add New Event</h2>
      <form onSubmit={handleSubmit} className="event-form">
        <input
          type="text"
          placeholder="Event Title"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          required
          className="form-input"
        />
        <textarea
          placeholder="Event Description"
          value={newEvent.description}
          onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
          className="form-input"
          rows="4"
        ></textarea>
        <input
          type="datetime-local"
          value={newEvent.start}
          onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })}
          required
          className="form-input"
        />
        <input
          type="datetime-local"
          value={newEvent.end}
          onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
          required
          className="form-input"
        />
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Adding Event...' : 'Add Event'}
        </button>
      </form>
      {success && <p className="success-message">{success}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default AddEventForm;
