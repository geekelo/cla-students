import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalendarAlt,
  faClock,
  faVideo,
  faUsers,
  faBook
} from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../../../stylesheets/scheduleLiveClass.css';
import { createAxiosInstance } from '../../../../config';

const api = createAxiosInstance();

const ScheduleLiveClass = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { liveClass, courseId, isEditMode } = location.state || {};
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [cohorts, setCohorts] = useState([]);

  const [formData, setFormData] = useState({
    cla_live_class: {
      name: liveClass?.name || '',
      date: liveClass?.date || '',
      time: liveClass?.time || '',
      duration: liveClass?.duration || '',
      zoom_link: liveClass?.zoom_link || '',
      cla_course_id: courseId || liveClass?.cla_course_id || '',
      cohort_id: sessionStorage.getItem('cohortId') || liveClass?.cohort_id || '',
      cla_user_id: sessionStorage.getItem('userId') || liveClass?.cla_user_id || ''
    }
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = sessionStorage.getItem('authToken');
        const userId = sessionStorage.getItem('userId');
        const userRole = sessionStorage.getItem('userRole');
        const cohortId = sessionStorage.getItem('cohortId');

        if (!token || !userId) {
          toast.error('Session expired. Please login again.');
          navigate('/login');
          return;
        }

        let params = {};
        if (userRole === 'student') {
          params = { cohort_id: cohortId };
        } else if (userRole === 'facilitator') {
          params = { cla_user_id: userId };
        }
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Fetch cohorts
        const cohortsResponse = await api.get('/api/v1/cla_cohorts');
        setCohorts(cohortsResponse.data.cohorts || []);
       

        const response = await api.get('/api/v1/cla_courses', {
          params,
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
        toast.error('Failed to fetch courses. Please try again.');
      }
    };

    fetchCourses();
  }, [navigate]);

  useEffect(() => {
    if (isEditMode && liveClass) {
      setFormData({
        cla_live_class: {
          name: liveClass.name,
          date: liveClass.date,
          time: liveClass.time,
          duration: liveClass.duration,
          zoom_link: liveClass.zoom_link,
          cla_course_id: liveClass.cla_course_id,
          cohort_id: liveClass.cohort_id,
          cla_user_id: liveClass.cla_user_id
        }
      });
    }
  }, [isEditMode, liveClass]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let finalValue = value;
  
    if (name === 'cla_cohort_id') {
      finalValue = parseInt(value);
      // Store cohort ID in session storage when selected
      sessionStorage.setItem('cohortId', finalValue);
    }
    setFormData(prev => ({
      ...prev,
      cla_live_class: {
        ...prev.cla_live_class,
        [name]: finalValue
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = sessionStorage.getItem('authToken');
      if (!token) {
        toast.error('Session expired. Please login again.');
        navigate('/login');
        return;
      }

      let response;
      if (isEditMode) {
        response = await api.put(`/api/v1/cla_live_classes/${liveClass.id}`, formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      } else {
        response = await api.post('/api/v1/cla_live_classes', formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      }

      toast.success(isEditMode ? 'Live class updated successfully!' : 'Live class scheduled successfully!');
      navigate('/portal/calendar');
    } catch (error) {
      console.error('Error with live class:', error);
      let errorMessage = isEditMode ? 'Failed to update live class. Please try again.' : 'Failed to schedule live class. Please try again.';

      if (error.response) {
        console.error('Error response:', error.response.data);
        if (typeof error.response.data.error === 'string') {
          errorMessage = error.response.data.error;
        } else if (error.response.data.errors) {
          errorMessage = Object.entries(error.response.data.errors)
            .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
            .join('\n');
        }
      }

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="schedule-live-class-container">
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
      <h2 className="schedule-title">{isEditMode ? 'Edit Live Class' : 'Schedule a Live Class'}</h2>
      <form className="schedule-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="cla_course_id">
            <FontAwesomeIcon icon={faBook} className="form-icon" />
            Course
          </label>
          <select 
            id="cla_course_id" 
            name="cla_course_id" 
            className="form-input" 
            value={formData.cla_live_class.cla_course_id}
            onChange={handleChange}
            required
            disabled={loading}
          >
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="name">
            <FontAwesomeIcon icon={faVideo} className="form-icon" />
            Class Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-input"
            placeholder="Enter class name"
            value={formData.cla_live_class.name}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">
            <FontAwesomeIcon icon={faCalendarAlt} className="form-icon" />
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            className="form-input"
            value={formData.cla_live_class.date}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="time">
            <FontAwesomeIcon icon={faClock} className="form-icon" />
            Time
          </label>
          <input
            type="time"
            id="time"
            name="time"
            className="form-input"
            value={formData.cla_live_class.time}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="duration">
            <FontAwesomeIcon icon={faClock} className="form-icon" />
            Duration (in minutes)
          </label>
          <input
            type="number"
            id="duration"
            name="duration"
            className="form-input"
            placeholder="Enter duration in minutes"
            value={formData.cla_live_class.duration}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="zoom_link">
            <FontAwesomeIcon icon={faVideo} className="form-icon" />
            Zoom Link
          </label>
          <input
            type="url"
            id="zoom_link"
            name="zoom_link"
            className="form-input"
            placeholder="Enter Zoom link"
            value={formData.cla_live_class.zoom_link}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
                        <label htmlFor="cla_cohort_id" className="form-label">
                          <FontAwesomeIcon icon={faUsers} className="input-icon" />
                          Select Cohort
                        </label>
                        <select
                          id="cla_cohort_id"
                          name="cla_cohort_id"
                          className="form-input"
                          value={formData.cla_cohort_id}
                          onChange={handleChange}
                          required
                          disabled={loading}
                        >
                          <option value="">Select a cohort</option>
                          {Array.isArray(cohorts) && cohorts.map((cohort) => (
                            <option key={cohort.id} value={cohort.id}>
                              {cohort.name}
                            </option>
                          ))}
                        </select>
                      </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? (isEditMode ? 'Updating...' : 'Scheduling...') 
            : (isEditMode ? 'Save Changes' : 'Schedule Class')}
        </button>
      </form>
    </div>
  );
};

export default ScheduleLiveClass;
