import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SubmissionsSection from './submissionsSection';
import '../../../../stylesheets/submissions.css'; // Include the styles

function Submissions({ submissions }) {
  const [activeTab, setActiveTab] = useState('unmarked'); // Default tab

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
            Unmarked
          </button>
          <button
            type="button"
            className={`tab-button ${activeTab === 'marked' ? 'active' : ''}`}
            onClick={() => setActiveTab('marked')}
          >
            Marked
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
