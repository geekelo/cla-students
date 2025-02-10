import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGraduationCap, 
  faLayerGroup,
  faPlus,
  faFileLines,
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../../../stylesheets/addEditTopic.css';

const BASE_URL = 'https://cla-portal-api.onrender.com';

const AddEditTopic = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { courseId, topic, course } = location.state || {};
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    topic: {
      name: topic?.name || '',
      description: topic?.description || '',
      cla_course_id: courseId
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      topic: {
        ...prev.topic,
        [name]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = sessionStorage.getItem('authToken');
      if (!token) {
        toast.error('Session expired. Please login again.');
        navigate('/login');
        return;
      }

      console.log('Sending topic data:', formData);
      console.log('Course ID:', courseId);

      const response = await axios.post(`${BASE_URL}/api/v1/cla_topics`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Topic creation response:', response.data);
      toast.success('Topic created successfully!');
      navigate(`/portal/courses/${courseId}`, { state: { course } });
    } catch (error) {
      console.error('Error creating topic:', error);
      let errorMessage = 'Failed to create topic. Please try again.';

      if (error.response) {
        console.log('Error response:', error.response.data);
        if (typeof error.response.data.error === 'string') {
          errorMessage = error.response.data.error;
        } else if (error.response.data.errors) {
          errorMessage = Object.entries(error.response.data.errors)
            .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
            .join('\n');
        }
      }

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (courseId) {
      navigate(`/portal/courses/${courseId}`, { state: { course } });
    } else {
      navigate(-1);
    }
  };

  if (!courseId || !course) {
    return <div className="student-display-area">
      <div className="error-message">Course information not found!</div>
    </div>;
  }

  return (
    <div className="student-display-area">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="form-container">
        <div className="form-header">
          <button onClick={handleBack} className="back-button">
            <FontAwesomeIcon icon={faArrowLeft} /> Back
          </button>
          <FontAwesomeIcon icon={faGraduationCap} className="header-icon" />
          <h2 className="form-title">{topic ? 'Edit Topic' : 'Add New Topic'}</h2>
        </div>
        
        <div className="form-content">
          <form onSubmit={handleSubmit} className="topic-form">
            <div className="form-group">
              <label htmlFor="title" className="form-label">
                <FontAwesomeIcon icon={faLayerGroup} className="input-icon" />
                Topic Title
              </label>
              <input
                type="text"
                id="title"
                name="name"
                className="form-input"
                value={formData.topic.name}
                onChange={handleChange}
                placeholder="Enter topic title"
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="description" className="form-label">
                <FontAwesomeIcon icon={faFileLines} className="input-icon" />
                Topic Description
              </label>
              <textarea
                id="description"
                name="description"
                className="form-textarea"
                value={formData.topic.description}
                onChange={handleChange}
                placeholder="Enter topic description"
                required
                rows="4"
                disabled={loading}
              />
            </div>

            <button type="submit" className="form-button" disabled={loading}>
              <FontAwesomeIcon icon={faPlus} className="button-icon" />
              {loading ? 'Creating Topic...' : (topic ? 'Update Topic' : 'Add Topic')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEditTopic;
