import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function AssignmentItem({ assignment }) {
  const navigate = useNavigate();
  const handleView = () => {
    navigate(`/portal/assignments/${assignment.id}`, { state: { assignment } });
  };

  const handlePastDue = () => {
    const due = new Date(assignment.due_date);
    due.setHours(23, 59, 59, 999);
    const isPastDue = due < new Date();
    return isPastDue;
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
      {handlePastDue() ? (<span className="lock-icon"> 🌑 Past Due</span>) : assignment.due_date < new Date().toISOString() ? (<span className="lock-icon"> 🚨 Due today </span>) : (<span className="lock-icon"> 🌕 New</span>)}
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
