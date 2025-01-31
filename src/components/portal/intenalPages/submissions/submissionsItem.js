import React, { useState } from 'react';
import PropTypes from 'prop-types';

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
          <a href={`/portal/assignments/${submission.assignment_id}`}>Assignment</a>
        </div>
        <div className="submission-name">
          {submission.student_name}
        </div>
        <div className="submission-info">
          <span className="submission-id">ID: {submission.student_id}</span>
          <span className="submission-email">{submission.student_email}</span>
        </div>
      </div>
      <div className="submission-actions">
        <a className="download-link">Download</a>
        <span className="submission-date">{submission.dateSubmitted}</span>
        {submission.status === 'unmarked' ? (
          <form onSubmit={handleSubmit} className="mark-form">
            <input
              type="number"
              id={`mark-${submission.id}`}
              value={mark}
              onChange={handleMarkChange}
              min="0"
              max="100"
              placeholder="Mark"
              required
            />
            <button type="submit">Submit</button>
          </form>
        ) : (
          <span className="submission-mark">Score: {submission.score}%</span>
        )}
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
