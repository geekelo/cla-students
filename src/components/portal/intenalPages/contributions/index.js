import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ContributionItem from './contributionItem';
import '../../../../stylesheets/assignments.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { createAxiosInstance } from '../../../../config';

const api = createAxiosInstance();

function Contributions() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currContributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFacilitator, setIsFacilitator] = useState(false);
  const [cohorts, setCohorts] = useState([]);
  const [selectedCohort, setSelectedCohort] = useState('');

  useEffect(() => {
    const userRole = sessionStorage.getItem('userRole');
    setIsFacilitator(userRole === 'facilitator');
    
    // If Contributions are passed through location state, use those
    if (location.state?.contributions && location.state.contributions.length > 0) {
      setContributions(location.state.contributions);
      setLoading(false);
      return;
    }
    
    // Fetch cohorts if facilitator and set cohort if student
    if (userRole === 'facilitator') {
      fetchCohorts();
    } else {
      const cla_cohort_id = sessionStorage.getItem('cohortId');
      setSelectedCohort(cla_cohort_id);
      // Fetch contributions for the student's cohort
      if (cla_cohort_id) {
        fetchContributions(cla_cohort_id);
      }
    }
  }, [location.state, navigate]);

  const fetchCohorts = async () => {
    try {
      const token = sessionStorage.getItem('authToken');
      if (!token) {
        toast.error('Session expired. Please login again.');
        navigate('/login');
        return;
      }

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await api.get('/api/v1/cla_cohorts');

      if (response.data && response.data.cohorts) {
        setCohorts(response.data.cohorts);
      }
    } catch (error) {
      console.error('Error fetching cohorts:', error);
      toast.error('Failed to fetch cohorts');
    }
  };

  const fetchContributions = async (cohortId) => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem('authToken');
      if (!token) {
        toast.error('Session expired. Please login again.');
        navigate('/login');
        return;
      }

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      const contributionsResponse = await api.get('/api/v1/cla_contributions', {
        params: { cla_cohort_id: cohortId },
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setContributions(contributionsResponse.data);
    } catch (error) {
      console.error('Error fetching contributions:', error);
      toast.error('Failed to fetch contributions');
    } finally {
      setLoading(false);
    }
  };

  const handleCohortChange = (e) => {
    const newCohortId = e.target.value;
    setSelectedCohort(newCohortId);
    
    // Use the new cohort ID directly instead of relying on state
    if (newCohortId) {
      applyCohortFilter(newCohortId);
    }
  };

  const applyCohortFilter = async (cohortId = selectedCohort) => {
    if (!cohortId) {
      toast.warning('Please select a cohort first.');
      return;
    }

    await fetchContributions(cohortId);
    toast.success('Filtered contributions for selected cohort');
  };

  return (
    <section className="assignments-section">
      {/* Title Section */}
      <div className="assignments-title-container">
        <h2 className="assignments-title">Contributions</h2>
      </div>

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
              {cohorts?.length > 0 && cohorts?.map((cohort) => (
                <option key={cohort.id} value={cohort.id}>
                  {cohort.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
      {loading ? (<div className="loading">Loading contributions...</div>)  : (
      <div className="assignments-list">
        {currContributions?.length > 0 ? (
          currContributions.map((contribution) => (
            <ContributionItem key={contribution.id} contribution={contribution} />
          ))
        ) : (
          <p className="no-assignments">
            No contributions available.
          </p>
        )}
      </div>)}
    </section>
  );
}

Contributions.propTypes = {
  Contributions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      submitted: PropTypes.bool.isRequired,
    }),
  ).isRequired,
};

export default Contributions;
