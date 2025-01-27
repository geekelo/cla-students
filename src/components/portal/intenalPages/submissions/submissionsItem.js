import React from 'react';
import PropTypes from 'prop-types';

function SubmissionItem({ submission }) {
  const handleClick = () => {
    alert(`Submission from ${submission.studentName} clicked!`);
  };

  return (
    <li>
      <button className="submission-item" type="button" onClick={handleClick} tabIndex={0}>
        <span className="submission-text">
          Submission from
          {' '}
          <strong>{submission.studentName}</strong>
        </span>
        <span className="submission-date">{submission.dateSubmitted}</span>
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
