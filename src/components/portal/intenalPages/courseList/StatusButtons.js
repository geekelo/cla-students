import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faSpinner, faClock } from '@fortawesome/free-solid-svg-icons';

function StatusButtons({ activeStatus, setActiveStatus }) {
  return (
    <div className="course-status-nav">
      <button
        type="button"
        onClick={() => setActiveStatus('done')}
        className={`status-btn ${activeStatus === 'done' ? 'active' : ''}`}
      >
        <FontAwesomeIcon icon={faCheck} className="me-2" /> Done
      </button>
      <button
        type="button"
        onClick={() => setActiveStatus('active')}
        className={`status-btn ${activeStatus === 'active' ? 'active' : ''}`}
      >
        <FontAwesomeIcon icon={faSpinner} className="me-2" spin /> Active
      </button>
      <button
        type="button"
        onClick={() => setActiveStatus('pending')}
        className={`status-btn ${activeStatus === 'pending' ? 'active' : ''}`}
      >
        <FontAwesomeIcon icon={faClock} className="me-2" /> Pending
      </button>
    </div>
  );
}

export default StatusButtons; 