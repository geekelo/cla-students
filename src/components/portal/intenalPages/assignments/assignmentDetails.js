import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEdit, 
  faTrash, 
  faUser, 
  faCalendarAlt,
  faBookOpen,
  faUpload,
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons';
import '../../../../stylesheets/assignmentDetails.css';

const AssignmentDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { assignment } = location.state || {};
  const [formData, setFormData] = useState({
    student_name: '',
    student_id: '',
    email: '',
    file: null,
  });

  // Mock data for the assignment when not provided through location state
  const assignmentData = assignment || {
    name: 'React Basics Quiz',
    date_of_submission: '2024-03-20',
    course_title: 'React Development',
    course_id: 'REACT101',
    name_of_facilitator: 'John Doe',
    facilitator_id: 'FAC123',
    description: 'This quiz will test your understanding of React fundamentals including components, state, props, and hooks. Please read all questions carefully before answering.'
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleEdit = () => {
    console.log('Edit clicked');
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this submission?')) {
      console.log('Delete clicked');
    }
  };

  const handleBack = () => {
    navigate('/portal/assignments');
  };

  return (
    <div className="assignment-details-container">
      <div className="assignment-details-content">
        <button onClick={handleBack} className="back-button">
          <FontAwesomeIcon icon={faArrowLeft} /> Back
        </button>
        <div className="assignment-details">
          <div className="assignment-header">
            <div className="title-with-actions">
              <h1 className="assignment-title">{assignmentData.name}</h1>
              <div className="action-icons">
                <button className="action-icon" onClick={handleEdit}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button className="action-icon delete-icon" onClick={handleDelete}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
            <p className="assignment-description">{assignmentData.description}</p>
          </div>

          <div className="assignment-info-grid">
            <div className="info-item">
              <FontAwesomeIcon icon={faCalendarAlt} />
              <span>Date of Submission: <strong>{new Date(assignmentData.date_of_submission).toLocaleDateString()}</strong></span>
            </div>
            <div className="info-item">
              <FontAwesomeIcon icon={faBookOpen} />
              <span>Course: <strong>{assignmentData.course_title} (ID: {assignmentData.course_id})</strong></span>
            </div>
            <div className="info-item">
              <FontAwesomeIcon icon={faUser} />
              <span>Facilitator: <strong>{assignmentData.name_of_facilitator} (ID: {assignmentData.facilitator_id})</strong></span>
            </div>
          </div>

          <div className="submission-section">
            <div className="submission-header">
              <div className="submission-title-group">
                <h2>Submit Your Work</h2>
              </div>
            </div>

            <form className="submission-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="studentId">Student ID</label>
                <input
                  type="text"
                  id="studentId"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group file-upload">
                <input
                  type="file"
                  id="file"
                  name="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  required
                  style={{ display: 'none' }}
                />
                <button 
                  type="button" 
                  className="upload-btn"
                  onClick={() => document.getElementById('file').click()}
                >
                  <FontAwesomeIcon icon={faUpload} className="icon" />
                  {formData.file ? formData.file.name : 'Upload PDF'}
                </button>
              </div>

              <button type="submit" className="submit-button">
                Submit Assignment
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentDetails;
