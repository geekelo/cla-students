import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import courses from '../../../../data/courseList.json';
import '../../../../stylesheets/calender.css';

function Calendar() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { liveClasses } = location.state || [];

  useEffect(() => {
    if (liveClasses && liveClasses.length > 0) {
      setEvents(liveClasses);
      setFilteredEvents(liveClasses);
    } else {
      const allLiveEvents = getAllLiveEvents(courses);
      setEvents(allLiveEvents);
      setFilteredEvents(allLiveEvents);
    }
  }, [liveClasses]);

  const handleAddLiveClassesClick = () => {
    navigate('/portal/event/new', {
   state: { 
    courses: courses 
    } 
  });
  }

  function getAllLiveEvents(coursesData) {
    const categories = Object.keys(coursesData); // Get keys: done, active, pending
    let liveEvents = [];

    categories.forEach(category => {
      coursesData[category].forEach(course => {
        if (course.liveClasses) {
          liveEvents = liveEvents.concat(course.liveClasses); // Add live classes to the array
        }
      });
    });

    return liveEvents;
  }

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
  const sortedEvents = filteredEvents?.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h1 className="calendar-title">Upcoming Events</h1>
        <button  type="button" onClick={handleAddLiveClassesClick}>Schedule Live Class</button>
        <input
          type="date"
          className="date-filter"
          value={selectedDate}
          onChange={handleDateFilterChange}
        />
      </div>

      <div className="events-list">
        {sortedEvents?.length > 0 ? (
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
