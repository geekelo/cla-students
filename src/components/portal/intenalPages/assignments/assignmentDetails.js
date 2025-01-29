import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
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
    // Add your submission logic here
  };

  return (
    <div className="assignment-details">
      <div className="assignment-card">
        <h1 className="assignment-title">{assignment.name}</h1>
        <div className="assignment-info">
          <p><strong>Status:</strong> <span className={`status ${assignment.status === 'marked' ? 'marked' : 'unmarked'}`}>{assignment.status}</span></p>
          <p><strong>Description:</strong> {assignment.description}</p>
          <p><strong>Date of Submission:</strong> {new Date(assignment.date_of_submission).toLocaleDateString()}</p>
          <p><strong>Course:</strong> {assignment.course_title} (ID: {assignment.course_id})</p>
          <p><strong>Facilitator:</strong> {assignment.name_of_facilitator} (ID: {assignment.facilitator_id})</p>
        </div>

        <form className="assignment-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
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
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="file">Upload PDF</label>
            <input
              type="file"
              id="file"
              name="file"
              accept=".pdf"
              onChange={handleFileChange}
              required
            />
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
