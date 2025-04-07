import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlus, 
  faUserCheck, 
  faFilter,
  faUser,
  faEnvelope,
  faGraduationCap 
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import '../../../../stylesheets/instructorDesk.css';
import { createAxiosInstance } from '../../../../config';

const api = createAxiosInstance();

function InstructorDesk() {
  const navigate = useNavigate();
  const [cohorts, setCohorts] = useState([]);
  const [selectedCohort, setSelectedCohort] = useState('');
  const [deskStats, setDeskStats] = useState({});
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCohorts = async () => {
      try {
        const token = sessionStorage.getItem('authToken');
        if (!token) {
          toast.error('Session expired. Please login again.');
          navigate('/login');
          return;
        }

        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        const response = await api.get('/api/v1/cla_cohorts');

        if (response.data && response.data.cohorts) {
          setCohorts(response.data.cohorts);
        }
      } catch (error) {
        console.error('Error fetching cohorts:', error);
        toast.error('Failed to fetch cohorts');
      }
    };

    fetchCohorts();
  }, [navigate]);

  const onCreateCourse = () => {
    navigate('/portal/course/new', { state: { course: {} } });
  };

  const onCreateAssignment = () => {
    navigate('/portal/assignment/new', { state: { assignment: {} } });
  }
  
  const onCreateLiveClass = () => {
    navigate('/portal/event/new', { state: { liveClasses: {} } });
  }

  const onAddAttendance = () => {
    navigate('/portal/attendance/new');
  }

  const handleCohortChange = (e) => {
    setSelectedCohort(e.target.value);
  };

  const fetchDeskStats = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem('authToken');
      if (!token) {
        toast.error('Session expired. Please login again.');
        navigate('/login');
        return;
      }

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Fetch desk stats
      const statsResponse = await api.get('/api/v1/cla_dashboards/desk_stats', {
        params: { 
          cla_cohort_id: selectedCohort
        }
      });

      setDeskStats(statsResponse.data);

      // Fetch student list
      const studentsResponse = await api.get('/api/v1/cla_dashboards/student_list', {
        params: { 
          cla_cohort_id: selectedCohort
        }
      });

      setStudents(studentsResponse.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="instructor-desk">
      <h1 className="desk-title">My Desk</h1>

      {/* Quick Actions */}
      <div className="desk-actions">
        <button
          type="button"
          className="action-button"
          onClick={onCreateCourse}
        >
          <FontAwesomeIcon icon={faPlus} className="button-icon" />
          Create Course
        </button>
        <button
          type="button"
          className="action-button"
          onClick={onCreateAssignment}
        >
          <FontAwesomeIcon icon={faPlus} className="button-icon" />
          Create Assignment
        </button>
        <button
          type="button"
          className="action-button"
          onClick={onCreateLiveClass}
        >
          <FontAwesomeIcon icon={faPlus} className="button-icon" />
          Schedule Live Class
        </button>
        <button
          type="button"
          className="action-button"
          onClick={onAddAttendance}
        >
          <FontAwesomeIcon icon={faUserCheck} className="button-icon" />
          Add Attendance
        </button>
      </div>

      {/* Cohort Filter */}
      <div className="cohort-filter">
        <div className="filter-label">
          <FontAwesomeIcon icon={faFilter} className="filter-icon" />
          Filter by Cohort:
        </div>
        <select
          className="cohort-select"
          value={selectedCohort}
          onChange={handleCohortChange}
        >
          <option value="">Select a cohort</option>
          {cohorts.map((cohort) => (
            <option key={cohort.id} value={cohort.id}>
              {cohort.name}
            </option>
          ))}
        </select>
        <button
          type="button"
          className="filter-button"
          onClick={fetchDeskStats}
          disabled={!selectedCohort}
        >
          Apply Filter
        </button>
      </div>

      {/* Statistics Section */}
      <div className="desk-stats">
        <div className="stat-card">
          <h2>Total Courses</h2>
          <p>{deskStats.total_courses}</p>
        </div>
        <div className="stat-card">
          <h2>Total Assignments</h2>
          <p>{deskStats.total_assignments}</p>
        </div>
        <div className="stat-card">
          <h2>Total Live Classes</h2>
          <p>{deskStats.total_live_classes}</p>
        </div>
        <div className="stat-card">
          <h2>Pending Submissions</h2>
          <p>{deskStats.total_submissions_without_score}</p>
        </div>
        <div className="stat-card">
          <h2>Total Users</h2>
          <p>{deskStats.total_users}</p>
        </div>
      </div>

      {/* Students List Section */}
      <div className="students-section">
        <h2 className="section-title">
          <FontAwesomeIcon icon={faGraduationCap} /> Students List
        </h2>
        {loading ? (
          <div className="loading-spinner">Loading students...</div>
        ) : students.length > 0 ? (
          <div className="students-list">
            {students.map((student) => (
              <div 
                key={student.student.user_id} 
                className="student-card"
              >
                <div className="student-avatar">
                  <FontAwesomeIcon icon={faUser} />
                </div>
                <div className="student-info">
                  <h3 className="student-name">{student.student.name}</h3>
                  <div className="student-details">
                    <p className="student-email">
                      <FontAwesomeIcon icon={faEnvelope} /> {student.student.email}
                    </p>
                    <p className="student-id">
                      <FontAwesomeIcon icon={faUser} /> ID: {student.student.user_id}
                    </p>
                  </div>
                  
                  <div className="student-stats">
                    <div className="stat-item">
                      <span className="stat-label">Courses:</span>
                      <span className="stat-value">
                        {student.course_completion_rate.completed_courses}/{student.course_completion_rate.total_courses}
                        <span className="stat-percentage">
                          ({student.course_completion_rate.completion_percentage}%)
                        </span>
                      </span>
                    </div>
                    
                    <div className="stat-item">
                      <span className="stat-label">Assignments:</span>
                      <span className="stat-value">
                        {student.user_submission_percentage.total_submissions}/{student.user_submission_percentage.total_assignments}
                        <span className="stat-percentage">
                          ({student.user_submission_percentage.submission_percentage}%)
                        </span>
                      </span>
                    </div>
                    
                    <div className="stat-item">
                      <span className="stat-label">Score:</span>
                      <span className="stat-value">
                        {student.user_score_percentage.total_user_score}/{student.user_score_percentage.total_possible_score}
                        <span className="stat-percentage">
                          ({student.user_score_percentage.score_percentage}%)
                        </span>
                      </span>
                    </div>
                    
                    <div className="stat-item">
                      <span className="stat-label">Attendance:</span>
                      <span className="stat-value">
                        {student.user_attendance_percentage.total_present}/{student.user_attendance_percentage.total_classes}
                        <span className="stat-percentage">
                          ({student.user_attendance_percentage.attendance_percentage}%)
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : selectedCohort ? (
          <div className="no-students">
            No students found in this cohort.
          </div>
        ) : (
          <div className="no-cohort-selected">
            Select a cohort to view students.
          </div>
        )}
      </div>
    </div>
  );
}

export default InstructorDesk;
