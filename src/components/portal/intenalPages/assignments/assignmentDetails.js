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
  faSave,
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons';
import '../../../../stylesheets/assignmentDetails.css';
import { createAxiosInstance } from '../../../../config';

const api = createAxiosInstance();

const AssignmentDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [userId, setUserId] = useState('');
  const [students, setStudents] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [formData, setFormData] = useState({
    score: '',
  });


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

      const submissionData = {
        cla_submission: {
          cla_assignment_id: location.state?.assignment?.id,
          cla_facilitator_id: userId,
          score: formData.score,
          cla_student_id: selectedStudent,
          cla_cohort_id: location.state?.assignment?.cla_cohort_id,
          cla_course_id: location.state?.assignment?.cla_course_id,
          download_link: 'https://www.google.com',
        },
        cla_assignment_id: location.state?.assignment?.id,
      };

      const response = await api.post('/api/v1/cla_submissions', submissionData);

      if (response) {
        toast.success('Assignment Scored successfully!');
        fetchStudents();
        setFormData({
          score: '',
        });
        setSelectedStudent('');
      }
    } catch (error) {
      console.error('Error submitting assignment:', error);
      let errorMessage = 'Failed to submit assignment. Please try again.';

      if (error.response) {
        console.error('Error response:', error.response.data);
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
      setIsLoading(false);
    }
  };

  const fetchStudents = async () => {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      toast.error('Session expired. Please login again.');
      navigate('/login');
      return;
    }
    try {
      setIsLoading(true);
      const response = await api.get('/api/v1/cla_submissions/students_without_scores', {
        params: {
          cla_assignment_id: location.state?.assignment?.id,
        },
        headers: { Authorization: `Bearer ${token}` }
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

  const handleEdit = () => {
    navigate('/portal/assignment/new', {
      state: {
        assignment: location.state?.assignment,
        courseId: location.state?.assignment?.cla_course_id,
        cohortId: location.state?.assignment?.cla_cohort_id,
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

      await api.delete(`/api/v1/cla_assignments/${location.state?.assignment?.id}`);

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

  useEffect(() => {
    setUserRole(sessionStorage.getItem('userRole'));
    setUserId(sessionStorage.getItem('userId'));
    fetchStudents();
  }, []);


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

          {userRole === 'student' && (
          <div className="submission-section">
            <div className="submission-header">
              <div className="submission-title-group">
                <h2>Your Score: {location.state?.assignment?.student_score ? `${location.state?.assignment?.student_score}%` : 'Not scored'}</h2>
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

export default AssignmentDetails;
