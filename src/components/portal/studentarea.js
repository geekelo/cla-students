import React from 'react';
import { Routes, Route } from 'react-router-dom';
import '../../stylesheets/studentArea.css';
import Profile from './intenalPages/profile/index';
import Courses from './intenalPages/courseList/index';
import Assignments from './intenalPages/assignments/index';
import Dashboard from './intenalPages/dashboard/index';
import Calendar from './intenalPages/calender/index';
import Submissions from './intenalPages/submissions/index';
import InstructorDesk from './intenalPages/instructorDesk/index';
import Sidebar from './sidebar';

function StudentArea() {
  return (
    <div className="student-area-container">
      <Sidebar />
      <div className="student-display-area">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/assignments" element={<Assignments />} />
          <Route path="/submissions" element={<Submissions />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/instructorDesk" element={<InstructorDesk />} />
          <Route path="*" element={
            <div className="student-display-area">
              <h2 className="student-display-title">Welcome to Your Student Area</h2>
              <p className="student-display-message">Select an option from the menu to get started.</p>
            </div>
          } />
        </Routes>
      </div>
    </div>
  );
}

export default StudentArea;
