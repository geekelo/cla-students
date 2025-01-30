import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function AssignmentItem({ assignment }) {
  const navigate = useNavigate();
  const handleView = () => {
    navigate(`/portal/assignments/${assignment.id}`, { state: { assignment } });
  };

  return (
    <div
      className="assignment-item"
      role="button"
      tabIndex={0}
      onClick={() => handleView(assignment)}
      onKeyDown={(e) => (e.key === 'Enter' ?  handleView(assignment) : null)}
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
