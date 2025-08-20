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
  const getTotalPoints = (course) => {
    return course.course_stats.user_submission_percentage.submission_points +
           course.course_stats.user_attendance_percentage.attendance_points +
           course.course_stats.user_contribution_stats.contributions_points +
           course.course_stats.user_cbt_stats.cbt_points;
  }

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
          <h2>Total Students</h2>
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
                <div className="student-header">
                  <div className="student-avatar">
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                  <div className="student-basic-info">
                    <h3 className="student-name">{student.student.name}</h3>
                    <div className="student-contact">
                      <p className="student-email">
                        <FontAwesomeIcon icon={faEnvelope} /> {student.student.email}
                      </p>
                      <p className="student-id">
                        <FontAwesomeIcon icon={faUser} /> ID: {student.student.user_id}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="student-courses">
                  <h4 className="courses-title">Enrolled Courses</h4>
                  {student.courses.map((course) => (
                    <div key={course.course_id} className="course-card">
                      <h5 className="course-name">{course.course_name}</h5>
                      <div className="stat-box assignment">
                      <span className="stat-label">Total</span>
                        <span className="stat-value">{getTotalPoints(course)}%</span>
                      </div>
                      <div className="course-stats-grid">
                        <div className="stat-box assignment">
                          <span className="stat-label">Assignment</span>
                          <span className="stat-value">{course.course_stats.user_submission_percentage.submission_points} / 25</span>
                        </div>
                        <div className="stat-box attendance">
                          <span className="stat-label">Attendance</span>
                          <span className="stat-value">{course.course_stats.user_attendance_percentage.attendance_points} / 30</span>
                        </div>
                        <div className="stat-box contributions">
                          <span className="stat-label">Contributions</span>
                          <span className="stat-value">{course.course_stats.user_contribution_stats.contributions_points} / 25</span>
                        </div>
                        <div className="stat-box cbt">
                          <span className="stat-label">CBT</span>
                          <span className="stat-value">{course.course_stats.user_cbt_stats.cbt_points} / 20</span>
                        </div>
                      </div>
                    </div>
                  ))}
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
