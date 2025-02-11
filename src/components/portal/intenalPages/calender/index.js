import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faVideo, 
  faEdit, 
  faTrash,
  faEye,
  faCalendarAlt,
  faClock,
  faHistory,
  faCalendarDay
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import courses from '../../../../data/courseList.json';
import '../../../../stylesheets/calender.css';

function Calendar() {
  const [events, setEvents] = useState([]);
  const [activeTab, setActiveTab] = useState('new');
  const navigate = useNavigate();
  const location = useLocation();
  const { liveClasses } = location.state || [];

  useEffect(() => {
    if (liveClasses && liveClasses.length > 0) {
      setEvents(liveClasses);
    } else {
      const allLiveEvents = getAllLiveEvents(courses);
      setEvents(allLiveEvents);
    }
  }, [liveClasses]);

  function getAllLiveEvents(coursesData) {
    const categories = Object.keys(coursesData);
    let liveEvents = [];

    categories.forEach(category => {
      coursesData[category].forEach(course => {
        if (course.liveClasses) {
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

  const getFilteredEvents = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return events.filter(event => {
      const eventDate = new Date(event.date);
      if (activeTab === 'new') {
        return eventDate >= today;
      } else {
        return eventDate < today;
      }
    }).sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  const handleAddLiveClassesClick = () => {
    navigate('/portal/event/new', {
      state: { 
        courses: courses 
      } 
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const handleViewClass = (zoomLink) => {
    if (zoomLink) {
      window.open(zoomLink, '_blank');
    } else {
      alert('Zoom link not available for this class');
    }
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h1 className="calendar-title">Live Classes</h1>
        <button
          className="add-class-btn"
          onClick={handleAddLiveClassesClick}
        >
          <FontAwesomeIcon icon={faVideo} /> Add Live Class
        </button>
      </div>

      <div className="calendar-tabs">
        <button
          className={`tab-button ${activeTab === 'new' ? 'active' : ''}`}
          onClick={() => setActiveTab('new')}
        >
          <FontAwesomeIcon icon={faCalendarDay} /> Upcoming Classes
        </button>
        <button
          className={`tab-button ${activeTab === 'old' ? 'active' : ''}`}
          onClick={() => setActiveTab('old')}
        >
          <FontAwesomeIcon icon={faHistory} /> Past Classes
        </button>
      </div>

      <div className="events-list">
        {getFilteredEvents().length > 0 ? (
          getFilteredEvents().map((event) => (
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
                  onClick={() => handleViewClass(event.zoom_link)}
                  title="Join Class"
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
          <p className="no-events">No {activeTab === 'new' ? 'upcoming' : 'past'} classes found.</p>
        )}
      </div>
    </div>
  );
}

export default Calendar;
