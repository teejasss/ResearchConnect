import React, { useState, useEffect } from 'react';

const UpcomingConferences = () => {
  const [conferences, setConferences] = useState([]);

  useEffect(() => {
    // Fetch events from the backend
    const fetchConferences = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/getEvents'); // Replace with your actual API endpoint
        const data = await response.json();

        // Filter upcoming events from today onwards
        const today = new Date();
        const upcomingEvents = data.events.filter(event =>
          new Date(event.start) >= today
        );

        // Sort by date
        upcomingEvents.sort((a, b) => new Date(a.start) - new Date(b.start));

        setConferences(upcomingEvents);
      } catch (error) {
        console.error('Error fetching conferences:', error);
      }
    };

    fetchConferences();
  }, []);

  // Function to format the date in YYYY-MM-DD format
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero for months
    const day = d.getDate().toString().padStart(2, '0'); // Add leading zero for days
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="upcoming-conferences">
      <h2>Upcoming Conferences</h2>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Location</th>
            <th>Registration</th>
          </tr>
        </thead>
        <tbody>
          {conferences.length > 0 ? (
            conferences.map((conference) => (
              <tr key={conference.id}>
                <td>{conference.title}</td>
                <td>{formatDate(conference.start)}</td>
                <td>{conference.location}</td>
                <td>
                  <a
                    href={conference.registrationLink || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Register
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No upcoming conferences</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UpcomingConferences;
