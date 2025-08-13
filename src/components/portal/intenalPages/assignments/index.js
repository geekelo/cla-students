import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AssignmentItem from './assignmentItem';
import '../../../../stylesheets/assignments.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { createAxiosInstance } from '../../../../config';

const api = createAxiosInstance();

function Assignments() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currAssignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFacilitator, setIsFacilitator] = useState(false);
  const [selectedCohort, setSelectedCohort] = useState('');
  const [cohorts, setCohorts] = useState([]);


  const fetchCohorts = async () => {
    const response = await api.get('/api/v1/cla_cohorts');
    setCohorts(response.data.cohorts);
  };

    const applyCohortFilter = async () => {
      try {
        const token = sessionStorage.getItem('authToken');

        if (!token) {
          toast.error('Session expired. Please login again.');
          navigate('/login');
          return;
        }

        if (!selectedCohort) {
          const userRole = sessionStorage.getItem('userRole');
          if (userRole === 'student') {
            toast.error('Cohort information not found. Please login again.');
            navigate('/login');
            return;
          } else {
            toast.warning('Cohort information not found. Some features may be limited.');
          }
        }

        // If assignments are passed through location state, use those
        if (location.state?.assignments && location.state.assignments.length > 0) {
          setAssignments(location.state.assignments);
          setLoading(false);
          return;
        }
        const assignmentsResponse = await api.get('/api/v1/cla_assignments', {
          params: { cla_cohort_id: selectedCohort },
          headers: { Authorization: `Bearer ${token}` }
        });
        setAssignments(assignmentsResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching assignments:', error);
        toast.error('Failed to fetch assignments. Please try again.');
        setLoading(false);
      }
    };

  const handleCohortChange = (e) => {
    setSelectedCohort(e.target.value);
  };

  if (loading) {
    return <div className="loading">Loading assignments...</div>;
  }

  useEffect(() => {
    const userRole = sessionStorage.getItem('userRole');
    setIsFacilitator(userRole === 'facilitator');
    // Fetch cohorts if facilitator and set cohort if student
    if (userRole === 'facilitator') {
      fetchCohorts();
    } else {
      setSelectedCohort(sessionStorage.getItem('cohortId'));
      applyCohortFilter();
    }

    // If Contributions are passed through location state, use those
    if (location.state?.assignments && location.state.assignments.length > 0) {
      setAssignments(location.state.assignments);
      setLoading(false);
      return;
    }
  }, [location.state, navigate]);

  return (
    <section className="assignments-section">
      <div className="assignments-tabs">
        {isFacilitator && (
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
            <button
              type="button"
              className="filter-button"
              onClick={applyCohortFilter}
              disabled={!selectedCohort}
            >
              Apply Filter
            </button>
          </div>
        )}
      </div>
      <div className="assignments-list">
        {currAssignments?.length > 0 ? (
          currAssignments.map((assignment) => (
            <AssignmentItem key={assignment.id} assignment={assignment} />
          ))
        ) : (
          <p className="no-assignments">
            No assignments available.
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
