'use client'

import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBullhorn,
  faClipboardList,
  faPlus,
  faFileLines,
  faArrowLeft,
  faUser,
  faUsers,
} from '@fortawesome/free-solid-svg-icons'
import { createAxiosInstance } from '../../../../config'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../../../../stylesheets/addEditAssignment.css'

const api = createAxiosInstance()

const AddEditAnnouncement = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const announcement = location.state?.announcement || {}
  const { cohortId, cohortName, isEditMode } = location.state || {}
  const [loading, setLoading] = useState(false)
  const [students, setStudents] = useState([])

  const [formData, setFormData] = useState({
    cla_announcement: {
      title: announcement?.title || '',
      content: announcement?.content || '',
      cla_user_id: null, // null for general, user_id for specific
      cla_cohort_id: cohortId || '',
    },
  })

  useEffect(() => {
    
    if (isEditMode && announcement) {
      setFormData({
        cla_announcement: {
          title: announcement.title,
          content: announcement.content,
          cla_user_id: announcement.cla_user_id,
          cla_cohort_id: announcement.cla_cohort_id,
        },
      })
    }
  }, [isEditMode, announcement])

  useEffect(() => {
    const fetchStudents = async () => {
      if (!cohortId) {
        return
      }
      
      try {
        const token = sessionStorage.getItem('authToken')
        if (!token) {
          toast.error('Session expired. Please login again.')
          navigate('/login')
          return
        }

        const response = await api.get('/api/v1/cla_cohorts/students_of_cohort', {
          params: { cla_cohort_id: cohortId },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        
        // Handle different possible response structures
        let studentsData = []
        if (response.data) {
          if (response.data.students) {
            studentsData = response.data.students
          } else if (response.data.users) {
            studentsData = response.data.users
          } else if (Array.isArray(response.data)) {
            studentsData = response.data
          }
        }
        
        if (studentsData && studentsData.length > 0) {
          setStudents(studentsData)
        } else {
          setStudents([])
        }
      } catch (error) {
        console.error('Error fetching students:', error)
        toast.error('Failed to fetch students. Please try again.')
        setStudents([])
      }
    }

    fetchStudents()
  }, [cohortId, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      cla_announcement: {
        ...prev.cla_announcement,
        [name]: value,
      },
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const token = sessionStorage.getItem('authToken')
      if (!token) {
        toast.error('Session expired. Please login again.')
        navigate('/login')
        return
      }

      // Ensure cohort ID is set
      const currentCohortId = cohortId || sessionStorage.getItem('cohortId')
      if (!currentCohortId) {
        toast.error('Cohort information not found. Please login again.')
        navigate('/login')
        return
      }

      const updatedFormData = {
        ...formData,
        cla_announcement: {
          ...formData.cla_announcement,
          cla_cohort_id: currentCohortId,
        },
      }

      let response
      if (isEditMode) {
        response = await api.put(`/api/v1/cla_announcements/${announcement.id}`, updatedFormData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
      } else {
        response = await api.post('/api/v1/cla_announcements', updatedFormData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
      }

      if (response) {
        toast.success(isEditMode ? 'Announcement updated successfully!' : 'Announcement created successfully!')
        setTimeout(() => {
          navigate('/portal/announcements')
        }, 3000)
      }
    } catch (error) {
      console.error('Error with announcement:', error)
      let errorMessage = isEditMode
        ? 'Failed to update announcement. Please try again.'
        : 'Failed to create announcement. Please try again.'

      if (error.response) {
        console.error('Error response:', error.response.data)
        if (typeof error.response.data.error === 'string') {
          errorMessage = error.response.data.error
        } else if (error.response.data.errors) {
          const errors = error.response.data.errors
          if (Array.isArray(errors)) {
            errorMessage = errors.join(', ')
          } else {
            errorMessage = Object.entries(errors)
              .map(([field, messages]) => {
                let messageText = ''
                if (Array.isArray(messages)) {
                  messageText = messages.join(', ')
                } else if (typeof messages === 'string') {
                  messageText = messages
                } else {
                  messageText = String(messages)
                }
                return `${field}: ${messageText}`
              })
              .join('\n')
          }
        }
      }

      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    navigate('/portal/announcements')
  }

  return (
    <div className="task-editor-main task-editor-page">
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

      <div className="task-editor-content">
        <button onClick={handleBack} className="task-editor-return">
          <FontAwesomeIcon icon={faArrowLeft} /> Back
        </button>

        <div className="task-editor-panel">
          <div className="task-editor-title">
            <h2>
              {isEditMode ? 'Edit Announcement' : 'Create New Announcement'} <FontAwesomeIcon icon={faBullhorn} />
            </h2>
          </div>

          {cohortName && (
            <p className="task-editor-subtitle">
              Creating announcement for: <strong>{cohortName}</strong>
            </p>
          )}

          <form onSubmit={handleSubmit} className="task-editor-form">
            <div className="task-editor-input-group">
              <label>
                <FontAwesomeIcon icon={faClipboardList} className="task-editor-icon" />
                Announcement Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.cla_announcement.title}
                onChange={handleChange}
                placeholder="Enter announcement title"
                required
                disabled={loading}
              />
            </div>

            <div className="task-editor-input-group">
              <label>
                <FontAwesomeIcon icon={faFileLines} className="task-editor-icon" />
                Message
              </label>
              <textarea
                name="content"
                value={formData.cla_announcement.content}
                onChange={handleChange}
                placeholder="Enter announcement message"
                required
                rows="6"
                disabled={loading}
              />
            </div>

            <div className="task-editor-input-group">
              <label>
                <FontAwesomeIcon icon={faUsers} className="task-editor-icon" />
                Announcement Type
              </label>
              <div className="announcement-type-options">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="announcement_type"
                    value="general"
                    checked={formData.cla_announcement.cla_user_id === null}
                    onChange={() => setFormData(prev => ({
                      ...prev,
                      cla_announcement: {
                        ...prev.cla_announcement,
                        cla_user_id: null
                      }
                    }))}
                    disabled={loading}
                  />
                  <FontAwesomeIcon icon={faUsers} />
                  General (All students in cohort)
                </label>
                
                <label className="radio-option">
                  <input
                    type="radio"
                    name="announcement_type"
                    value="specific"
                    checked={formData.cla_announcement.cla_user_id !== null}
                    onChange={() => setFormData(prev => ({
                      ...prev,
                      cla_announcement: {
                        ...prev.cla_announcement,
                        cla_user_id: ''
                      }
                    }))}
                    disabled={loading}
                  />
                  <FontAwesomeIcon icon={faUser} />
                  User Specific
                </label>
              </div>
            </div>

            {formData.cla_announcement.cla_user_id !== null && (
              <div className="task-editor-input-group">
                <label>
                  <FontAwesomeIcon icon={faUser} className="task-editor-icon" />
                  Select Student
                </label>
                <select
                  name="cla_user_id"
                  value={formData.cla_announcement.cla_user_id || ''}
                  onChange={handleChange}
                  required={formData.cla_announcement.cla_user_id !== null}
                  disabled={loading}
                  className="task-editor-dropdown"
                >
                  <option value="">Select a student</option>
                  {students && students.length > 0 ? (
                    students.map((student) => {
                      // Handle different possible student object structures
                      const studentId = student.user_id || student.id || student.cla_user_id
                      const studentName = student.name || student.full_name || student.student_name || 'Unknown Student'
                      
                      return (
                        <option key={studentId} value={studentId}>
                          {studentName}
                        </option>
                      )
                    })
                  ) : (
                    <option value="" disabled>No students available</option>
                  )}
                </select>
                {students && students.length === 0 && (
                  <small style={{ color: '#6c757d', marginTop: '4px' }}>
                    No students found in this cohort
                  </small>
                )}
              </div>
            )}

            <button type="submit" className="task-editor-button" disabled={loading}>
              <FontAwesomeIcon icon={faPlus} />
              {loading
                ? isEditMode
                  ? 'Updating Announcement...'
                  : 'Creating Announcement...'
                : isEditMode
                  ? 'Save Changes'
                  : 'Create Announcement'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddEditAnnouncement

