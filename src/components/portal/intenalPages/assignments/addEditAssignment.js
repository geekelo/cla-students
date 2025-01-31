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
    <div className="student-display-area">
      <button onClick={handleBack} className="back-button">
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </button>

      <div className="add-assignment-container">
        <div className="title-section">
          <h2>Add New Assignment <FontAwesomeIcon icon={faGraduationCap} /></h2>
        </div>

        <p className="form-subtitle">Fill assignment details :</p>

        <form onSubmit={handleSubmit} className="assignment-form">
          <div className="form-group">
            <label>
              <FontAwesomeIcon icon={faClipboardList} className="form-icon" />
              Assignment Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter assignment name"
              required
            />
          </div>

          <div className="form-group">
            <label>
              <FontAwesomeIcon icon={faFileLines} className="form-icon" />
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter assignment description"
              required
              rows="4"
            />
          </div>

          <div className="form-group">
            <label>
              <FontAwesomeIcon icon={faCalendarAlt} className="form-icon" />
              Submission Date
            </label>
            <input
              type="date"
              name="date_of_submission"
              value={formData.date_of_submission}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>
              <FontAwesomeIcon icon={faLayerGroup} className="form-icon" />
              Course
            </label>
            <select
              name="course_id"
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
            <label>
              <FontAwesomeIcon icon={faChalkboardTeacher} className="form-icon" />
              Facilitator Name
            </label>
            <input
              type="text"
              name="name_of_facilitator"
              value={formData.name_of_facilitator}
              onChange={handleChange}
              placeholder="Enter facilitator name"
              required
            />
          </div>

          <button type="submit" className="submit-button">
            <FontAwesomeIcon icon={faPlus} /> Add Assignment
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEditAssignment;
