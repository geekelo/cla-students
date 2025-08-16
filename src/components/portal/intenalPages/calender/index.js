import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEdit, 
  faTrash,
  faEye,
  faCalendarAlt,
  faClock,
  faHistory,
  faCalendarDay,
  faCamera
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { createAxiosInstance } from '../../../../config';
import { formatDateWithOrdinal } from '../../../helpers/dateFormatter';
import { toast, ToastContainer } from 'react-toastify';
import '../../../../stylesheets/calender.css';
import 'react-toastify/dist/ReactToastify.css';

const api = createAxiosInstance();

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

        const response = await api.get('/api/v1/cla_live_classes', {
          params,
          headers: { Authorization: `Bearer ${token}` }
        });

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
      .filter(event => {
        const eventDate = new Date(event.date);
        
        if (activeTab === 'new') {
          // For upcoming events, just check if the date is in the future
          return eventDate >= today;
        } else {
          // For past events, check both the date and cohort_end_date
          const cohortEndDate = event.cla_cohort_end_date ? new Date(event.cla_cohort_end_date) : null;
          
          // Only show past events where:
          // 1. The event date is in the past
          // 2. Either there's no cohort end date, or the cohort end date hasn't passed yet
          return eventDate < today && (!cohortEndDate || cohortEndDate >= today);
        }
      })
      .sort((a, b) => {
        // Sort in different directions based on the tab
        if (activeTab === 'new') {
          return new Date(a.date) - new Date(b.date); // Ascending for upcoming
        } else {
          return new Date(b.date) - new Date(a.date); // Descending for past
        }
      });
  };

  const handleViewClass = (zoomLink) => {
    if (zoomLink) {
      window.open(zoomLink, '_blank');
    } else {
      alert('Zoom link not available for this class');
    }
  };

  const handleEdit = (event) => {
    navigate('/portal/event/new', {
      state: {
        liveClass: event,
        courseId: event.cla_course_id,
        isEditMode: true
      }
    });
  };

  const handleDelete = async (event) => {
    // Show confirmation toast
    toast.info(
      <div>
        <p>Are you sure you want to delete this live class?</p>
        <button 
          onClick={() => confirmDelete(event)} 
          style={{
            background: '#6b4ca6',
            color: 'white',
            padding: '5px 10px',
            border: 'none',
            borderRadius: '4px',
            marginRight: '10px',
            cursor: 'pointer'
          }}
        >
          Yes, Delete
        </button>
      </div>,
      {
        autoClose: false,
        closeOnClick: false,
        closeButton: true
      }
    );
  };

  const confirmDelete = async (event) => {
    try {
      const token = sessionStorage.getItem('authToken');
      if (!token) {
        toast.error('Session expired. Please login again.');
        navigate('/login');
        return;
      }

      toast.info('Deleting live class...', {
        autoClose: false,
        toastId: 'deletingLiveClass'
      });

      await api.delete(`/api/v1/cla_live_classes/${event.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Update the events list after successful deletion
      setEvents(events.filter(e => e.id !== event.id));
      toast.dismiss('deletingLiveClass');
      toast.success('Live class deleted successfully!');
    } catch (error) {
      toast.dismiss('deletingLiveClass');
      console.error('Error deleting live class:', error);
      toast.error('Failed to delete live class. Please try again.');
    }
  };

  return (
    <div className="calendar-container">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
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
                <div className="event-course">
                  <FontAwesomeIcon icon={faCamera} className="datetime-icon" /> 
                  {' '}
                  <span className="datetime-text">{event.name}</span>
                </div>
                <div className="event-datetime">
                  <div className="event-date">
                    <FontAwesomeIcon icon={faCalendarAlt} className="datetime-icon" /> 
                    <span className="datetime-text">{formatDateWithOrdinal(event.date)}</span>
                  </div>
                  <div className="event-time">
                    <FontAwesomeIcon icon={faClock} className="datetime-icon" /> 
                    <span className="datetime-text">
                      {new Date(event.time).toLocaleString(undefined, {
                        timeStyle: 'short',
                      })}
                    </span>
                  </div>
                </div>
                <h3 className="event-title">{event.courseName}</h3>
              </div>
              <div className="event-actions">
                <button type="button" className="action-icon" onClick={() => handleViewClass(event.zoom_link)} title="Join Class">
                  <FontAwesomeIcon icon={faEye} />
                </button>
                {sessionStorage.getItem('userRole') === 'facilitator' && (
                  <>
                    <button type="button" className="action-icon" onClick={() => handleEdit(event)} title="Edit Class">
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button type="button" className="action-icon delete-icon" onClick={() => handleDelete(event)} title="Delete Class">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </>
                )}
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

