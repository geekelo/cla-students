import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGraduationCap, 
  faBook, 
  faPlus,
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons';
import '../../../../stylesheets/addEditCourse.css';
import Sidebar from '../../sidebar';

const AddEditCourseForm = () => {
  const navigate = useNavigate();
  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCourse = {
      name: courseName,
      description: courseDescription,
    };
    console.log('New Course Added:', newCourse);
    setCourseName('');
    setCourseDescription('');
    navigate('/portal/courses');
  };

  const handleBack = () => {
    navigate('/portal/courses');
  };

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
            <h2 className="form-title">Add New Course</h2>
          </div>
          
          <div className="form-content">         
            <p className="course-details-text">
              Fill course details :
            </p>s

            <form onSubmit={handleSubmit} className="course-form">
              <div className="form-group">
                <label htmlFor="courseName" className="form-label">
                  <FontAwesomeIcon icon={faBook} className="input-icon" />
                  Course Name
                </label>
                <input
                  type="text"
                  id="courseName"
                  className="form-input"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  placeholder="Enter course name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="courseDescription" className="form-label">
                  <FontAwesomeIcon icon={faBook} className="input-icon" />
                  Course Description
                </label>
                <textarea
                  id="courseDescription"
                  className="form-textarea"
                  value={courseDescription}
                  onChange={(e) => setCourseDescription(e.target.value)}
                  placeholder="Enter course description"
                  required
                  rows="4"
                />
              </div>

              <button type="submit" className="form-button">
                <FontAwesomeIcon icon={faPlus} className="button-icon" />
                Add Course
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditCourseForm;
