import { useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faTrash, faFileAlt, faVideo, faLink, faPencilAlt } from '@fortawesome/free-solid-svg-icons'

function TopicsAccordion({ topic, onDelete, index, courseId, course }) {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

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

  return (
    <div className='topic-item'>
      <div className='topic-header' onClick={toggleAccordion}>
        <div className='topic-title-section'>
          <span className='topic-number'>{index + 1}</span>
          <h3 className='topic-title'>{topic.name}</h3>
        </div>
        <div className='topic-actions'>
        {sessionStorage.getItem('userRole') === 'facilitator' && (
          <button type='button' className='edit-topic' onClick={handleEdit} title='Edit Topic'>
            <FontAwesomeIcon icon={faPencilAlt} />
          </button>
        )}
        {sessionStorage.getItem('userRole') === 'facilitator' && (
          <button
            type='button'
            className='delete-topic'
            onClick={(e) => {
              e.stopPropagation()
              onDelete(topic.id)
            }}
            title='Delete Topic'
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        )}
          <button type='button' className={`topic-toggle-btn ${isOpen ? 'open' : ''}`} onClick={toggleAccordion}>
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
        </div>
      </div>

      {isOpen && (
        <div className='topic-content'>
          <div className='topic-description'>{topic.description}</div>

          <div className='topic-resources'>
            <h4>Resources</h4>
            <div className='resource-list'>
              <div className='resource-item'>
                <FontAwesomeIcon icon={faFileAlt} />
                <span>Lecture Notes</span>
              </div>
              <div className='resource-item'>
                <FontAwesomeIcon icon={faVideo} />
                <span>Video Tutorial</span>
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
  onEdit: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  courseId: PropTypes.string.isRequired,
  course: PropTypes.object.isRequired,
}

export default TopicsAccordion

