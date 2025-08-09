import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCheck, faArrowRight, faSave, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../../../stylesheets/addAttendance.css';
import { createAxiosInstance } from '../../../../config';

const api = createAxiosInstance();

function AddAttendance() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [liveClasses, setLiveClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedCohortId, setSelectedCohortId] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [present, setPresent] = useState('present');
  const [isLoading, setIsLoading] = useState(false);

  // Fetch live classes when component mounts
  useEffect(() => {
    const fetchLiveClasses = async () => {
      try {
        const token = sessionStorage.getItem('authToken');
        if (!token) {
          toast.error('Session expired. Please login again.');
          navigate('/login');
          return;
        }

        const response = await api.get('/api/v1/cla_live_classes/today_classes', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.data && response.data.live_classes) {
          setLiveClasses(response.data.live_classes);
        }
      } catch (error) {
        console.error('Error fetching live classes:', error);
        toast.error('Failed to fetch live classes. Please try again.');
      }
    };

    fetchLiveClasses();
  }, [navigate]);

  const handleClassSelect = (e) => {
    const classId = e.target.value;
    setSelectedClass(classId);
    
    // Find the selected class and set its cohort ID
    const selectedLiveClass = liveClasses.find(lc => lc.id === classId);
    if (selectedLiveClass) {
      setSelectedCohortId(selectedLiveClass.cla_cohort_id);
      setSelectedCourseId(selectedLiveClass.cla_course_id);
    }
  };

  const handleProceed = async (e) => {
    e.preventDefault();
    if (!selectedClass) {
      toast.error('Please select a class first');
      return;
    }

    setIsLoading(true);
    try {
      const token = sessionStorage.getItem('authToken');
      if (!token) {
        toast.error('Session expired. Please login again.');
        navigate('/login');
        return;
      }

      // Fetch missing attendance students
      const response = await api.get('/api/v1/cla_attendances/missing_attendance', {
        params: {
          cla_live_class_id: selectedClass,
          cla_cohort_id: selectedCohortId
        },
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data && response.data.missing_users) {
        setStudents(response.data.missing_users);
        setCurrentStep(2);
      } else {
        toast.info('No students found with missing attendance.');
      }
    } catch (error) {
      console.error('Error fetching students:', error);
      toast.error('Failed to fetch students. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitAttendance = async (e) => {
    e.preventDefault();
    if (!selectedStudent) {
      toast.error('Please select a student');
      return;
    }

    setIsLoading(true);
    try {
      const token = sessionStorage.getItem('authToken');
      if (!token) {
        toast.error('Session expired. Please login again.');
        navigate('/login');
        return;
      }

      // Send data as payload
      const attendanceData = {
        cla_attendance: {
          cla_live_class_id: selectedClass,
          cla_user_id: selectedStudent,
          cla_cohort_id: selectedCohortId.toString(),
          cla_course_id: selectedCourseId.toString(),
          present: present === 'present'
        }
      };

      await api.post('/api/v1/cla_attendances', attendanceData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      toast.success('Attendance recorded successfully!');
      // Reset form
      setSelectedStudent('');
      setPresent('present');
      
      // Refresh the students list to remove the marked student
      const updatedResponse = await api.get('/api/v1/cla_attendances/missing_attendance', {
        params: {
          cla_live_class_id: selectedClass,
          cla_cohort_id: selectedCohortId
        },
        headers: { Authorization: `Bearer ${token}` }
      });

      if (updatedResponse.data && updatedResponse.data.missing_users) {
        if (updatedResponse.data.missing_users.length === 0) {
          toast.success('All attendance has been marked!');
          navigate('/portal/events');
        } else {
          setStudents(updatedResponse.data.missing_users);
        }
      }
    } catch (error) {
      console.error('Error submitting attendance:', error);
      toast.error('Failed to record attendance. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      <ToastContainer position="top-right" />
      <div className="form-header">
        <FontAwesomeIcon icon={faUserCheck} className="header-icon" />
        <h2>Add Attendance</h2>
      </div>

      {/* Step 1: Select Class */}
      <div className={`form-part ${currentStep === 1 ? 'active' : ''}`}>
        <form onSubmit={handleProceed}>
          <div className="form-group">
            <label htmlFor="class">
              <FontAwesomeIcon icon={faCalendarAlt} className="form-icon" />
              Select Live Class
            </label>
            <select
              id="class"
              className="form-input"
              value={selectedClass}
              onChange={handleClassSelect}
              required
            >
              <option value="">Select a class</option>
              {liveClasses.map((liveClass) => (
                <option key={liveClass.id} value={liveClass.id}>
                  {liveClass.name} - {new Date(liveClass.date).toLocaleDateString()}
                </option>
              ))}
            </select>
          </div>
          <button 
            type="submit" 
            className="proceed-button"
            disabled={isLoading || !selectedClass}
          >
            {isLoading ? 'Loading...' : (
              <>
                Proceed <FontAwesomeIcon icon={faArrowRight} />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Step 2: Mark Attendance */}
      <div className={`form-part ${currentStep === 2 ? 'active' : ''}`}>
        <form onSubmit={handleSubmitAttendance}>
          <div className="form-group">
            <label htmlFor="student">Select Student</label>
            <select
              id="student"
              className="form-input"
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              required
            >
              <option value="">Select a student</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Attendance Status</label>
            <div className="attendance-status-radio">
              <div className="radio-option">
                <input
                  type="radio"
                  id="present"
                  name="attendance"
                  value="present"
                  checked={present === 'present'}
                  onChange={(e) => setPresent(e.target.value)}
                />
                <label htmlFor="present">Present</label>
              </div>
              <div className="radio-option">
                <input
                  type="radio"
                  id="absent"
                  name="attendance"
                  value="absent"
                  checked={present === 'absent'}
                  onChange={(e) => setPresent(e.target.value)}
                />
                <label htmlFor="absent">Absent</label>
              </div>
            </div>
            <small className="warning-text">⚠️ Warning! Student attendance cannot be changed after submission!</small>
          </div>

          <button 
            type="submit" 
            className="submit-button"
            disabled={isLoading || !selectedStudent}
          >
            {isLoading ? 'Submitting...' : (
              <>
                Submit <FontAwesomeIcon icon={faSave} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddAttendance; 