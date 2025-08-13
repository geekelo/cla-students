import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function CbtItem({ cbt }) {
  const navigate = useNavigate();
  const handleView = () => {
    navigate(`/portal/cbts/${cbt.id}`, { state: { cbt } });
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
      {cbt.due_date < new Date().toISOString() ? 
        <span className="lock-icon">🌑 Past Due</span> : 
        <span className="lock-icon">🌕 New</span>
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
