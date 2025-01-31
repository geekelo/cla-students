import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SubmissionsSection from './submissionsSection';
import '../../../../stylesheets/submissions.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglassHalf, faCheckDouble } from '@fortawesome/free-solid-svg-icons';
import submissions from '../../../../data/submissions.json';

function Submissions() {
  const [activeTab, setActiveTab] = useState('unmarked');

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

        {/* Tab Content */}
        {activeTab === 'unmarked' && (
          <SubmissionsSection submissions={unmarkedSubmissions} title="Unmarked Submissions" />
        )}
        {activeTab === 'marked' && (
          <SubmissionsSection submissions={markedSubmissions} title="Marked Submissions" />
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
  ).isRequired,
};

export default Submissions;
