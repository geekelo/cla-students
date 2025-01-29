import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import TopicsAccordion from './topicsAccordion';
import '../../../../../stylesheets/courseDetails.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEdit, 
  faTrash, 
  faUser, 
  faIdCard, 
  faCalendarAlt,
  faBookOpen,
  faClipboardList,
  faVideo,
  faPlus
} from '@fortawesome/free-solid-svg-icons';

function CourseDetails() {
  const { id } = useParams();
  const location = useLocation();
  const { course } = location.state || {};
  const [topics, setTopics] = useState(course?.topics || []);

  // Add console log to debug
  console.log('Course Data:', course);

  if (!course) {
    return <div>Course not found!</div>;
  }

  const handleAddTopic = () => {
    const newTopic = prompt('Enter a new topic title:');
    if (newTopic) {
      setTopics([...topics, { id: Date.now(), title: newTopic }]);
    }
  };

  const handleDeleteTopic = (id) => {
    if (window.confirm('Are you sure you want to delete this topic?')) {
      setTopics(topics.filter((topic) => topic.id !== id));
    }
  };

  const handleEditCourse = () => {
    // Add edit course logic here
    console.log('Edit course clicked');
  };

  const handleDeleteCourse = () => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      // Add delete course logic here
      console.log('Delete course clicked');
    }
  };

  const handleAddLive = () => {
    // Add live class logic here
    console.log('Add live class clicked');
  };

  return (
    <div className="course-details">
      {/* Header Section */}
      <div className="course-header">
        <div className="course-title-container">
          <h1 className="course-title">{course.name}</h1>
          <div className="course-actions">
            <button 
              type="button" 
              className="action-icon" 
              onClick={handleEditCourse}
              title="Edit Course"
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button 
              type="button" 
              className="action-icon delete-icon" 
              onClick={handleDeleteCourse}
              title="Delete Course"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
            <button
              type="button"
              className="add-live-btn"
              onClick={handleAddLive}
            >
              <FontAwesomeIcon icon={faPlus} className="icon" /> Schedule a live class
            </button>
          </div>
        </div>
        
        <div className="course-info-grid">
          <div className="info-item">
            <FontAwesomeIcon icon={faUser} />
            <span>Facilitator: <strong>{course.facilitator}</strong></span>
          </div>
          <div className="info-item">
            <FontAwesomeIcon icon={faIdCard} />
            <span>Course ID: <strong>{id}</strong></span>
          </div>
          <div className="info-item">
            <FontAwesomeIcon icon={faCalendarAlt} />
            <span>Created on: <strong>{course.dateCreated}</strong></span>
          </div>
          <div className="info-item">
            <FontAwesomeIcon icon={faBookOpen} />
            <span>Number of Topics: <strong>{topics.length}</strong></span>
          </div>
          <div className="info-item">
            <FontAwesomeIcon icon={faClipboardList} />
            <span>Number of Assignments: <strong>{course.assignments}</strong></span>
          </div>
          <div className="info-item">
            <FontAwesomeIcon icon={faVideo} />
            <span>Pending Live Classes: <strong>{course.pendingLiveClasses}</strong></span>
          </div>
        </div>

        {/* Course Description Section */}
        <div className="course-description">
          <h3>Description :</h3>
          <p>
            {course.description 
              ? course.description 
              : 'No description available for this course.'}
          </p>
        </div>
      </div>

      {/* Topics Section */}
      <div className="topics-section">
        <div className="topics-header">
          <h2>Topics</h2>
          <button className="add-topic" onClick={handleAddTopic}>
            <FontAwesomeIcon icon={faPlus} className="icon" /> Add Topic
          </button>
        </div>
        <div className="topics-list">
          {topics.length > 0 ? (
            topics.map((topic, index) => (
              <TopicsAccordion
                key={topic.id}
                topic={topic}
                onDelete={() => handleDeleteTopic(topic.id)}
                index={index}
              />
            ))
          ) : (
            <div className="no-topics">
              No topics have been added to this course yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
