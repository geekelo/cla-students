import React, { useState } from 'react';
import PropTypes from 'prop-types';

function TopicsAccordion({ topic, onDelete }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="accordion">
      <div className="accordion-header">
        <button
          className={`accordion-title ${isOpen ? 'open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {topic.title}
        </button>
        <button className="action-button delete-topic" onClick={onDelete}>
          Delete Topic
        </button>
      </div>
      {isOpen && (
        <div className="accordion-content">
          <p>Details for {topic.title}...</p>
          {/* Add topic-specific content here */}
        </div>
      )}
    </div>
  );
}

TopicsAccordion.propTypes = {
  topic: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TopicsAccordion;
