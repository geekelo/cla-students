import React from 'react';
import PropTypes from 'prop-types';
import SubmissionItem from './submissionsItem';

function SubmissionsSection({ submissions, title }) {
  return (
    <div className="submissions-section-content">
      <h2 className="section-title">{title}</h2>
      <ul className="submissions-list">
        {submissions?.length > 0 ? (
          submissions.map((submission) => (
            <SubmissionItem key={submission.id} submission={submission} />
          ))
        ) : (
          <p className="no-submissions">
            No
            {' '}
            {title.toLowerCase()}
            {' '}
            .
          </p>
        )}
      </ul>
    </div>
  );
}

SubmissionsSection.propTypes = {
  submissions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      studentName: PropTypes.string.isRequired,
      dateSubmitted: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['marked', 'unmarked']).isRequired,
    }),
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default SubmissionsSection;
