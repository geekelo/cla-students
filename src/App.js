import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import Landing from './components/landing';
import Footer from './components/footer';
import LoginPage from './components/auth/login';
import StudentArea from './components/portal/studentarea';
import About from './components/pages/About';
import Programs from './components/pages/Programs';
import Facaulty from './components/pages/Facaulty';
import FacaultyDetail from './components/pages/FacaultyDetail';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Landing />} />
        <Route path="/portal/*" element={<StudentArea />} />
        <Route path="/about" element={<About />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/facaulty" element={<Facaulty />} />
        <Route path="/facaulty/:id" element={<FacaultyDetail />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
