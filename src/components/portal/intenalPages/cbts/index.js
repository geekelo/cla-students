import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CbtItem from './cbtItem';
import '../../../../stylesheets/assignments.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { createAxiosInstance } from '../../../../config';

const api = createAxiosInstance();

function Cbts() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currCbts, setCbts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFacilitator, setIsFacilitator] = useState(false);
  const [cohorts, setCohorts] = useState([]);
  const [selectedCohort, setSelectedCohort] = useState('');

  useEffect(() => {
    const userRole = sessionStorage.getItem('userRole');
    setIsFacilitator(userRole === 'facilitator');
    
    // Fetch cohorts if facilitator and set cohort if student
    if (userRole === 'facilitator') {
      fetchCohorts();
    } else {
      const cla_cohort_id = sessionStorage.getItem('cohortId');
      setSelectedCohort(cla_cohort_id);
    }
    // If Cbts are passed through location state, use those
    if (location.state?.cbts && location.state.cbts.length > 0) {
      setCbts(location.state.cbts);
      setLoading(false);
      return;
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

  const handleCohortChange = (e) => {
    const newCohortId = e.target.value;
    setSelectedCohort(newCohortId);
    
    // Use the new cohort ID directly instead of relying on state
    if (newCohortId) {
      applyCohortFilter(newCohortId);
    }
  };

  const applyCohortFilter = async (cohortId = selectedCohort) => {
    if (!selectedCohort) {
      toast.warning('Please select a cohort first.');
      return;
    }

    setLoading(true);
    try {
      const token = sessionStorage.getItem('authToken');
      if (!token) {
        toast.error('Session expired. Please login again.');
        navigate('/login');
        return;
      }

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      const cbtsResponse = await api.get('/api/v1/cla_cbts', {
        params: { cla_cohort_id: cohortId },
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setCbts(cbtsResponse.data);
      toast.success('Filtered cbts for selected cohort');
    } catch (error) {
      console.error('Error fetching filtered cbts:', error);
      toast.error('Failed to fetch cbts for selected cohort');
    } finally {
      setLoading(false);
    }
  };

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
              {cohorts.map((cohort) => (
                <option key={cohort.id} value={cohort.id}>
                  {cohort.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      {loading ? (<div className="loading">Loading cbts...</div>)  : (
      <div className="assignments-list">
        {currCbts?.length > 0 ? (
          currCbts.map((cbt) => (
            <CbtItem key={cbt.id} cbt={cbt} />
          ))
        ) : (
          <p className="no-assignments">
            No cbts available.
          </p>
        )}
      </div>)}
    </section>
  );
}

Cbts.propTypes = {
  Cbts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      submitted: PropTypes.bool.isRequired,
    }),
  ).isRequired,
};

export default Cbts;
