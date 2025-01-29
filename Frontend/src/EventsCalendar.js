import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import UpcomingConferences from './UpcomingConferences';
import './modal.css'; // Import your modal CSS

const localizer = momentLocalizer(moment);

const EventsCalendar = () => {
  const [events, setEvents] = useState([]);
  // const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '' });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    // Fetch events from the API
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/getEvents');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const {events} = await response.json();
        console.log(events);
        // Map API data to the calendar's required format
        const formattedEvents = events.map((event) => ({
          id: event.id,
          title: event.title,
          start: new Date(event.start), // Ensure API provides correct date format
          end: new Date(event.end),
        }));
        console.log(formattedEvents);
        setEvents(formattedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedEvent(null);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const { title, start, end } = newEvent;
  //   setEvents([...events, { title, start: new Date(start), end: new Date(end) }]);
  //   setNewEvent({ title: '', start: '', end: '' });
  // };

  return (
    <div className="events-calendar container-custom">
      <h1>Events Calendar</h1>
      <br />
      <a className="btn btn-primary submit-button" href="/addevent">
        Add New Event
      </a>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: '50px' }}
        onSelectEvent={handleEventClick} // Handle event click
      />
      <UpcomingConferences />

      {/* Modal for Registration */}
      {modalIsOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Register for {selectedEvent?.title}</h2>
            <p>
              <strong>Event Start:</strong>{' '}
              {moment(selectedEvent.start).format('MMMM Do YYYY, h:mm a')}
            </p>
            <p>
              <strong>Event End:</strong>{' '}
              {moment(selectedEvent.end).format('MMMM Do YYYY, h:mm a')}
            </p>
            <form>
              <div>
                <label>Name</label>
                <br></br>
                <input type="text" required />
              </div>
              <div>
                <label>Email</label>
                <br></br>
                <input type="email" required />
              </div>
              <div>
                <label>Phone</label>
                <br></br>
                <input type="tel" required />
              </div>
              <button type="submit">Register</button>
              <button type="button" onClick={closeModal}>
                Close
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsCalendar;
