import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SubmissionsSection from './submissionsSection';
import '../../../../stylesheets/submissions.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglassHalf, faCheckDouble } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

const BASE_URL = 'https://cla-portal-api.onrender.com';

function Submissions() {
  const [activeTab, setActiveTab] = useState('unmarked');
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

        const response = await axios.get(`${BASE_URL}/api/v1/cla_submissions`, {
          params: { cla_user_id: userId },
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log('Fetched Submissions:', response.data); // ✅ Debugging Log
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
      {/* Section Background */}
      <div className="submissions-section">
        {/* Tabs */}
        <div className="submissions-tabs">
          <button
            type="button"
            className={`tab-button ${activeTab === 'unmarked' ? 'active' : ''}`}
            onClick={() => setActiveTab('unmarked')}
          >
            <FontAwesomeIcon icon={faHourglassHalf} className="me-2" /> Unmarked
          </button>
          <button
            type="button"
            className={`tab-button ${activeTab === 'marked' ? 'active' : ''}`}
            onClick={() => setActiveTab('marked')}
          >
            <FontAwesomeIcon icon={faCheckDouble} className="me-2" /> Marked
          </button>
        </div>

        {/* Loading & Error Handling */}
        {loading ? (
          <p className="loading-text">Loading submissions...</p>
        ) : error ? (
          <p className="error-text">{error}</p>
        ) : (
          <>
            {/* Tab Content */}
            {activeTab === 'unmarked' && (
              <SubmissionsSection submissions={unmarkedSubmissions} title="Unmarked Submissions" />
            )}
            {activeTab === 'marked' && (
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
