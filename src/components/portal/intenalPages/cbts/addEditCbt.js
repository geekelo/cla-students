'use client'

import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGraduationCap,
  faClipboardList,
  faPlus,
  faCalendarAlt,
  faFileLines,
  faArrowLeft,
  faLayerGroup,
} from '@fortawesome/free-solid-svg-icons'
import { createAxiosInstance } from '../../../../config'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../../../../stylesheets/addEditAssignment.css'

const api = createAxiosInstance()

const AddEditCbt = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { courseId, cbt, isEditMode, cohortId } = location.state || {}
  const [loading, setLoading] = useState(false)
  const [courses, setCourses] = useState([])

  const [formData, setFormData] = useState({
    cla_cbt: {
      name: cbt?.name || '',
      description: cbt?.description || '',
      due_date: cbt?.due_date || '',
      cla_course_id: courseId || '',
      cla_user_id: sessionStorage.getItem('userId') || '',
      cla_cohort_id: cohortId || '',
    },
  })

  useEffect(() => {
    if (isEditMode && cbt) {
      setFormData({
        cla_cbt: {
          name: cbt.name,
          description: cbt.description,
          due_date: cbt.due_date,
          cla_course_id: cbt.cla_course_id,
          cla_user_id: sessionStorage.getItem('userId'),
          cla_cohort_id: cohortId,
        },
      })
    }
  }, [isEditMode, cbt])

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = sessionStorage.getItem('authToken')
        const userId = sessionStorage.getItem('userId')
        const userRole = localStorage.getItem('userRole')
        const cohortId = localStorage.getItem('cohortId')

        if (!token || !userId) {
          toast.error('Session expired. Please login again.')
          navigate('/login')
          return
        }

        let params = {}
        if (userRole === 'student') {
          params = { cohort_id: cohortId }
        } else if (userRole === 'facilitator') {
          params = { cla_user_id: userId }
        }

        const response = await api.get('/api/v1/cla_courses', {
          params,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setCourses(response.data)
      } catch (error) {
        console.error('Error fetching courses:', error)
        toast.error('Failed to fetch courses. Please try again.')
      }
    }

    fetchCourses()
  }, [navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      cla_cbt: {
        ...prev.cla_cbt,
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

      let response
      if (isEditMode) {
        response = await api.put(`/api/v1/cla_cbts/${cbt.id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
      } else {
        response = await api.post('/api/v1/cla_cbts', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
      }

      if (response) {
        toast.success(isEditMode ? 'Cbt updated successfully!' : 'Cbt created successfully!')

        navigate('/portal/cbts')
      }
    } catch (error) {
      console.error('Error with cbt:', error)
      let errorMessage = isEditMode
        ? 'Failed to update cbt. Please try again.'
        : 'Failed to create cbt. Please try again.'

      if (error.response) {
        console.error('Error response:', error.response.data)
        if (typeof error.response.data.error === 'string') {
          errorMessage = error.response.data.error
        } else if (error.response.data.errors) {
          // Handle both array and object error formats
          const errors = error.response.data.errors;
          if (Array.isArray(errors)) {
            // If errors is an array, join them directly
            errorMessage = errors.join(', ');
          } else {
            // If errors is an object, format with field names
            errorMessage = Object.entries(errors)
              .map(([field, messages]) => {
                // Handle different types of messages (string, array, or other)
                let messageText = '';
                if (Array.isArray(messages)) {
                  messageText = messages.join(', ');
                } else if (typeof messages === 'string') {
                  messageText = messages;
                } else {
                  messageText = String(messages);
                }
                return `${field}: ${messageText}`;
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
    navigate('/portal/cbts')
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
              {isEditMode ? 'Edit Cbt' : 'Add New Cbt'} <FontAwesomeIcon icon={faGraduationCap} />
            </h2>
          </div>

          <p className="task-editor-subtitle">Fill cbt details:</p>

          <form onSubmit={handleSubmit} className="task-editor-form">
            <div className="task-editor-input-group">
              <label>
                <FontAwesomeIcon icon={faClipboardList} className="task-editor-icon" />
                Cbt Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.cla_cbt.name}
                onChange={handleChange}
                placeholder="Enter cbt name"
                required
                disabled={loading}
              />
            </div>

            <div className="task-editor-input-group">
              <label>
                <FontAwesomeIcon icon={faFileLines} className="task-editor-icon" />
                Description
              </label>
              <textarea
                name="description"
                value={formData.cla_cbt.description}
                onChange={handleChange}
                placeholder="Enter cbt description"
                required
                rows="4"
                disabled={loading}
              />
            </div>

            <div className="task-editor-input-group">
              <label>
                <FontAwesomeIcon icon={faCalendarAlt} className="task-editor-icon" />
                Due Date
              </label>
              <input
                type="date"
                name="due_date"
                value={formData.cla_cbt.due_date}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className="task-editor-input-group">
              <label>
                <FontAwesomeIcon icon={faLayerGroup} className="task-editor-icon" />
                Course
              </label>
              <select
                name="cla_course_id"
                value={formData.cla_cbt.cla_course_id}
                onChange={handleChange}
                required
                disabled={loading}
                className="task-editor-dropdown"
              >
                <option value="">Select a course</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="task-editor-button" disabled={loading}>
              <FontAwesomeIcon icon={faPlus} />
              {loading
                ? isEditMode
                  ? 'Updating Cbt...'
                  : 'Creating Cbt...'
                : isEditMode
                  ? 'Save Changes'
                  : 'Add Cbt'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddEditCbt

