import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = 'https://cla-portal-api.onrender.com';

function CourseList() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const userRole = sessionStorage.getItem('userRole');
        const cla_user_id = sessionStorage.getItem('userId');
        const cohort_id = sessionStorage.getItem('cohortId');
        
        let params = {};
        if (userRole === 'student') {
          params = { cohort_id };
        } else if (userRole === 'facilitator') {
          params = { cla_user_id };
        }

        console.log('Fetching courses with params:', params);
        console.log('User Role:', userRole);
        console.log('User Id:', cla_user_id);
        console.log('Auth Token:', sessionStorage.getItem('authToken'));

        const response = await axios.get(`${BASE_URL}/api/v1/cla_courses/`, {
          params,
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
          }
        });

        console.log('API Response:', response);
        console.log('Courses data:', response.data);

        setCourses(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching courses:', err);
        console.error('Error details:', err.response?.data);
        setError('Failed to fetch courses. Please try again later.');
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

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
