import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useLocation } from 'react-router-dom';
import AssignmentItem from './assignmentItem';
import '../../../../stylesheets/assignments.css';
import courses from '../../../../data/courseList.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCheckCircle, faClipboardCheck } from '@fortawesome/free-solid-svg-icons';

function Assignments() {
  const { id } = useParams();
  const location = useLocation();
  const { assignments } = location.state || [];
  const [activeTab, setActiveTab] = useState('all');
  const [currAssignments, setAssignments] = useState([]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    if (assignments && assignments.length > 0) {
      setAssignments(assignments);
    } else {
      const allAssignments = getAllAssignments(courses);
      setAssignments(allAssignments);
    }
  }, [assignments]);

  function getAllAssignments(coursesData) {
    const categories = Object.keys(coursesData);
    let assignmentsList = [];
    categories.forEach(category => {
      coursesData[category].forEach(course => {
        if (course.assignments) {
          assignmentsList = assignmentsList.concat(course.assignments);
        }
      });
    });

    return assignmentsList;
  }

  console.log(id);

  // Filter assignments for each tab
  const filteredAssignments = currAssignments?.filter((assignment) => {
    if (activeTab === 'pending') return assignment.status === 'pending' && !assignment.locked;
    if (activeTab === 'submitted') return assignment.status === 'submitted' && !assignment.locked;
    if (activeTab === 'marked') return assignment.status === 'marked' || assignment.locked;
    if (activeTab === 'all') return assignment.status === 'marked' || assignment.status === 'submitted' || assignment.status === 'pending' || assignment.locked;
    return false;
  });

  return (
    <section className="assignments-section">
      <div className="assignments-tabs">
        <button
          type="button"
          className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => handleTabClick('all')}
        >
          <FontAwesomeIcon icon={faCheckCircle} className="me-2" /> ALL
        </button>
        <button
          type="button"
          className={`tab-button ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => handleTabClick('pending')}
        >
          <FontAwesomeIcon icon={faClock} className="me-2" /> Pending
        </button>
        <button
          type="button"
          className={`tab-button ${activeTab === 'submitted' ? 'active' : ''}`}
          onClick={() => handleTabClick('submitted')}
        >
          <FontAwesomeIcon icon={faClipboardCheck} className="me-2" /> Submitted
        </button>
        <button
          type="button"
          className={`tab-button ${activeTab === 'marked' ? 'active' : ''}`}
          onClick={() => handleTabClick('marked')}
        >
          <FontAwesomeIcon icon={faCheckCircle} className="me-2" /> Marked
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
