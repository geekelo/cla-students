import React from 'react';
import PropTypes from 'prop-types';

function AssignmentItem({ assignment }) {
  const handleSubmit = () => {
    alert(`Assignment ${assignment.id} has been submitted.`);
  };

  const handleUpdateSubmission = () => {
    alert(`You can update the submission for Assignment ${assignment.id}.`);
  };

  return (
    <li className={`assignments-item ${assignment.locked ? 'locked' : ''}`}>
      <span className="assignment-name">{assignment.name}</span>
      {!assignment.locked && assignment.status === 'pending' && (
        <button type="button" className="submit-button" onClick={handleSubmit}>
          Submit
        </button>
      )}
      {assignment.status === 'submitted' && !assignment.locked && (
        <button type="button" className="update-button" onClick={handleUpdateSubmission}>
          Update Submission
        </button>
      )}
      {assignment.locked && <span className="lock-icon">🔒</span>}
    </li>
  );
}

AssignmentItem.propTypes = {
  assignment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['pending', 'submitted', 'marked']).isRequired,
    locked: PropTypes.bool.isRequired,
  }).isRequired,
};

export default AssignmentItem;
