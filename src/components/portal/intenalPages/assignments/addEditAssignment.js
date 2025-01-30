import React, { useState } from 'react';
import '../../../../stylesheets/addEditAssignment.css';

const AddEditAssignment = () => {
  const courses = [
    { id: 1, title: 'Photography Essentials' },
    { id: 2, title: 'React Component Exercise' },
    { id: 3, title: 'Introduction to Python' },
  ];

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date_of_submission: '',
    course_id: '',
    course_title: '',
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
    // Add your form submission logic here
  };

  return (
    <div className="add-assignment-container">
      <h2>Add Assignment</h2>
      <form className="add-assignment-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Assignment Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter assignment name"
          required
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter assignment description"
          required
        ></textarea>

        <label htmlFor="date_of_submission">Submission Date</label>
        <input
          type="date"
          id="date_of_submission"
          name="date_of_submission"
          value={formData.date_of_submission}
          onChange={handleChange}
          required
        />

<label htmlFor="course_id">Course</label>
        <select
          id="course_id"
          name="course_id"
          value={formData.course_id}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select a course
          </option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.title}
            </option>
          ))}
        </select>

        <label htmlFor="course_title">Course Title</label>
        <input
          type="text"
          id="course_title"
          name="course_title"
          value={formData.course_title}
          onChange={handleChange}
          placeholder="Enter course title"
          required
        />
        <button type="submit">Add Assignment</button>
      </form>
    </div>
  );
};

export default AddEditAssignment;
