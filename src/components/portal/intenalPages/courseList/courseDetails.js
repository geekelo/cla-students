import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import TopicsAccordion from '../topics/topicsAccordion';
import '../../../../stylesheets/courseDetails.css';
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
  faPlus,
  faAngleDown,
  faListCheck,
  faVideoCamera,
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../../sidebar';

function CourseDetails() {
  const { id } = useParams();
  const location = useLocation();
  const { course } = location.state || {};
  const [topics, setTopics] = useState((course?.topics || []));
  const navigate = useNavigate();

  if (!course) {
    return <div className="student-area-container">
      <Sidebar />
      <div className="student-display-area">
        <div className="error-message">Course not found!</div>
      </div>
    </div>;
  }

  const handleAssignmentClick = (assignments) => {
    navigate(`/portal/assignments/${course.id}`, { state: { assignments } });
  };

  const handleLiveClassesClick = (liveClasses) => {
    navigate('/portal/events/', { state: { liveClasses: [...liveClasses] } });
  }

  const handleAddLiveClassesClick = () => {
    navigate('/portal/events/new', {
   state: { 
      courseId: id,
      courseName: course.name,
      course: course
    } 
  });
  }

  const handleBack = () => {
    navigate('/portal/courses');
  };
  
  // Add topic
  const handleAddTopic = () => {
    navigate('/portal/topic/new', { 
      state: { 
        courseId: id,
        courseName: course.name,
        course: course
      } 
    });
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

  return (
    <div className="student-area-container">
      <Sidebar />
      <div className="student-display-area">
        <div className="course-details">
          {/* Header Section */}
          <div className="course-header">
            <div className="course-title-container">
              <button onClick={handleBack} className="back-button">
                <FontAwesomeIcon icon={faArrowLeft} /> Back
              </button>
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
                  onClick={() => handleAddLiveClassesClick(course?.liveClasses)}
                >
                  <FontAwesomeIcon icon={faVideo} className="icon" />
                  Add Live Class
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
                <span>Number of Assignments: <strong>{course?.assignments.length}</strong></span>
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

          <div className="course-extra-actions">
            <p><FontAwesomeIcon icon={faAngleDown} style={{ marginRight: '10px' }} /> For this course :</p>
            <button 
              type="button"
              className="action-button purple-btn"
              onClick={() => handleAssignmentClick(course?.assignments)}
            >
              <FontAwesomeIcon icon={faListCheck} style={{ marginRight: '10px' }} /> See Assignments
            </button>
            <button 
              type="button"
              className="action-button purple-btn"
              onClick={() => handleLiveClassesClick(course?.liveClasses)}
            >
              <FontAwesomeIcon icon={faVideoCamera} style={{ marginRight: '10px' }} /> View Live Classes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
