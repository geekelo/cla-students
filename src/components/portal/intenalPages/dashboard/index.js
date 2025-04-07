import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../../../../stylesheets/dashboard.css';
import { createAxiosInstance } from '../../../../config';

const api = createAxiosInstance();

function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalCoursesTaken: 0,
    totalScore: 0,
    totalAssignmentsGiven: 0,
    totalAssignmentsDone: 0,
    submissionPercentage: 0,
    totalClasses: 0,
    totalAbsences: 0,
    completionPercentage: 0,
    totalPossibleScore: 0,
    totalUserScore: 0,
    attendancePercentage: 0,
  });

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const token = sessionStorage.getItem('authToken');
        const cohortId = sessionStorage.getItem('cohortId');
        const userId = sessionStorage.getItem('userId');

        if (!token) {
          toast.error('Session expired. Please login again.');
          navigate('/login');
          return;
        }

        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        const courseResponse = await api.get('/api/v1/cla_dashboards/course_stats', {
          params: { 
            cla_cohort_id: cohortId,
            cla_user_id: userId,
          }
        });
        const scoreResponse = await api.get('/api/v1/cla_dashboards/score_stats', {
          params: { 
            cla_user_id: userId,
          }
        });
        const assignmentResponse = await api.get('/api/v1/cla_dashboards/assignment_stats', {
          params: { 
            cla_user_id: userId,
          }
        });

        const attendanceResponse = await api.get('/api/v1/cla_dashboards/attendance_stats', {
          params: { 
            cla_user_id: userId,
          }
        });
        
        // Update stats with the combined response data
        setStats({
          totalCourses: courseResponse.data.total_courses || 0,
          totalCoursesTaken: courseResponse.data.completed_courses || 0,
          completionPercentage: courseResponse.data.completion_percentage || 0,
          totalScore: scoreResponse.data.score_percentage || 0,
          totalPossibleScore: scoreResponse.data.total_possible_score || 0,
          totalUserScore: scoreResponse.data.total_user_score || 0,
          // Update with assignment response data
          totalAssignmentsGiven: assignmentResponse.data.total_assignments || 0,
          totalAssignmentsDone: assignmentResponse.data.total_submissions || 0,
          submissionPercentage: assignmentResponse.data.submission_percentage || 0,
          totalClasses: attendanceResponse.data.total_classes || 0,
          totalPresent: attendanceResponse.data.total_present || 0,
          attendancePercentage: attendanceResponse.data.attendance_percentage || 0,
        });

      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        toast.error('Failed to fetch dashboard statistics');
      }
    };

    fetchDashboardStats();
  }, [navigate]);

  const notices = [
    { id: 1, title: 'Important Reminders for Our Classes:', content: 'The meeting room opens at 7:30 AM for all students!\nClasses commence at 8:00 AM sharp!'},
    { id: 2, title: 'Important Reminders on Attendance', content: 'Your attendance is crucial, as it accounts for the highest percentage of your cumulative scores. Be there and be on time!\n'},
    { id: 3, title: 'Important Reminders on Assignments', content: 'Always submit your assignments before the deadline to stay ahead!\n'},
    { id: 3, title: 'Let\'s make this semester a success!', content: ''},
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Your Progress Board</h1>
        <p className="dashboard-subtitle">Quick overview of your progress and updates</p>
      </div>

      <div className="dashboard-stats">
        <div className="dashboard-stat">
          <h2 className="stat-title">Courses</h2>
          <p className="stat-value">
            {stats.totalCoursesTaken} / {stats.totalCourses}
          </p>
          <p className="stat-percentage">
            {stats.completionPercentage}% Completed
          </p>
        </div>
        <div className="dashboard-stat">
          <h2 className="stat-title">Scores</h2>
          <p className="stat-value">
            {stats.totalUserScore} / {stats.totalPossibleScore}
          </p>
          <p className="stat-percentage">
            {stats.totalScore}% Overall
          </p>
        </div>
        <div className="dashboard-stat">
          <h2 className="stat-title">Assignments</h2>
          <p className="stat-value">
            {stats.totalAssignmentsDone} / {stats.totalAssignmentsGiven}
          </p>
          <p className="stat-percentage">
           {stats.submissionPercentage}% Submissions
          </p>
        </div>
        <div className="dashboard-stat">
          <h2 className="stat-title">Attendance</h2>
          <p className="stat-value">
            {stats.totalPresent} / {stats.totalClasses}
          </p>
          <p className="stat-percentage">
            {stats.attendancePercentage} % Attendance
          </p>
        </div>
      </div>

      <div className="dashboard-notices">
        <h2 className="notices-title">
          <FontAwesomeIcon icon={faBell} className="notice-icon" /> Announcements
        </h2>
        <ul className="notices-list">
          {notices.map((notice) => (
            <li key={notice.id} className="notice-item">
              <h3 className="notice-title">{notice.title}</h3>
              <p className="notice-content">{notice.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
