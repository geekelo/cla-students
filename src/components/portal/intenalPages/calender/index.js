import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../../../stylesheets/calendar.css';

function Calendar({ events }) {
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateFilterChange = (event) => {
    const { value } = event.target;
    setSelectedDate(value);

    if (value) {
      const filtered = events.filter((event) => {
        const eventDate = new Date(event.date);
        const selected = new Date(value);
        return eventDate.toDateString() === selected.toDateString();
      });
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(events);
    }
  };

  // Sort events by date (closest to farthest)
  const sortedEvents = filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h1 className="calendar-title">Upcoming Events</h1>
        <input
          type="date"
          className="date-filter"
          value={selectedDate}
          onChange={handleDateFilterChange}
        />
      </div>

      <div className="events-list">
        {sortedEvents.length > 0 ? (
          sortedEvents.map((event) => (
            <div key={event.id} className="event-card">
              <div className="event-date">
                <span className="event-day">{new Date(event.date).toLocaleDateString()}</span>
              </div>
              <div className="event-details">
                <h3 className="event-title">{event.title}</h3>
                <p className="event-description">{event.description}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No events found for the selected date.</p>
        )}
      </div>
    </div>
  );
}

Calendar.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired, // ISO string or date string
    }),
  ).isRequired,
};

export default Calendar;
