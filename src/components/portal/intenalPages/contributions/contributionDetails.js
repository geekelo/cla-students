import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  faEdit, 
  faTrash, 
  faCalendarAlt,
  faBookOpen,
  faArrowLeft,
  faSave
} from '@fortawesome/free-solid-svg-icons';
import '../../../../stylesheets/assignmentDetails.css';
import { createAxiosInstance } from '../../../../config';

const api = createAxiosInstance();

const ContributionDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [userRole, setUserRole] = useState('');
  const [userId, setUserId] = useState('');
  const [formData, setFormData] = useState({
    cla_user_id: '',
    score: '',
  });

  const fetchStudents = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/api/v1/cla_contributions_scores/students_without_scores', {
        params: {
          cla_contribution_id: location.state?.contribution?.id,
        },
      });
      if (response.data) {
        setStudents(response.data);
      } else {
        toast.info('No students found without scores.');
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching students:', error);
      toast.error('Failed to fetch students. Please try again.');
    } finally {
      setIsLoading(false);
    }
  
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = sessionStorage.getItem('authToken');

      if (!token || !userId) {
        toast.error('Session expired. Please login again.');
        navigate('/login');
        return;
      }

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      const contributionScoreData = {
        cla_contributions_score: {
          score: formData.score,
          cla_contribution_id: location.state?.contribution?.id,
          cla_user_id: formData.cla_user_id,
          cla_cohort_id: location.state?.contribution?.cla_cohort_id,
          cla_course_id: location.state?.contribution?.cla_course_id,
        },
        cla_contribution_id: location.state?.contribution?.id,
      };

      const response = await api.post('/api/v1/cla_contributions_scores', contributionScoreData);

      if (response) {
        toast.success('Contribution scored successfully!');
        setFormData({
          cla_user_id: '',
          score: '',
        })
        setSelectedStudent('');
        fetchStudents();
      }
    } catch (error) {
      console.error('Error scoring contribution:', error);
      let errorMessage = 'Failed to score contribution. Please try again.';

      if (error.response) {
        console.error('Error response:', error.response.data);
        if (typeof error.response.data.error === 'string') {
          errorMessage = error.response.data.error;
        } else if (error.response.data.errors) {
          // Handle both array and object error formats
          const errors = error.response.data.errors;
          // if errors is an array
          if (Array.isArray(errors)) {
            errorMessage = errors.join(', ');
          } else {
            errorMessage = Object.entries(errors)
              .map(([field, messages]) => {
                let messageText = '';
                if (Array.isArray(messages)) {
                  messageText = messages.join(', ');
                } else if (typeof messages === 'string') {
                  messageText = messages;
                } else {
                  messageText = String(messages);
                }
                return `${field}: ${messageText}`;
              }).join('\n');
          }
        }
      }

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    navigate('/portal/contribution/new', {
      state: {
        contribution: location.state?.contribution,
        courseId: location.state?.contribution?.cla_course_id,
        isEditMode: true
      }
    });
  };
  
  useEffect(() => {
    setUserRole(sessionStorage.getItem('userRole'));
    setUserId(sessionStorage.getItem('userId'));
    fetchStudents();
  }, [userRole === 'facilitator']);

  const handleDelete = () => {
    toast.info(
      <div>
        <p>Are you sure you want to delete this contributions?</p>
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
          Yes, Delete contributions
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

      toast.info('Deleting contribution...', {
        autoClose: false,
        toastId: 'Deleting Contribution'
      });

      await api.delete(`/api/v1/cla_contributions/${location.state?.contribution?.id}`);

      toast.dismiss('Deleting Contribution');
      toast.success('Contribution deleted successfully!');
      navigate('/portal/contributions');
    } catch (error) {
      toast.dismiss('Deleting Contribution');
      console.error('Error deleting contribution:', error);
      toast.error('Failed to delete contribution. Please try again.');
    }
  };

  const handleBack = () => {
    navigate('/portal/contributions');
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
              <h1 className="assignment-title">{location.state?.contribution?.name || 'Contribution Details'}</h1>
              {sessionStorage.getItem('userRole') === 'facilitator' && (
                <div className="action-icons">
                  <button className="action-icon" onClick={handleEdit}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button className="action-icon delete-icon" onClick={handleDelete}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              )}
            </div>
            <p className="assignment-description">{location.state?.contribution?.description || 'No description available.'}</p>
          </div>

          <div className="assignment-info-grid">
            <div className="info-item">
              <FontAwesomeIcon icon={faCalendarAlt} />
              <span>Due Date: <strong>{location.state?.contribution?.due_date ? new Date(location.state.contribution.due_date).toLocaleDateString() : 'Not set'}</strong></span>
            </div>
            <div className="info-item">
              <FontAwesomeIcon icon={faBookOpen} />
              <span>Course: <strong>{location.state?.contribution?.course_name || 'Not specified'}</strong></span>
            </div>
          </div>

          {userRole === 'student' && (
          <div className="submission-section">
            <div className="submission-header">
              <div className="submission-title-group">
                <h2>Score Your Contribution</h2>
                <p>{location.state?.contribution?.student_score || 'Not scored'}</p>
              </div>
            </div>
          </div>
          )}

          {/* Step 2: Score Contribution */}
          {userRole === 'facilitator' && (
          <div className="form-part active">
            {/* Student Statistics */}
            {students && (
              <div className="student-stats-section">
                <h3>Student Statistics</h3>
                <div className="stats-grid">
                  <div className="stat-card">
                    <span className="stat-label">Total Students in Cohort</span>
                    <span className="stat-value">{students.total_students_in_cohort || 0}</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-label">Students with Scores</span>
                    <span className="stat-value">{students.students_with_scores || 0}</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-label">Students without Scores</span>
                    <span className="stat-value">{students.students_without_scores || 0}</span>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="student">Select Student:</label>
                <select
                  id="student"
                  className="form-input"
                  value={selectedStudent}
                  onChange={(e) => {
                    setSelectedStudent(e.target.value);
                    setFormData({ ...formData, cla_user_id: e.target.value });
                  }}
                  required
                >
                  <option value="">Select a student</option>
                  {students?.students_without_scores_list?.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.name}
                    </option>
                  ))}
                </select>
                <p>{isLoading ? 'Loading Students...' : ''}</p>
              </div>
      
              <div className="form-group">
                <label>Assign Score:</label>
                <div className="attendance-status-radio">
                  <div className="radio-option">
                    <input
                      type="text"
                      id="score"
                      name="score"
                      value={formData.score}
                      onChange={(e) => setFormData({ ...formData, score: e.target.value })}
                    />
                  </div>
                </div>
                <small className="warning-text">⚠️ Warning! Student score cannot be changed after submission!</small>
              </div>
      
              <button 
                type="submit" 
                className="submit-button"
                disabled={isLoading || !selectedStudent || !formData.score}
                onClick={handleSubmit}
              >
                {isLoading ? 'Submitting...' : (
                  <>
                    Submit <FontAwesomeIcon icon={faSave} />
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        </div>
      </div>
    </div>
  );
};

export default ContributionDetails;
