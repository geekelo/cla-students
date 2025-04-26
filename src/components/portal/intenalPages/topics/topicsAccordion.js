import { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faTrash, faFileAlt, faVideo, faLink, faPencilAlt } from '@fortawesome/free-solid-svg-icons'

function TopicsAccordion({ topic, onDelete, index, courseId, course }) {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const contentRef = useRef(null)

  const toggleAccordion = () => {
    setIsOpen(!isOpen)
  }

  const handleEdit = (e) => {
    e.stopPropagation()
    navigate('/portal/topic/new', {
      state: {
        topic: topic,
        courseId: courseId,
        course: course,
        isEditMode: true,
      },
    })
  }

  const handleDelete = (e) => {
    e.stopPropagation()
    onDelete(topic.id)
  }

  const processDescription = (text) => {
    if (!text) return <p>No description available</p>;
    
    const lines = text.split('\n');
    const elements = [];
  
    lines.forEach((line, lineIndex) => {
      const parts = line.trim().split(/\s+/);
  
      parts.forEach((part, index) => {
        if (/^https?:\/\//.test(part)) {
          let src = '';
          let title = '';
          let height = '';
  
          if (part.includes('youtube.com') || part.includes('youtu.be')) {
            const videoId = part.split('v=')[1]?.split('&')[0] || part.split('/').pop();
            src = `https://www.youtube.com/embed/${videoId}`;
            title = 'YouTube video';
            height = '315px';
          } else if (part.endsWith('.pdf')) {
            src = part;
            title = 'PDF Preview';
            height = '500px';
          } else if (part.includes('docs.google.com/presentation')) {
            src = part.replace('/edit', '/embed');
            title = 'Slides Preview';
            height = '480px';
          }
  
          if (src) {
            elements.push(
              <iframe
                key={`embed-${lineIndex}-${index}`}
                src={src}
                title={title}
                width="100%"
                height={height}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ marginTop: '10px', marginBottom: '10px', border: 'none' }}
              />
            );
          } else {
            elements.push(
              <a
                key={`link-${lineIndex}-${index}`}
                href={part}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'block', marginTop: '10px', wordBreak: 'break-all' }}
              >
                {part}
              </a>
            );
          }
        } else {
          elements.push(
            <span key={`text-${lineIndex}-${index}`}>{part + ' '}</span>
          );
        }
      });
  
      // Add a line break between lines
      elements.push(<br key={`br-${lineIndex}`} />);
    });
  
    return <>{elements}</>;
  };  
  
  return (
    <div className='topic-item'>
      <div className='topic-header' onClick={toggleAccordion}>
        <div className='topic-title-section'>
          <span className='topic-number'>{index + 1}</span>
          <h3 className='topic-title'>{topic.name}</h3>
        </div>
        <div className='topic-actions'>
          {sessionStorage.getItem('userRole') === 'facilitator' && (
            <button 
              type='button' 
              className='edit-topic' 
              onClick={handleEdit} 
              title='Edit Topic'
              aria-label="Edit topic"
            >
              <FontAwesomeIcon icon={faPencilAlt} />
            </button>
          )}
          {sessionStorage.getItem('userRole') === 'facilitator' && (
            <button
              type='button'
              className='delete-topic'
              onClick={handleDelete}
              title='Delete Topic'
              aria-label="Delete topic"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          )}
          <button 
            type='button' 
            className={`topic-toggle-btn ${isOpen ? 'open' : ''}`} 
            onClick={toggleAccordion}
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Collapse topic' : 'Expand topic'}
          >
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
        </div>
      </div>

      {isOpen && (
        <div className='topic-content' ref={contentRef}>
          <div className='topic-description'>{processDescription(topic.description)}</div>

          <div className='topic-resources'>
            <h4>Resources</h4>
            <div className='resource-list'>
              <div className='resource-item'>
                <FontAwesomeIcon icon={faFileAlt} />
                <span>Lecture Notes</span>
              </div>
              <div className='resource-item'>
                <FontAwesomeIcon icon={faVideo} />
                <span>Lecture Video</span>
              </div>
              <div className='resource-item'>
                <FontAwesomeIcon icon={faLink} />
                <span>Additional Reading</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

TopicsAccordion.propTypes = {
  topic: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func,
  index: PropTypes.number.isRequired,
  courseId: PropTypes.string.isRequired,
  course: PropTypes.object.isRequired,
}

export default TopicsAccordion

