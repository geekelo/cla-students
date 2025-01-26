import React from 'react';
import PropTypes from 'prop-types';
import AssignmentItem from './assignmentItem';

function AssignmentsSection({
  title,
  assignments,
  activeSection,
  handleSectionClick,
  sectionKey,
}) {
  return (
    <div className="assignments-section">
      <button
        type="button"
        className="assignments-title"
        onClick={() => handleSectionClick(sectionKey)}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ' ? handleSectionClick(sectionKey) : null)}
        tabIndex="0"
      >
        <h2>
          {title}
        </h2>
      </button>
      {activeSection === sectionKey && (
        <ul className="assignments-list">
          {assignments?.length > 0 ? (
            assignments.map((assignment) => (
              <AssignmentItem key={assignment.id} assignment={assignment} />
            ))
          ) : (
            <p>
              No
              {title.toLowerCase()}
              assignments.
            </p>
          )}
        </ul>
      )}
    </div>
  );
}

AssignmentsSection.propTypes = {
  title: PropTypes.string.isRequired,
  assignments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['pending', 'submitted', 'marked']).isRequired,
      marked: PropTypes.bool.isRequired,
      locked: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  activeSection: PropTypes.string,
  handleSectionClick: PropTypes.func.isRequired,
  sectionKey: PropTypes.string.isRequired,
};

AssignmentsSection.defaultProps = {
  activeSection: null,
};

export default AssignmentsSection;
