import React from 'react';
import { Routes, Route } from 'react-router-dom';
import '../../stylesheets/studentArea.css';
import Profile from './intenalPages/profile/index';
import Courses from './intenalPages/courseList/index';
import Assignments from './intenalPages/assignments/index';
import Dashboard from './intenalPages/dashboard/index';
import Announcements from './intenalPages/announcements/index';
import AddEditAnnouncement from './intenalPages/announcements/addEditAnnouncement';
import InstructorDesk from './intenalPages/instructorDesk/index';
import Sidebar from './sidebar';
import Calendar from './intenalPages/calender/index';
import ScheduleLiveClass from './intenalPages/calender/scheduleLiveClass';
import AddEditAssignment from './intenalPages/assignments/addEditAssignment';
import CourseDetails from './intenalPages/courseList/courseDetails';
import AssignmentDetails from './intenalPages/assignments/assignmentDetails';
import AddEditCourseForm from './intenalPages/courseList/addEditCourse';
import AddEditTopic from './intenalPages/topics/addEditTopic';
import AddAttendance from './intenalPages/attendance/addAttendance';
import Contributions from './intenalPages/contributions';
import AddEditContribution from './intenalPages/contributions/addEditContribution';
import ContributionDetails from './intenalPages/contributions/contributionDetails';
import AddEditCbt from './intenalPages/cbts/addEditCbt';
import CbtDetails from './intenalPages/cbts/cbtDetails';
import Cbts from './intenalPages/cbts';

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
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/announcement/new" element={<AddEditAnnouncement />} />
          <Route path="/instructorDesk" element={<InstructorDesk />} />
          <Route path="/events/" element={<Calendar /> } />
          <Route path="/assignment/new" element={<AddEditAssignment /> } />
          <Route path="/event/new" element={<ScheduleLiveClass /> } />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/assignments/:id" element={<AssignmentDetails />} />
          <Route path="/course/new" element={<AddEditCourseForm />} />
          <Route path="/topic/new" element={<AddEditTopic /> } />
          <Route path="/attendance/new" element={<AddAttendance />} />
          <Route path="/contributions" element={<Contributions />} />
          <Route path="/contribution/new" element={<AddEditContribution />} />
          <Route path="/contributions/:id" element={<ContributionDetails />} />
          <Route path="/cbts" element={<Cbts />} />
          <Route path="/cbt/new" element={<AddEditCbt />} />
          <Route path="/cbts/:id" element={<CbtDetails />} />
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
