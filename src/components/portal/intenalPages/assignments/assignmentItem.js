import React from 'react';
import PropTypes from 'prop-types';

function AssignmentItem({ assignment }) {
  const handleClick = () => {
    alert(`Clicked on Assignment: ${assignment.name}`);
  };

  return (
    <div
      className="assignment-item"
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => (e.key === 'Enter' ? handleClick() : null)}
    >
      <span className="assignment-name">{assignment.name}</span>
      {assignment.locked && <span className="lock-icon">🔒 Locked</span>}
    </div>
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
