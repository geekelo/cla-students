import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  faEdit, 
  faTrash, 
  faCalendarAlt,
  faBookOpen,
  faQuestionCircle,
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons';
import '../../../../stylesheets/assignmentDetails.css';

const BASE_URL = 'https://cla-portal-api.onrender.com';

const AssignmentDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    download_link: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = sessionStorage.getItem('authToken');
      const userId = sessionStorage.getItem('userId');

      if (!token || !userId) {
        toast.error('Session expired. Please login again.');
        navigate('/login');
        return;
      }

      const submissionData = {
        cla_submission: {
          download_link: formData.download_link,
          cla_assignment_id: location.state?.assignment?.id,
          cla_facilitator_id: location.state?.assignment?.cla_user_id,
          cla_student_id: userId
        }
      };

      const response = await axios.post(`${BASE_URL}/api/v1/cla_submissions`, submissionData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Submission response:', response.data);
      toast.success('Assignment submitted successfully!');
      navigate('/portal/assignments');
    } catch (error) {
      console.error('Error submitting assignment:', error);
      let errorMessage = 'Failed to submit assignment. Please try again.';

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

  const handleEdit = () => {
    navigate('/portal/assignment/new', {
      state: {
        assignment: location.state?.assignment,
        courseId: location.state?.assignment?.cla_course_id,
        isEditMode: true
      }
    });
  };

  const handleDelete = () => {
    toast.info(
      <div>
        <p>Are you sure you want to delete this assignment?</p>
        <p>This action cannot be undone.</p>
        <button 
          onClick={confirmDelete} 
          style={{
            background: '#6b4ca6',
            color: 'white',
            padding: '5px 10px',
            border: 'none',
            borderRadius: '4px',
            marginRight: '10px',
            cursor: 'pointer'
          }}
        >
          Yes, Delete Assignment
        </button>
      </div>,
      {
        autoClose: false,
        closeOnClick: false,
        closeButton: true
      }
    );
  };

  const confirmDelete = async () => {
    try {
      const token = sessionStorage.getItem('authToken');
      if (!token) {
        toast.error('Session expired. Please login again.');
        navigate('/login');
        return;
      }

      toast.info('Deleting assignment...', {
        autoClose: false,
        toastId: 'deletingAssignment'
      });

      await axios.delete(`${BASE_URL}/api/v1/cla_assignments/${location.state?.assignment?.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      toast.dismiss('deletingAssignment');
      toast.success('Assignment deleted successfully!');
      navigate('/portal/assignments');
    } catch (error) {
      toast.dismiss('deletingAssignment');
      console.error('Error deleting assignment:', error);
      toast.error('Failed to delete assignment. Please try again.');
    }
  };

  const handleBack = () => {
    navigate('/portal/assignments');
  };

  const openGuidelinesVideo = () => {
    // Replace this URL with your actual guidelines video URL
    window.open('https://your-guidelines-video-url.com', '_blank');
  };

  return (
    <div className="assignment-details-container">
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
      <div className="assignment-details-content">
        <button onClick={handleBack} className="back-button">
          <FontAwesomeIcon icon={faArrowLeft} /> Back
        </button>
        
        <div className="assignment-details">
          <div className="assignment-header">
            <div className="title-with-actions">
              <h1 className="assignment-title">{location.state?.assignment?.name || 'Assignment Details'}</h1>
              <div className="action-icons">
                <button className="action-icon" onClick={handleEdit}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button className="action-icon delete-icon" onClick={handleDelete}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
            <p className="assignment-description">{location.state?.assignment?.description || 'No description available.'}</p>
          </div>

          <div className="assignment-info-grid">
            <div className="info-item">
              <FontAwesomeIcon icon={faCalendarAlt} />
              <span>Due Date: <strong>{location.state?.assignment?.due_date ? new Date(location.state.assignment.due_date).toLocaleDateString() : 'Not set'}</strong></span>
            </div>
            <div className="info-item">
              <FontAwesomeIcon icon={faBookOpen} />
              <span>Course: <strong>{location.state?.assignment?.course_name || 'Not specified'}</strong></span>
            </div>
          </div>

          <div className="submission-section">
            <div className="submission-header">
              <div className="submission-title-group">
                <h2>Submit Your Work</h2>
              </div>
            </div>

            <form className="submission-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <div className="input-with-icon">
                  <input
                    type="url"
                    id="download_link"
                    name="download_link"
                    value={formData.download_link}
                    onChange={handleChange}
                    placeholder="Paste your Google Docs link here"
                    required
                    className="google-docs-input"
                  />
                  <button 
                    type="button" 
                    className="help-icon"
                    onClick={openGuidelinesVideo}
                    title="View submission guidelines"
                  >
                    Help <FontAwesomeIcon icon={faQuestionCircle} />
                  </button>
                </div>
              </div>

              <button type="submit" className="submit-button" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Assignment'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentDetails;
