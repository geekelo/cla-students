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
  const [loading, setLoading] = useState(true); // Start with loading true
  const [isFacilitator, setIsFacilitator] = useState(false);
  const [selectedCohort, setSelectedCohort] = useState('');
  const [cohorts, setCohorts] = useState([]);
  const [userRole, setUserRole] = useState('');
  // const [userId, setUserId] = useState('');

  const fetchCohorts = async () => {
    try {
      const token = sessionStorage.getItem('authToken');
      if (!token) {
        toast.error('Session expired. Please login again.');
        navigate('/login');
        return;
      }

      const response = await api.get('/api/v1/cla_cohorts', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCohorts(response.data.cohorts || response.data);
    } catch (error) {
      console.error('Error fetching cohorts:', error);
      toast.error('Failed to fetch cohorts. Please try again.');
    }
  };

  const applyCohortFilter = async (cohortId = selectedCohort) => {
    try {
      const token = sessionStorage.getItem('authToken');
      if (!token) {
        toast.error('Session expired. Please login again.');
        navigate('/login');
        return;
      }

      // Use the passed cohortId or fall back to selectedCohort state
      const targetCohortId = cohortId || selectedCohort;
      
      console.log('🔍 Using cohort ID:', targetCohortId);

      if (!targetCohortId) {
        const currentUserRole = sessionStorage.getItem('userRole');
        if (currentUserRole === 'student') {
          toast.error('Cohort information not found. Please login again.');
          navigate('/login');
          return;
        } else {
          // For facilitators, show all assignments if no cohort selected
          console.log('🔍 No cohort selected for facilitator, fetching all assignments');
        }
      }

      setLoading(true);

      const params = targetCohortId ? { cla_cohort_id: targetCohortId } : {};

      const assignmentsResponse = await api.get('/api/v1/cla_assignments', {
        params,
        headers: { Authorization: `Bearer ${token}` }
      });

      setAssignments(assignmentsResponse.data);
      
    } catch (error) {
      console.error('Error fetching assignments:', error);
      toast.error('Failed to fetch assignments. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCohortChange = (e) => {
    const newCohortId = e.target.value;
    console.log('🔄 Cohort changed to:', newCohortId);
    setSelectedCohort(newCohortId);
    if (newCohortId) {
      applyCohortFilter(newCohortId);
    }
  };

  // Initial setup - get user info from session
  useEffect(() => {
    console.log('🚀 Initial setup useEffect');
    
    const userRole = sessionStorage.getItem('userRole');
    const userId = sessionStorage.getItem('userId');
    const cohortId = sessionStorage.getItem('cohortId');
    
    console.log('📋 Session data:', { userRole, userId, cohortId });
    
    setUserRole(userRole);
    // setUserId(userId);
    setIsFacilitator(userRole === 'facilitator');
    
    // Set cohort for students immediately
    if (userRole === 'student' && cohortId) {
      setSelectedCohort(cohortId);
    }
  }, []);

  // Handle data loading based on user role and location state
  useEffect(() => {    
    if (!userRole) {
      return; // Wait for user role to be set
    }

    // Check if assignments are passed through location state first
    if (location.state?.assignments && location.state.assignments.length > 0) {
      setAssignments(location.state.assignments);
      setLoading(false);
      return;
    }

    // Handle based on user role
    if (userRole === 'facilitator') {
      fetchCohorts();
      // Don't load assignments yet - wait for cohort selection
      setLoading(false);
    } else if (userRole === 'student') {
      const cohortId = sessionStorage.getItem('cohortId');
      if (cohortId) {
        // Apply filter with the cohort ID directly
        applyCohortFilter(cohortId);
      } else {
        console.error('❌ Student has no cohort ID');
        toast.error('Cohort information not found. Please login again.');
        navigate('/login');
      }
    }
  }, [userRole, location.state]);

  // Handle cohort filter for facilitators when selectedCohort changes
  useEffect(() => {    
    // Only auto-apply filter for facilitators when they select a cohort
    if (userRole === 'facilitator' && selectedCohort && cohorts.length > 0) {
      console.log('👨‍🏫 Facilitator cohort selected, applying filter');
      applyCohortFilter(selectedCohort);
    }
  }, [selectedCohort, userRole, cohorts]);


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
          </div>
        )}
      </div>

      {loading ? (<div className="loading">Loading assignments...</div>)  : (
      <div className="assignments-list">
        {currAssignments?.length > 0 ? (
          currAssignments.map((assignment) => (
            <AssignmentItem key={assignment.id} assignment={assignment} />
          ))
        ) : (
          <p className="no-assignments">
            {userRole === 'facilitator' && !selectedCohort 
              ? 'Please select a cohort to view assignments.'
              : 'No assignments available.'
            }
          </p>
        )}
      </div>)}
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
  ),
};

Assignments.defaultProps = {
  assignments: [],
};

export default Assignments;
