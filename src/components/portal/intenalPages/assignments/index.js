import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AssignmentsSection from './assignmentSection';

function Assignments({ assignments }) {
  const [activeSection, setActiveSection] = useState(null);

  const handleSectionClick = (section) => {
    setActiveSection(activeSection === section ? null : section); // Toggle section visibility
  };

  // Filter assignments for each section
  const pendingAssignments = assignments?.filter(
    (assignment) => assignment.status === 'pending' && !assignment.locked,
  );
  const submittedAssignments = assignments?.filter(
    (assignment) => assignment.status === 'submitted' && !assignment.marked && !assignment.locked,
  );
  const markedAssignments = assignments?.filter(
    (assignment) => assignment.status === 'marked' || assignment.locked,
  );

  return (
    <div className="assignments-container">
      <AssignmentsSection
        title="Pending Assignments"
        assignments={pendingAssignments}
        activeSection={activeSection}
        handleSectionClick={handleSectionClick}
        sectionKey="pending"
      />
      <AssignmentsSection
        title="Submitted Assignments"
        assignments={submittedAssignments}
        activeSection={activeSection}
        handleSectionClick={handleSectionClick}
        sectionKey="submitted"
      />
      <AssignmentsSection
        title="Marked Assignments"
        assignments={markedAssignments}
        activeSection={activeSection}
        handleSectionClick={handleSectionClick}
        sectionKey="marked"
      />
    </div>
  );
}

Assignments.propTypes = {
  assignments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['pending', 'submitted', 'marked']).isRequired,
      marked: PropTypes.bool.isRequired,
      locked: PropTypes.bool.isRequired,
    }),
  ).isRequired,
};

export default Assignments;
