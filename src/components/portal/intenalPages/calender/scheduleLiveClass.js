import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../../../stylesheets/scheduleLiveClass.css';
import courses from '../../../../data/courseList.json';

const ScheduleLiveClass = () => {
  const [formData, setFormData] = useState({
    course_id: '',
    course_name: '',
    name: '',
    date: '',
    time: '',
    name_of_facilitator: '',
    duration: '',
    zoom_link: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCourseSelect = (e) => {
    const selectedCourse = courses.find((course) => course.id === parseInt(e.target.value));
    if (selectedCourse) {
      setFormData({ ...formData, course_id: selectedCourse.id, course_name: selectedCourse.name });
    }
  };

  const onSchedule = (data) => {
    console.log('Schedule class:', data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSchedule(formData);
  };
  

  const allCourses = [
    ...(courses.done || []),
    ...(courses.active || []),
    ...(courses.pending || []),
  ];
  

  return (
    <div className="schedule-live-class-container">
      <h2 className="schedule-title">Schedule a Live Class</h2>
      <form className="schedule-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="course">Course</label>
          <select id="course" name="course" className="form-input" onChange={handleCourseSelect}>
            <option value="">Select a course</option>
            {allCourses?.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="name">Class Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-input"
            placeholder="Enter class name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            className="form-input"
            value={formData.date}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="time">Time</label>
          <input
            type="time"
            id="time"
            name="time"
            className="form-input"
            value={formData.time}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="name_of_facilitator">Facilitator</label>
          <input
            type="text"
            id="name_of_facilitator"
            name="name_of_facilitator"
            className="form-input"
            placeholder="Enter facilitator's name"
            value={formData.name_of_facilitator}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="duration">Duration</label>
          <input
            type="text"
            id="duration"
            name="duration"
            className="form-input"
            placeholder="Enter duration (e.g., 1.5 hours)"
            value={formData.duration}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="zoom_link">Zoom Link</label>
          <input
            type="url"
            id="zoom_link"
            name="zoom_link"
            className="form-input"
            placeholder="Enter Zoom link"
            value={formData.zoom_link}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" className="submit-button">Schedule Class</button>
      </form>
    </div>
  );
};

ScheduleLiveClass.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSchedule: PropTypes.func.isRequired,
};

export default ScheduleLiveClass;
