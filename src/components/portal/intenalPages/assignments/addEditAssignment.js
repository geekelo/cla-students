import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGraduationCap, 
  faClipboardList,
  faPlus,
  faCalendarAlt,
  faFileLines,
  faArrowLeft,
  faLayerGroup
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../../../stylesheets/addEditAssignment.css';

const BASE_URL = 'https://cla-portal-api.onrender.com';

const AddEditAssignment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { courseId, assignment, isEditMode } = location.state || {};
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);

  const [formData, setFormData] = useState({
    cla_assignment: {
      name: assignment?.name || '',
      description: assignment?.description || '',
      due_date: assignment?.due_date || '',
      cla_course_id: courseId || '',
      cla_user_id: sessionStorage.getItem('userId') || ''
    }
  });

  useEffect(() => {
    if (isEditMode && assignment) {
      setFormData({
        cla_assignment: {
          name: assignment.name,
          description: assignment.description,
          due_date: assignment.due_date,
          cla_course_id: assignment.cla_course_id,
          cla_user_id: sessionStorage.getItem('userId')
        }
      });
    }
  }, [isEditMode, assignment]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = sessionStorage.getItem('authToken');
        const userId = sessionStorage.getItem('userId');
        const userRole = localStorage.getItem('userRole');
        const cohortId = localStorage.getItem('cohortId');

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

        const response = await axios.get(`${BASE_URL}/api/v1/cla_courses`, {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      cla_assignment: {
        ...prev.cla_assignment,
        [name]: value
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

      console.log('Sending assignment data:', formData);

      let response;
      if (isEditMode) {
        response = await axios.put(`${BASE_URL}/api/v1/cla_assignments/${assignment.id}`, formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      } else {
        response = await axios.post(`${BASE_URL}/api/v1/cla_assignments`, formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      }

      console.log('Assignment response:', response.data);
      toast.success(isEditMode ? 'Assignment updated successfully!' : 'Assignment created successfully!');
      
      navigate('/portal/assignments');
    } catch (error) {
      console.error('Error with assignment:', error);
      let errorMessage = isEditMode ? 'Failed to update assignment. Please try again.' : 'Failed to create assignment. Please try again.';

      if (error.response) {
        console.log('Error response:', error.response.data);
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

  const handleBack = () => {
    navigate('/portal/assignments');
  };

  return (
    <div className="student-display-area">
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
      <button onClick={handleBack} className="back-button">
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </button>

      <div className="add-assignment-container">
        <div className="title-section">
          <h2>{isEditMode ? 'Edit Assignment' : 'Add New Assignment'} <FontAwesomeIcon icon={faGraduationCap} /></h2>
        </div>

        <p className="form-subtitle">Fill assignment details:</p>

        <form onSubmit={handleSubmit} className="assignment-form">
          <div className="form-group">
            <label>
              <FontAwesomeIcon icon={faClipboardList} className="form-icon" />
              Assignment Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.cla_assignment.name}
              onChange={handleChange}
              placeholder="Enter assignment name"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>
              <FontAwesomeIcon icon={faFileLines} className="form-icon" />
              Description
            </label>
            <textarea
              name="description"
              value={formData.cla_assignment.description}
              onChange={handleChange}
              placeholder="Enter assignment description"
              required
              rows="4"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>
              <FontAwesomeIcon icon={faCalendarAlt} className="form-icon" />
              Due Date
            </label>
            <input
              type="date"
              name="due_date"
              value={formData.cla_assignment.due_date}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>
              <FontAwesomeIcon icon={faLayerGroup} className="form-icon" />
              Course
            </label>
            <select
              name="cla_course_id"
              value={formData.cla_assignment.cla_course_id}
              onChange={handleChange}
              required
              disabled={loading}
              className="form-input"
            >
              <option value="">Select a course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="submit-button" disabled={loading}>
            <FontAwesomeIcon icon={faPlus} /> 
            {loading ? (isEditMode ? 'Updating Assignment...' : 'Creating Assignment...') 
              : (isEditMode ? 'Save Changes' : 'Add Assignment')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEditAssignment;
