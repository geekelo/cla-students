import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGraduationCap, 
  faClipboardList,
  faPlus,
  faCalendarAlt,
  faFileLines,
  faChalkboardTeacher,
  faArrowLeft,
  faLayerGroup
} from '@fortawesome/free-solid-svg-icons';
import '../../../../stylesheets/addEditAssignment.css';

const AddEditAssignment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { courseId } = location.state || {};

  const courses = [
    { id: 1, title: 'Photography Essentials' },
    { id: 2, title: 'React Component Exercise' },
    { id: 3, title: 'Introduction to Python' },
  ];

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date_of_submission: '',
    course_id: courseId || '',
    facilitator_id: '',
    name_of_facilitator: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    // After successful submission, navigate back to course details
    if (courseId) {
      navigate(`/portal/courses/${courseId}`);
    } else {
      navigate('/portal/assignments');
    }
  };

  const handleBack = () => {
    if (courseId) {
      navigate(`/portal/courses/${courseId}`);
    } else {
      navigate('/portal/assignments');
    }
  };

  return (
    <div className="student-area-container">
      <div className="student-display-area">
        <button onClick={handleBack} className="back-button">
          <FontAwesomeIcon icon={faArrowLeft} /> Back
        </button>
        <div className="form-container">
          <div className="title-section">
            <h2 className="form-title">Add New Assignment</h2>
            <FontAwesomeIcon icon={faGraduationCap} className="header-icon" />
          </div>
          <div className="form-content">
            <form onSubmit={handleSubmit} className="assignment-form">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  <FontAwesomeIcon icon={faClipboardList} className="input-icon" />
                  Assignment Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-input"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter assignment name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description" className="form-label">
                  <FontAwesomeIcon icon={faFileLines} className="input-icon" />
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="form-textarea"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter assignment description"
                  required
                  rows="4"
                />
              </div>

              <div className="form-group">
                <label htmlFor="date_of_submission" className="form-label">
                  <FontAwesomeIcon icon={faCalendarAlt} className="input-icon" />
                  Submission Date
                </label>
                <input
                  type="date"
                  id="date_of_submission"
                  name="date_of_submission"
                  className="form-input"
                  value={formData.date_of_submission}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="course_id" className="form-label">
                  <FontAwesomeIcon icon={faLayerGroup} className="input-icon" />
                  Course
                </label>
                <select
                  id="course_id"
                  name="course_id"
                  className="form-select"
                  value={formData.course_id}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select a course</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="name_of_facilitator" className="form-label">
                  <FontAwesomeIcon icon={faChalkboardTeacher} className="input-icon" />
                  Facilitator Name
                </label>
                <input
                  type="text"
                  id="name_of_facilitator"
                  name="name_of_facilitator"
                  className="form-input"
                  value={formData.name_of_facilitator}
                  onChange={handleChange}
                  placeholder="Enter facilitator name"
                  required
                />
              </div>

              <button type="submit" className="form-button">
                <FontAwesomeIcon icon={faPlus} className="button-icon" />
                Add Assignment
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditAssignment;
