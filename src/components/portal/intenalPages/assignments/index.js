import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AssignmentItem from './assignmentItem';
import '../../../../stylesheets/assignments.css';

function Assignments({ assignments }) {
  const [activeTab, setActiveTab] = useState('pending'); // Default tab is 'pending'

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Filter assignments for each tab
  const filteredAssignments = assignments?.filter((assignment) => {
    if (activeTab === 'pending') return assignment.status === 'pending' && !assignment.locked;
    if (activeTab === 'submitted') return assignment.status === 'submitted' && !assignment.locked;
    if (activeTab === 'marked') return assignment.status === 'marked' || assignment.locked;
    return false;
  });

  return (
    <section className="assignments-section">
      <div className="assignments-tabs">
        <button
          type="button"
          className={`tab-button ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => handleTabClick('pending')}
        >
          Pending
        </button>
        <button
          type="button"
          className={`tab-button ${activeTab === 'submitted' ? 'active' : ''}`}
          onClick={() => handleTabClick('submitted')}
        >
          Submitted
        </button>
        <button
          type="button"
          className={`tab-button ${activeTab === 'marked' ? 'active' : ''}`}
          onClick={() => handleTabClick('marked')}
        >
          Marked
        </button>
      </div>
      <div className="assignments-list">
        {filteredAssignments?.length > 0 ? (
          filteredAssignments.map((assignment) => (
            <AssignmentItem key={assignment.id} assignment={assignment} />
          ))
        ) : (
          <p className="no-assignments">
            No
            {' '}
            {activeTab}
            {' '}
            assignments available.
          </p>
        )}
      </div>
    </section>
  );
}

Assignments.propTypes = {
  assignments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['pending', 'submitted', 'marked']).isRequired,
      locked: PropTypes.bool.isRequired,
    }),
  ).isRequired,
};

export default Assignments;
