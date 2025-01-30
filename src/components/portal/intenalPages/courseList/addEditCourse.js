import React, { useState } from 'react';
import '../../../../stylesheets/addEditCourse.css';

const AddEditCourseForm = () => {
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
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Add New Course</h2>
      <form onSubmit={handleSubmit} className="course-form">
        <div className="form-group">
          <label htmlFor="courseName" className="form-label">Course Name</label>
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
          <label htmlFor="courseDescription" className="form-label">Course Description</label>
          <textarea
            id="courseDescription"
            className="form-textarea"
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
            placeholder="Enter course description"
            required
          />
        </div>
        <button type="submit" className="form-button">Add Course</button>
      </form>
    </div>
  );
};

export default AddEditCourseForm;
