import React, { useState } from 'react';
import '../../../../stylesheets/addEditTopic.css';

const AddEditTopic = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    course_id: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Topic Submitted:', formData);
    // Add form submission logic here
  };

  return (
    <div className="add-topic-container">
      <h2>Add Topic</h2>
      <form className="add-topic-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Topic Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter topic name"
          required
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter topic description"
          required
        />
        <button type="submit">Add Topic</button>
      </form>
    </div>
  );
};

export default AddEditTopic;
