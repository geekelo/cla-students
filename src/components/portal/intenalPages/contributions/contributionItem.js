import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function ContributionItem({ contribution }) {
  const navigate = useNavigate();
  const handleView = () => {
    navigate(`/portal/contributions/${contribution.id}`, { state: { contribution } });
  };

  return (
    <div
      className="assignment-item"
      role="button"
      tabIndex={0}
      onClick={() => handleView(contribution)}
      onKeyDown={(e) => (e.key === 'Enter' ?  handleView(contribution) : null)}
    >
      <span className="assignment-name">{contribution.name}</span>
      {contribution.due_date < new Date().toISOString() ? 
        <span className="lock-icon">🔒 Past Due</span> : 
        <span className="lock-icon">⭐ New</span>
      }
    </div>
  );
}

ContributionItem.propTypes = {
  contribution: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['pending', 'submitted', 'marked']).isRequired,
    locked: PropTypes.bool.isRequired,
  }).isRequired,
};

export default ContributionItem;
