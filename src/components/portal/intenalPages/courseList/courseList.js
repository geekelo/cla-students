import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BASE_URL = 'https://cla-portal-api.onrender.com';

function CourseList() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const userId = sessionStorage.getItem('userId');
        const token = sessionStorage.getItem('authToken');
        const userRole = localStorage.getItem('userRole');
        const cohortId = localStorage.getItem('cohortId');

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

        let params = {};
        if (userRole === 'student') {
          params = { cohort_id: cohortId };
        } else if (userRole === 'facilitator') {
          params = { cla_user_id: userId };
        }

        console.log('Fetching courses with params:', params);
        console.log('User Role:', userRole);
        console.log('User Id:', userId);

        const coursesResponse = await axios.get(`${BASE_URL}/api/v1/cla_courses/`, {
          params,
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log('Courses API Response:', coursesResponse);
        console.log('Courses data:', coursesResponse.data);

        setCourses(coursesResponse.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        console.error('Error details:', err.response?.data);
        setError('Failed to fetch courses. Please try again later.');
        setLoading(false);
      }
    };

    fetchCourses();
  }, [navigate]);

  const handleCourseClick = (course) => {
    if (course.locked) {
      alert(`${course.name} is locked! Complete prerequisites first.`);
    } else {
      navigate(`/portal/courses/${course.id}`, { state: { course } });
    }
  };

  if (loading) {
    return <div className="course-list loading">Loading courses...</div>;
  }

  if (error) {
    return <div className="course-list error">{error}</div>;
  }

  return (
    <div className="course-list">
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
      {courses.map((course) => (
        <button
          key={course.id}
          className={`course-item ${course.locked ? 'locked' : 'unlocked'}`}
          onClick={() => handleCourseClick(course)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleCourseClick(course);
          }}
          tabIndex={0}
          type="button"
        >
          {course.name}
          {course.locked && (
            <span className="lock-icon" aria-label="locked course">
              🔒
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

CourseList.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      locked: PropTypes.bool.isRequired,
    }),
  ),
};

CourseList.defaultProps = {
  courses: [],
};

export default CourseList;
