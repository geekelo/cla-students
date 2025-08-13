import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { createAxiosInstance } from '../../../../config';
import CourseList from './courseList';

const api = createAxiosInstance();


function Courses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFacilitator, setIsFacilitator] = useState(false);
  const [userId, setUserId] = useState('');
  const [selectedCohort, setSelectedCohort] = useState('');
  const [cohorts, setCohorts] = useState([]);
  const [userRole, setUserRole] = useState('');

  const handleCohortChange = (e) => {
    const newCohortId = e.target.value;
    setSelectedCohort(newCohortId);
    
    // Use the new cohort ID directly instead of relying on state
    if (newCohortId) {
      applyCohortFilter(newCohortId);
    }
  };

  const fetchCohorts = async () => {
    const response = await api.get('/api/v1/cla_cohorts');
    setCohorts(response.data.cohorts);
  };

  const applyCohortFilter = async (cohortId = selectedCohort) => {
    try {
      const token = sessionStorage.getItem('authToken');

      if (!userId || !token) {
        toast.error('Session expired. Please login again.');
        navigate('/login');
        return;
      }

      if (!userRole) {
        toast.error('User role not found. Please login again.');
        navigate('/login');
        return;
      }

      const params = {
        cla_cohort_id: cohortId
      };
      
      const coursesResponse = await api.get('/api/v1/cla_courses/', {
        params,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setCourses(coursesResponse.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching data:', err);
      console.error('Error details:', err.response?.data);
      setError('Failed to fetch courses. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    const userRole = sessionStorage.getItem('userRole');
    setUserRole(userRole);
    setUserId(sessionStorage.getItem('userId'));
    setIsFacilitator(userRole === 'facilitator');
  }, []);

  useEffect(() => {
    if (userRole === 'facilitator') {
      fetchCohorts();
    } else {
      setSelectedCohort(sessionStorage.getItem('cohortId'))
      if (selectedCohort) {
        applyCohortFilter();
      }
    }
    setLoading(false);
  }, [userRole]);


  if (error) {
    return <div className="course-list error">{error}</div>;
  }

  return (
    <div className="assignments-section">
      {/* Title Section */}
      <div className="assignments-title-container">
        <h2 className="assignments-title">Courses</h2>
      </div>

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

      {/* Filter Section - Only for facilitators */}
      {isFacilitator && (
        <div className="cohort-filter-section">
          <div className="cohort-filter">
            <div className="filter-label">
              <FontAwesomeIcon icon={faFilter} className="filter-icon" />
              Filter by Cohort:
            </div>
            <select
              className="cohort-select"
              value={selectedCohort}
              onChange={handleCohortChange}
            >
              <option value="">Select a cohort</option>
              {cohorts?.length > 0 && cohorts.map((cohort) => (
                <option key={cohort.id} value={cohort.id}>
                  {cohort.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Courses List */}
      {loading ? (<div className="loading">Loading courses...</div>)  : (
        courses.map((course) => (
          <CourseList key={course.id} course={course} />
        ))
      )}
    </div>
  );
}

Courses.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      locked: PropTypes.bool.isRequired,
    }),
  ),
};

Courses.defaultProps = {
  courses: [],
};

export default Courses;

