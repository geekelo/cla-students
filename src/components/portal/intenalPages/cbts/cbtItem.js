import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function CbtItem({ cbt }) {
  const navigate = useNavigate();
  const handleView = () => {
    navigate(`/portal/cbts/${cbt.id}`, { state: { cbt } });
  };

  const handlePastDue = () => {
    const due = new Date(cbt.due_date);
    due.setHours(23, 59, 59, 999);
    const isPastDue = due < new Date();
    return isPastDue;
  };

  return (
    <div
      className="assignment-item"
      role="button"
      tabIndex={0}
      onClick={() => handleView(cbt)}
      onKeyDown={(e) => (e.key === 'Enter' ?  handleView(cbt) : null)}
    >
      <span className="assignment-name">{cbt.name}</span>
      {handlePastDue() ? 
        <span className="lock-icon">🌑 Past Due</span> : 
        cbt.due_date < new Date().toISOString() ? (<span className="lock-icon"> 🚨 Due today </span>) : (<span className="lock-icon"> 🌕 New</span>)
      }
    </div>
  );
}

CbtItem.propTypes = {
  cbt: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['pending', 'submitted', 'marked']).isRequired,
    locked: PropTypes.bool.isRequired,
  }).isRequired,
};

export default CbtItem;
