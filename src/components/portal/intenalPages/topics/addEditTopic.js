import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGraduationCap, 
  faLayerGroup,
  faPlus,
  faFileLines,
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons';
import '../../../../stylesheets/addEditTopic.css';
import Sidebar from '../../sidebar';

const AddEditTopic = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { courseId, topic, course } = location.state || {};
  
  const [formData, setFormData] = useState({
    title: topic?.title || '',
    description: topic?.description || '',
    courseId: courseId || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // After successful submission, navigate back to course details
    navigate(`/portal/courses/${courseId}`, { state: { course } });
  };

  const handleBack = () => {
    if (courseId) {
      navigate(`/portal/courses/${courseId}`, { state: { course } });
    } else {
      navigate(-1); // Fallback to previous page if no courseId
    }
  };

  if (!courseId || !course) {
    return <div className="student-area-container">
      <Sidebar />
      <div className="student-display-area">
        <div className="error-message">Course information not found!</div>
      </div>
    </div>;
  }

  return (
    <div className="student-area-container">
      <Sidebar />
      <div className="student-display-area">
        <div className="form-container">
          <div className="form-header">
            <button onClick={handleBack} className="back-button">
              <FontAwesomeIcon icon={faArrowLeft} /> Back
            </button>
            <FontAwesomeIcon icon={faGraduationCap} className="header-icon" />
            <h2 className="form-title">{topic ? 'Edit Topic' : 'Add New Topic'}</h2>
          </div>
          
          <div className="form-content">
            <form onSubmit={handleSubmit} className="topic-form">
              <div className="form-group">
                <label htmlFor="title" className="form-label">
                  <FontAwesomeIcon icon={faLayerGroup} className="input-icon" />
                  Topic Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="form-input"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter topic title"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description" className="form-label">
                  <FontAwesomeIcon icon={faFileLines} className="input-icon" />
                  Topic Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="form-textarea"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter topic description"
                  required
                  rows="4"
                />
              </div>

              <button type="submit" className="form-button">
                <FontAwesomeIcon icon={faPlus} className="button-icon" />
                {topic ? 'Update Topic' : 'Add Topic'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditTopic;
