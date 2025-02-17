import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGraduationCap,
  faBook,
  faPlus,
  faArrowLeft,
  faUsers,
  faCalendarAlt,
  faSave,
} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../../../../stylesheets/addEditCourse.css'

const api = axios.create({
  baseURL: 'https://cla-portal-api.onrender.com',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

const AddEditCourseForm = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { course, isEditMode, isDuplicateMode } = location.state || {}
  const [loading, setLoading] = useState(false)
  const [cohorts, setCohorts] = useState([])
  const [formData, setFormData] = useState({
    cla_course: {
      name: course?.name || '',
      description: course?.description || '',
      cla_cohort_id: course?.cla_cohort_id || '',
      start_date: course?.start_date || '',
      end_date: course?.end_date || '',
      cla_user_id: sessionStorage.getItem('userId') || '',
      locked: course?.locked || false,
    },
  })

  useEffect(() => {
    const token = sessionStorage.getItem('authToken')
    const userId = sessionStorage.getItem('userId')

    if (!token || !userId) {
      toast.error('Session expired. Please login again.')
      navigate('/login')
      return
    }

    const fetchData = async () => {
      try {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`

        // Fetch cohorts
        const cohortsResponse = await api.get('/api/v1/cla_cohorts')
        setCohorts(cohortsResponse.data.cohorts || [])

        // Fetch roles
        const rolesResponse = await api.get('/api/v1/cla_roles')
        console.log('Roles Response:', rolesResponse.data)
      } catch (error) {
        if (error.response) {
          console.log('Error fetching data:', error.response.data)
          toast.error('Failed to load data')
        }
      }
    }

    fetchData()
  }, [navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    let finalValue = value

    if (name === 'cla_cohort_id') {
      finalValue = Number.parseInt(value)
      // Store cohort ID in session storage when selected
      sessionStorage.setItem('cohortId', finalValue)
    }

    setFormData((prev) => ({
      ...prev,
      cla_course: {
        ...prev.cla_course,
        [name]: finalValue,
      },
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const token = sessionStorage.getItem('authToken')
      const userId = sessionStorage.getItem('userId')

      if (!token || !userId) {
        toast.error('Session expired. Please login again.')
        navigate('/login')
        return
      }

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`

      // Construct the request body with 'cla_course'
      const courseData = {
        cla_course: {
          name: formData.cla_course.name,
          description: formData.cla_course.description,
          cla_cohort_id: formData.cla_course.cla_cohort_id,
          start_date: formData.cla_course.start_date,
          end_date: formData.cla_course.end_date,
          cla_user_id: userId, // Ensure user ID is included
        },
      }

      console.log('Sending course data:', JSON.stringify(courseData, null, 2))

      let response
      if (isEditMode) {
        response = await api.put(`/api/v1/cla_courses/${course.id}`, courseData)
      } else {
        response = await api.post('/api/v1/cla_courses', courseData)
      }

      console.log('Course response:', response.data)
      toast.success(isEditMode ? 'Course updated successfully!' : 'Course created successfully!')
      navigate('/portal/instructorDesk')
    } catch (error) {
      let errorMessage = isEditMode
        ? 'Failed to update course. Please try again.'
        : 'Failed to create course. Please try again.'

      if (error.response) {
        console.log('Error response:', error.response.data)
        if (typeof error.response.data.error === 'string') {
          errorMessage = error.response.data.error
        } else if (error.response.data.errors) {
          errorMessage = Object.entries(error.response.data.errors)
            .map(([field, messages]) => {
              if (Array.isArray(messages)) {
                return `${field}: ${messages.join(', ')}`
              } else {
                return `${field}: ${messages}`
              }
            })
            .join('\n')
        }
      } else if (error.request) {
        errorMessage = 'No response from server. Please check your internet connection.'
      }

      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    navigate('/portal/courses')
  }

  return (
    <div className='add-edit-course-container'>
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
      />
      <div className='add-edit-course-content'>
        <button onClick={handleBack} className='back-button'>
          <FontAwesomeIcon icon={faArrowLeft} /> Back
        </button>
        <div className='course-form'>
          <div className='form-header'>
            <h2>{isDuplicateMode ? 'Duplicate Course' : isEditMode ? 'Edit Course' : 'Add New Course'}</h2>
            <FontAwesomeIcon icon={faGraduationCap} className='header-icon' />
          </div>

          <div className='form-content'>
            <p className='course-details-text'>Fill course details:</p>

            <form onSubmit={handleSubmit} className='course-form'>
              <div className='form-group'>
                <label htmlFor='name' className='form-label'>
                  <FontAwesomeIcon icon={faBook} className='input-icon' />
                  Course Name
                </label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  className='form-input'
                  value={formData.cla_course.name}
                  onChange={handleChange}
                  placeholder='Enter course name'
                  required
                  disabled={loading}
                />
              </div>

              <div className='form-group'>
                <label htmlFor='description' className='form-label'>
                  <FontAwesomeIcon icon={faBook} className='input-icon' />
                  Course Description
                </label>
                <textarea
                  id='description'
                  name='description'
                  className='form-textarea'
                  value={formData.cla_course.description}
                  onChange={handleChange}
                  placeholder='Enter course description'
                  required
                  rows='4'
                  disabled={loading}
                />
              </div>

              <div className='form-group'>
                <label htmlFor='start_date' className='form-label'>
                  <FontAwesomeIcon icon={faCalendarAlt} className='input-icon' />
                  Start Date
                </label>
                <input
                  type='date'
                  id='start_date'
                  name='start_date'
                  className='form-input'
                  value={formData.cla_course.start_date}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>

              <div className='form-group'>
                <label htmlFor='end_date' className='form-label'>
                  <FontAwesomeIcon icon={faCalendarAlt} className='input-icon' />
                  End Date
                </label>
                <input
                  type='date'
                  id='end_date'
                  name='end_date'
                  className='form-input'
                  value={formData.cla_course.end_date}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>

              <div className='form-group'>
                <label htmlFor='cla_cohort_id' className='form-label'>
                  <FontAwesomeIcon icon={faUsers} className='input-icon' />
                  Select Cohort
                </label>
                <select
                  id='cla_cohort_id'
                  name='cla_cohort_id'
                  className='form-input'
                  value={formData.cla_course.cla_cohort_id}
                  onChange={handleChange}
                  required
                  disabled={loading}
                >
                  <option value=''>Select a cohort</option>
                  {Array.isArray(cohorts) &&
                    cohorts.map((cohort) => (
                      <option key={cohort.id} value={cohort.id}>
                        {cohort.name}
                      </option>
                    ))}
                </select>
              </div>

              <button type='submit' className='form-button' disabled={loading}>
                <FontAwesomeIcon icon={isEditMode ? faSave : faPlus} className='button-icon' />
                {loading
                  ? isDuplicateMode
                    ? 'Duplicating Course...'
                    : isEditMode
                      ? 'Updating Course...'
                      : 'Creating Course...'
                  : isDuplicateMode
                    ? 'Save Duplicate'
                    : isEditMode
                      ? 'Save Changes'
                      : 'Add Course'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddEditCourseForm

