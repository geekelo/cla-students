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
    <li>
      <button className="submission-item" type="button" tabIndex={0}>
        <span className="submission-text">
          <strong>{submission.student_name}</strong>
          <strong>{submission.student_email}</strong>
          <strong>{submission.id}</strong>
          <a href={`/portal/assignments/${submission.assignment_id}`}>Assignment</a>
        </span>
        <a>Download</a>
        <span className="submission-date">{submission.dateSubmitted}</span>
      
      
        {submission.status === 'unmarked' ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor={`mark-${submission.id}`}>Mark: </label>
          <input
            type="number"
            id={`mark-${submission.id}`}
            value={mark}
            onChange={handleMarkChange}
            min="0"
            max="100"
            required
          />
          <button type="submit" onClick={(e) => handleSubmit(e)}>Submit</button>
        </form>
      ) : (
        <span className="submission-mark">Score: {submission.score}%</span>
        )}
      </button>
    </li>
  );
}

SubmissionItem.propTypes = {
  submission: PropTypes.shape({
    id: PropTypes.number.isRequired,
    studentName: PropTypes.string.isRequired,
    dateSubmitted: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['marked', 'unmarked']).isRequired,
  }).isRequired,
};

export default SubmissionItem;
