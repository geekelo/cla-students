import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import TopicsAccordion from './topicsAccordion';
import '../../../../../stylesheets/courseDetails.css';

function CourseDetails() {
  const { id } = useParams(); // Extract the `id` parameter from the URL
  const location = useLocation(); // Access the location object
  const { course } = location.state || {}; // Extract the course data from state
  const [topics, setTopics] = useState(course.topics || []);
  const navigate = useNavigate();

  console.log(course.assignments);
  if (!course) {
    return <div>Course not found!</div>;
  }

  const handleAssignmentClick = (assignments) => {
    navigate(`/portal/assignments/${course.id}`, { state: { assignments: [...assignments] } });
  }

  const handleLiveClassesClick = (liveClasses) => {
    navigate(`/portal/events/${course.id}`, { state: { liveClasses: [...liveClasses] } });
  }

  // Add topic
  const handleAddTopic = () => {
    const newTopic = prompt('Enter a new topic title:');
    if (newTopic) {
      setTopics([...topics, { id: Date.now(), title: newTopic }]);
    }
  };

  // Delete topic
  const handleDeleteTopic = (id) => {
    if (window.confirm('Are you sure you want to delete this topic?')) {
      setTopics(topics.filter((topic) => topic.id !== id));
    }
  };

  return (
    <div className="course-details">
      {/* Header Section */}
      <div className="course-header">
        <h1 className="course-title">{course.title}</h1>
        <p className="course-meta">
          Facilitator: <strong>{course.facilitator}</strong>
        </p>
        <p>Course ID: <strong>{id}</strong></p>
        <p className="course-meta">
          Created on: <strong>{course.dateCreated}</strong>
        </p>
        <div className="course-stats">
          <p>Number of Topics: <strong>{topics.length}</strong></p>
          <p>Number of Assignments: <strong>{course.assignments.length}</strong></p>
          <p>Pending Live Classes: <strong>{course.pendingLiveClasses}</strong></p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="course-actions">
        <button className="action-button edit-course">Edit Course</button>
        <button className="action-button delete-course">Delete Course</button>
        <button className="action-button add-live-class">Add Live Class</button>
      </div>

      {/* Topics Section */}
      <div className="topics-section">
        <div className="topics-header">
          <h2>Topics</h2>
          <button className="action-button add-topic" onClick={handleAddTopic}>
            Add Topic
          </button>
        </div>
        <div className="topics-list">
          {topics.length > 0 ? (
            topics.map((topic) => (
              <TopicsAccordion
                key={topic.id}
                topic={topic}
                onDelete={() => handleDeleteTopic(topic.id)}
              />
            ))
          ) : (
            <p>No topics added yet.</p>
          )}
        </div>
      </div>

      <div className="course-extra-actions">
        <p>For this course only:</p>
        <button onClick={() => handleAssignmentClick(course?.assignments)}>Assignments</button>
        <button onClick={() => handleLiveClassesClick(course?.liveClasses)}>Live Classes</button>
      </div>
    </div>
  );
}

export default CourseDetails;
