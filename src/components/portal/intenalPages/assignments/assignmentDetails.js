import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEdit, 
  faTrash, 
  faUser, 
  faCalendarAlt,
  faBookOpen,
  faClipboardList,
  faPlus,
  faUpload
} from '@fortawesome/free-solid-svg-icons';
import '../../../../stylesheets/assignmentDetails.css';

const AssignmentDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const { assignment } = location.state || {};
  const [formData, setFormData] = useState({
    name: '',
    studentId: '',
    email: '',
    file: null,
  });

  console.log(id);
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

  return (
    <div className="assignment-details">
      <div className="assignment-header">
        <div className="assignment-title-container">
          <h1 className="assignment-title">{assignment.title}</h1>
          <div className="assignment-actions">
            <button 
              type="button" 
              className="action-icon" 
              onClick={handleEdit}
              title="Edit Submission"
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button 
              type="button" 
              className="action-icon delete-icon" 
              onClick={handleDelete}
              title="Delete Submission"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
        
        <div className="assignment-info-grid">
          <div className="info-item">
            <FontAwesomeIcon icon={faClipboardList} />
            <span>Status: <strong>{assignment.status}</strong></span>
          </div>
          <div className="info-item">
            <FontAwesomeIcon icon={faCalendarAlt} />
            <span>Date of Submission: <strong>{new Date(assignment.date_of_submission).toLocaleDateString()}</strong></span>
          </div>
          <div className="info-item">
            <FontAwesomeIcon icon={faBookOpen} />
            <span>Course: <strong>{assignment.course_title} (ID: {assignment.course_id})</strong></span>
          </div>
          <div className="info-item">
            <FontAwesomeIcon icon={faUser} />
            <span>Facilitator: <strong>{assignment.name_of_facilitator} (ID: {assignment.facilitator_id})</strong></span>
          </div>
        </div>

        <div className="assignment-description">
          <h3>Description :</h3>
          <p>{assignment.description}</p>
        </div>
      </div>

      <div className="submission-section">
        <div className="submission-header">
          <h2>Submit Your Work</h2>
          <button className="add-submission" onClick={() => document.getElementById('file').click()}>
            <FontAwesomeIcon icon={faPlus} className="icon" /> Add Submission
          </button>
        </div>

        <form className="submission-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

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

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
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
  );
};

export default AssignmentDetails;
