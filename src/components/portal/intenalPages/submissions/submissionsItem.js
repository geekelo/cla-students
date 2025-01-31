import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faDownload } from '@fortawesome/free-solid-svg-icons';

function SubmissionItem({ submission }) {
  const [mark, setMark] = useState('');

  const handleMarkChange = (e) => {
    setMark(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMark('');
  };

  return (
    <li className="submission-card">
 

      <div className="submission-details">
        <div className="submission-link">
          <FontAwesomeIcon icon={faLink} className="link-icon" />
          <a href={`/portal/assignments/${submission.assignment_id}`}>Assignment</a>
        </div>
        <div className="submission-name">
          {submission.student_name}
        </div>
        <div className="submission-info">
          <div className="submission-id">ID: {submission.student_id}</div>
          <div className="submission-email">{submission.student_email}</div>
        </div>
      </div>
      <div className="submission-actions">
        <div className="action-top">
          <a className="download-link">
            <FontAwesomeIcon icon={faDownload} className="download-icon" />
            <span>Download Docs</span>
          </a>
        </div>
        <div className="action-bottom">
          {submission.status === 'unmarked' ? (
            <div className="unmarked-section">
              <form onSubmit={handleSubmit} className="mark-form">
                <input
                  type="number"
                  id={`mark-${submission.id}`}
                  value={mark}
                  onChange={handleMarkChange}
                  min="0"
                  max="100"
                  placeholder="0 %"
                  required
                />
                <button type="submit">Mark</button>
              </form>
            </div>
          ) : (
            <span className="submission-mark">Score: {submission.score}%</span>
          )}
        </div>
      </div>
    </li>
  );
}

SubmissionItem.propTypes = {
  submission: PropTypes.shape({
    id: PropTypes.number.isRequired,
    student_name: PropTypes.string.isRequired,
    student_id: PropTypes.string.isRequired,
    student_email: PropTypes.string.isRequired,
    dateSubmitted: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['marked', 'unmarked']).isRequired,
  }).isRequired,
};

export default SubmissionItem;
