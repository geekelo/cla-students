import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function AnnouncementsItem({ announcement, handleEditAnnouncement, handleDeleteAnnouncement }) {

  return (
    <div key={announcement.id} className="assignment-item announcement-item">
      <div className="announcement-content">
        <h3 className="announcement-title">{announcement.title}</h3>
        <p className="announcement-message" style={{ whiteSpace: 'pre-wrap' }}>{announcement.content}</p>
        <div className="announcement-meta">
          <span className="announcement-date">
            {new Date(announcement.created_at).toLocaleDateString()}
          </span>
          {announcement.cla_user_id && (
            <>
              <span className="announcement-type">User Specific</span>
              <span className="announcement-user">{announcement.student_name}</span>
            </>
          )}
        </div>
        <div className="announcement-actions">
          <button className="announcement-edit-btn" onClick={() => handleEditAnnouncement(announcement)}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button className="announcement-delete-btn" onClick={() => handleDeleteAnnouncement(announcement.id)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
    </div>
  );
}

AnnouncementsItem.propTypes = {
  announcement: PropTypes.shape({
    id: PropTypes.number.isRequired,
    cla_user_id: PropTypes.string.isRequired,
    cla_cohort_id: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
};

export default AnnouncementsItem;
