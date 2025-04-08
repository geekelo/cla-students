import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AssignmentItem from './assignmentItem';
import '../../../../stylesheets/assignments.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCheckCircle, faClipboardCheck } from '@fortawesome/free-solid-svg-icons';
import { createAxiosInstance } from '../../../../config';

const api = createAxiosInstance();

function Assignments() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [currAssignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFacilitator, setIsFacilitator] = useState(false);

  useEffect(() => {
    const userRole = sessionStorage.getItem('userRole');
    setIsFacilitator(userRole === 'facilitator');
    // Set default active tab based on role
    setActiveTab(userRole === 'facilitator' ? 'all' : 'pending');
  }, []);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const token = sessionStorage.getItem('authToken');
        const cla_cohort_id = sessionStorage.getItem('cohortId');

        if (!token) {
          toast.error('Session expired. Please login again.');
          navigate('/login');
          return;
        }

        if (!cla_cohort_id) {
          toast.error('Cohort information not found. Please login again.');
          navigate('/login');
          return;
        }

        // If assignments are passed through location state, use those
        if (location.state?.assignments && location.state.assignments.length > 0) {
          setAssignments(location.state.assignments);
          setLoading(false);
          return;
        }

        // Fetch course IDs first
        const courseIdsResponse = await api.get('/api/v1/cla_courses/get_course_ids', {
          params: { cla_cohort_id: cla_cohort_id },
          headers: { Authorization: `Bearer ${token}` }
        });

        // Access the course_ids array from the response
        const courseIds = courseIdsResponse.data.course_ids;
        
        if (!courseIds || !Array.isArray(courseIds)) {
          console.error('Invalid course IDs response:', courseIdsResponse.data);
          toast.error('Failed to fetch course IDs. Please try again.');
          setLoading(false);
          return;
        }

        // Fetch assignments for each course
        const allAssignments = [];
        for (const courseId of courseIds) {
          const assignmentsResponse = await api.get('/api/v1/cla_assignments', {
            params: { cla_course_id: courseId },
            headers: { Authorization: `Bearer ${token}` }
          });
          allAssignments.push(...assignmentsResponse.data);
        }
        setAssignments(allAssignments);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching assignments:', error);
        toast.error('Failed to fetch assignments. Please try again.');
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [location.state, navigate]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Filter assignments for each tab
  const filteredAssignments = currAssignments?.filter((assignment) => {
    if (activeTab === 'pending') return assignment.submitted === false;
    if (activeTab === 'submitted') return assignment.submitted === true;
    if (activeTab === 'all') return true; // Show all assignments for facilitator
    return false;
  });

  if (loading) {
    return <div className="loading">Loading assignments...</div>;
  }

  return (
    <section className="assignments-section">
      <div className="assignments-tabs">
        {isFacilitator ? (
          <button
            type="button"
            className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => handleTabClick('all')}
          >
            <FontAwesomeIcon icon={faCheckCircle} className="me-2" /> ALL
          </button>
        ) : (
          <>
            <button
              type="button"
              className={`tab-button ${activeTab === 'pending' ? 'active' : ''}`}
              onClick={() => handleTabClick('pending')}
            >
              <FontAwesomeIcon icon={faClock} className="me-2" /> Pending
            </button>
            <button
              type="button"
              className={`tab-button ${activeTab === 'submitted' ? 'active' : ''}`}
              onClick={() => handleTabClick('submitted')}
            >
              <FontAwesomeIcon icon={faClipboardCheck} className="me-2" /> Submitted
            </button>
          </>
        )}
      </div>
      <div className="assignments-list">
        {filteredAssignments?.length > 0 ? (
          filteredAssignments.map((assignment) => (
            <AssignmentItem key={assignment.id} assignment={assignment} />
          ))
        ) : (
          <p className="no-assignments">
            No
            {' '}
            {activeTab}
            {' '}
            assignments available.
          </p>
        )}
      </div>
    </section>
  );
}

Assignments.propTypes = {
  assignments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      submitted: PropTypes.bool.isRequired,
    }),
  ).isRequired,
};

export default Assignments;
