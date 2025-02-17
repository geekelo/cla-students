import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglassHalf, faCheckDouble } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { createAxiosInstance } from '../../../../config';
import '../../../../stylesheets/submissions.css';
import SubmissionsSection from './submissionsSection';

const api = createAxiosInstance();

function Submissions() {
  const userRole = sessionStorage.getItem('userRole');
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const token = sessionStorage.getItem('authToken');
        const userId = sessionStorage.getItem('userId');

        if (!token || !userId) {
          toast.error('Session expired. Please login again.');
          navigate('/login');
          return;
        }

        const response = await api.get('/api/v1/cla_submissions', {
          params: { cla_user_id: userId },
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log('Fetched Submissions:', response.data);
        setSubmissions(response.data);
      } catch (error) {
        console.error('Error fetching submissions:', error);
        setError('Failed to load submissions. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [navigate]);

  // Filter submissions for each tab
  const markedSubmissions = submissions?.filter((submission) => submission.status === 'marked');
  const unmarkedSubmissions = submissions?.filter((submission) => submission.status === 'unmarked');

  return (
    <div className="submissions-section-wrapper">
      <div className="submissions-section">
        {/* Show only the relevant tab based on user role */}
        <div className="submissions-tabs">
          {userRole === 'facilitator' && (
            <button
              type="button"
              className="tab-button active"
            >
              <FontAwesomeIcon icon={faHourglassHalf} className="me-2" /> Unmarked
            </button>
          )}
          {userRole === 'student' && (
            <button
              type="button"
              className="tab-button active"
            >
              <FontAwesomeIcon icon={faCheckDouble} className="me-2" /> Marked
            </button>
          )}
        </div>

        {loading ? (
          <p className="loading-text">Loading submissions...</p>
        ) : error ? (
          <p className="error-text">{error}</p>
        ) : (
          <>
            {userRole === 'facilitator' && (
              <SubmissionsSection submissions={unmarkedSubmissions} title="Unmarked Submissions" />
            )}
            {userRole === 'student' && (
              <SubmissionsSection submissions={markedSubmissions} title="Marked Submissions" />
            )}
          </>
        )}
      </div>
    </div>
  );
}

Submissions.propTypes = {
  submissions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      studentName: PropTypes.string.isRequired,
      dateSubmitted: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['marked', 'unmarked']).isRequired,
    }),
  ),
};

export default Submissions;
