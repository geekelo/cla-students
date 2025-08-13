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
    studentDashboardStats: {},
  });

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const token = sessionStorage.getItem('authToken');
        // const cohortId = sessionStorage.getItem('cohortId');
        const userId = sessionStorage.getItem('userId');

        if (!token) {
          toast.error('Session expired. Please login again.');
          navigate('/login');
          return;
        }

        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        const studentDashboardData = await api.get('/api/v1/cla_dashboards/student_dashboard_stats', {
          params: { 
            cla_user_id: userId,
          }
        });
        
        // Update stats with the combined response data
        setStats({
          studentDashboardStats: studentDashboardData.data || {},
        });

      } catch (error) {
        console.error('❌ Error fetching dashboard stats:', error);
        console.error('🔍 Error details:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status
        });
        toast.error('Failed to fetch dashboard statistics');
      }
    };

    fetchDashboardStats();
  }, [navigate]);

  const getTotalPoints = (stat) => {
    
    // Check if we have nested course_stats
    const statsData = stat.course_stats || stat;
    
    const assignment = Number(statsData?.user_submission_percentage?.submission_points) || 0;
    const attendance = Number(statsData?.user_attendance_percentage?.attendance_points) || 0;
    const contributions = Number(statsData?.user_contribution_stats?.contributions_points) || 0;
    const cbt = Number(statsData?.user_cbt_stats?.cbt_points) || 0;
        
    const total = assignment + attendance + contributions + cbt;
    
    return total;
  }

  const notices = [
    { id: 1, title: 'Important Reminders for Our Classes:', content: 'The meeting room opens at 7:30 AM for all students!\nClasses commence at 8:00 AM sharp!'},
    { id: 2, title: 'Important Reminders on Attendance', content: 'Your attendance is crucial, as it accounts for the highest percentage of your cumulative scores. Be there and be on time!\n'},
    { id: 3, title: 'Important Reminders on Assignments', content: 'Always submit your assignments before the deadline to stay ahead!\n'},
    { id: 4, title: 'Let\'s make this semester a success!', content: ''},
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <p className="dashboard-subtitle">Quick overview of your performance</p>
        <div>
          <h2 className="stat-title">CLA Level</h2>
          <p className="stat-value">
            {stats.studentDashboardStats?.course_stats?.length || 0} / 3
          </p>
        </div>
      </div>
  
      <div className="dashboard-stats">
        {stats.studentDashboardStats.course_stats && stats.studentDashboardStats.course_stats.length > 0 ? (
          // If course_stats array exists, map over it
          stats.studentDashboardStats.course_stats.map((stat, index) => (
            <div key={stat.course_id || index} className="dashboard-stat">
              <h2 className="stat-title">{stat.course_name}</h2>
              <div className="stat-details">
                <p className="stat-percentage">
                  Assignment: {stat.course_stats?.user_submission_percentage?.submission_points || 0}%
                </p>
                <p className="stat-percentage">
                  Attendance: {stat.course_stats?.user_attendance_percentage?.attendance_points || 0}%
                </p>
                <p className="stat-percentage">
                  Contributions: {stat.course_stats?.user_contribution_stats?.contributions_points || 0}%
                </p>
                <p className="stat-percentage">
                  CBT: {stat.course_stats?.user_cbt_stats?.cbt_points || 0}%
                </p>
              </div>
              <div className="stat-details">
                <p className="stat-value">
                  Total: {getTotalPoints(stat)}%
                </p>
              </div>
            </div>
          ))
        ) : (
          // Fallback to single stats display
          <>
            <div className="dashboard-stat">
              <h2 className="stat-title">Courses</h2>
              <p className="stat-value">
                {stats.studentDashboardStats.courses_completed || 0} / 3
              </p>
              <p className="stat-percentage">
                {stats.completionPercentage || 0}% Completed
              </p>
            </div>
            <div className="dashboard-stat">
              <h2 className="stat-title">Assignments</h2>
              <p className="stat-value">
                {stats.studentDashboardStats.user_submission_percentage?.submission_points || 0}%
              </p>
            </div>
            <div className="dashboard-stat">
              <h2 className="stat-title">Attendance</h2>
              <p className="stat-value">
                {stats.studentDashboardStats.user_attendance_percentage?.attendance_points || 0}%
              </p>
            </div>
            <div className="dashboard-stat">
              <h2 className="stat-title">Contributions</h2>
              <p className="stat-value">
                {stats.studentDashboardStats.user_contribution_stats?.contributions_points || 0}%
              </p>
            </div>
            <div className="dashboard-stat">
              <h2 className="stat-title">CBT</h2>
              <p className="stat-value">
                {stats.studentDashboardStats.user_cbt_stats?.cbt_points || 0}%
              </p>
            </div>
            <div className="dashboard-stat">
              <h2 className="stat-title">Total</h2>
              <p className="stat-value">
                {getTotalPoints(stats.studentDashboardStats)}%
              </p>
            </div>
          </>
        )}
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
