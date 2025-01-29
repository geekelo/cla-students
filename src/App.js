import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import Landing from './components/landing';
import Footer from './components/footer';
import LoginPage from './components/auth/login';
import StudentArea from './components/portal/studentarea';
import CourseDetails from './components/portal/intenalPages/detailsPages/coursePage/courseDetails';
import Assignments from './components/portal/intenalPages/assignments';
import AssignmentDetails from './components/portal/intenalPages/assignments/assignmentDetails';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Landing />} />
        <Route path="/portal" element={<StudentArea />} />
        <Route path="portal/courses/:id" element={<CourseDetails />} />
        <Route path="portal/assignments/:id" element={<Assignments />} />
        <Route path="portal/assignment/:id" element={<AssignmentDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
