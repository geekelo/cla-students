import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEdit, 
  faTrash,
  faEye,
  faCalendarAlt,
  faClock,
  faHistory,
  faCalendarDay
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../../../../stylesheets/calender.css';

const BASE_URL = 'https://cla-portal-api.onrender.com';

function Calendar() {
  const [events, setEvents] = useState([]);
  const [activeTab, setActiveTab] = useState('new');
  const navigate = useNavigate();
  const location = useLocation();
  const { courseId } = location.state || {}; // Check if course ID was passed

  useEffect(() => {
    const fetchLiveClasses = async () => {
      try {
        const token = sessionStorage.getItem('authToken');
        const userId = sessionStorage.getItem('userId');
        const cohortId = sessionStorage.getItem('cohortId');
        const roleId = sessionStorage.getItem('roleId'); // Fetch role ID

        if (!token || !userId) {
          toast.error('Session expired. Please login again.');
          navigate('/login');
          return;
        }

        // Define request parameters
        let params = {};
        if (courseId) {
          params = { filter_id: courseId }; // If accessed via a specific course
        } else if (roleId === '2') {
          params = { filter_id: userId }; // If facilitator
        } else {
          params = { filter_id: cohortId }; // If student
        }

        const response = await axios.get(`${BASE_URL}/api/v1/cla_live_classes`, {
          params,
          headers: { Authorization: `Bearer ${token}` }
        });

        console.log('Live Classes API Response:', response.data);
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching live classes:', error);
        toast.error('Failed to fetch live classes. Please try again.');
      }
    };

    fetchLiveClasses();
  }, [courseId, navigate]);

  const getFilteredEvents = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return events
      .filter(event => (activeTab === 'new' ? new Date(event.date) >= today : new Date(event.date) < today))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
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
      </div>

      <div className="calendar-tabs">
        <button className={`tab-button ${activeTab === 'new' ? 'active' : ''}`} onClick={() => setActiveTab('new')}>
          <FontAwesomeIcon icon={faCalendarDay} /> Upcoming Classes
        </button>
        <button className={`tab-button ${activeTab === 'old' ? 'active' : ''}`} onClick={() => setActiveTab('old')}>
          <FontAwesomeIcon icon={faHistory} /> Past Classes
        </button>
      </div>

      <div className="events-list">
        {getFilteredEvents().length > 0 ? (
          getFilteredEvents().map(event => (
            <div key={event.id} className="event-card">
              <div className="event-details">
                <div className="event-datetime">
                  <div className="event-date">
                    <FontAwesomeIcon icon={faCalendarAlt} className="datetime-icon" /> 
                    <span className="datetime-text">{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="event-time">
                    <FontAwesomeIcon icon={faClock} className="datetime-icon" /> 
                    <span className="datetime-text">{event.time}</span>
                  </div>
                </div>
                <h3 className="event-title">{event.courseName}</h3>
                <div className="event-course">Facilitator: {event.facilitator || 'Not Assigned'}</div>
              </div>
              <div className="event-actions">
                <button type="button" className="action-icon" onClick={() => handleViewClass(event.zoom_link)} title="Join Class">
                  <FontAwesomeIcon icon={faEye} />
                </button>
                <button type="button" className="action-icon" title="Edit Class">
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button type="button" className="action-icon delete-icon" title="Delete Class">
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
