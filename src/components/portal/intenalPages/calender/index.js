import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faVideo, 
  faEdit, 
  faTrash,
  faEye,
  faCalendarAlt,
  faClock 
} from '@fortawesome/free-solid-svg-icons';
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
    const categories = Object.keys(coursesData);
    let liveEvents = [];

    categories.forEach(category => {
      coursesData[category].forEach(course => {
        if (course.liveClasses) {
          // Map the live classes and include course details
          const classesWithCourseInfo = course.liveClasses.map(liveClass => ({
            ...liveClass,
            courseName: liveClass.name,
            facilitator: liveClass.name_of_facilitator,
            courseId: liveClass.course_id
          }));
          liveEvents = liveEvents.concat(classesWithCourseInfo);
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h1 className="calendar-title">Upcoming Classes</h1>
        <button
          role="button "
          onClick={handleAddLiveClassesClick}
        >
          <FontAwesomeIcon icon={faVideo} /> Add Live Class
        </button>
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
              <div className="event-details">
                <div className="event-datetime">
                  <div className="event-date">
                    <FontAwesomeIcon icon={faCalendarAlt} className="datetime-icon" /> 
                    <span className="datetime-text">{formatDate(event.date)}</span>
                  </div>
                  <div className="event-time">
                    <FontAwesomeIcon icon={faClock} className="datetime-icon" /> 
                    <span className="datetime-text">{event.time}</span>
                  </div>
                </div>
                <h3 className="event-title">{event.courseName}</h3>
                <div className="event-course">
                  Facilitator: {event.facilitator || 'Not Assigned'}
                </div>
              </div>
              <div className="event-actions">
                <button 
                  type="button" 
                  className="action-icon" 
                  onClick={() => console.log('View clicked')}
                  title="View Class"
                >
                  <FontAwesomeIcon icon={faEye} />
                </button>
                <button 
                  type="button" 
                  className="action-icon" 
                  onClick={() => console.log('Edit clicked')}
                  title="Edit Class"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button 
                  type="button" 
                  className="action-icon delete-icon" 
                  onClick={() => console.log('Delete clicked')}
                  title="Delete Class"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No classes found for the selected date.</p>
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
