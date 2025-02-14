'use client'

import { useState, useEffect } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import TopicsAccordion from '../topics/topicsAccordion'
import '../../../../stylesheets/courseDetails.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { toast } from 'react-toastify'
import {
  faEdit,
  faTrash,
  faUser,
  faIdCard,
  faCalendarAlt,
  faBookOpen,
  faClipboardList,
  faVideo,
  faPlus,
  faAngleDown,
  faListCheck,
  faVideoCamera,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons'

const BASE_URL = 'https://cla-portal-api.onrender.com'

function CourseDetails() {
  const { id } = useParams()
  const location = useLocation()
  const { course } = location.state || {}
  const [topics, setTopics] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const token = sessionStorage.getItem('authToken')
        if (!token) {
          toast.error('Session expired. Please login again.')
          navigate('/login')
          return
        }

        const response = await axios.get(`${BASE_URL}/api/v1/cla_courses/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        console.log('Course Details Response:', response.data)

        // Fetch topics for the course
        const topicsResponse = await axios.get(`${BASE_URL}/api/v1/cla_topics`, {
          params: { cla_course_id: id },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        console.log('Course Topics Response:', topicsResponse.data)
        setTopics(topicsResponse.data || [])
      } catch (error) {
        console.error('Error fetching course details:', error)
        if (error.response) {
          console.log('Error response:', error.response.data)
        }
      }
    }

    if (id) {
      fetchCourseDetails()
    }
  }, [id, navigate])

  if (!course) {
    return (
      <div className='student-area-container'>
        <div className='student-display-area'>
          <div className='error-message'>Course not found!</div>
        </div>
      </div>
    )
  }

  const handleAssignmentClick = async () => {
    try {
      const token = sessionStorage.getItem('authToken')
      if (!token) {
        toast.error('Session expired. Please login again.')
        navigate('/login')
        return
      }

      const response = await axios.get(`${BASE_URL}/api/v1/cla_assignments`, {
        params: { cla_course_id: id },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      console.log('Assignments Response:', response.data)
      navigate('/portal/assignments/', { state: { assignments: response.data } })
    } catch (error) {
      console.error('Error fetching assignments:', error)
      if (error.response) {
        console.log('Error response:', error.response.data)
      }
      toast.error('Failed to fetch assignments. Please try again.')
    }
  }

  const handleLiveClassesClick = () => {
    const classes = Array.isArray(course?.liveClasses) ? course.liveClasses : []
    navigate('/portal/events/', { state: { liveClasses: classes } })
  }

  const handleAddLiveClassesClick = () => {
    navigate('/portal/event/new', {
      state: {
        courseId: id,
        courseName: course.name,
        course: course,
      },
    })
  }

  const handleBack = () => {
    navigate('/portal/courses')
  }

  const handleAddTopic = () => {
    navigate('/portal/topic/new', {
      state: {
        courseId: id,
        courseName: course.name,
        course: course,
      },
    })
  }

  const handleDeleteTopic = (id) => {
    if (window.confirm('Are you sure you want to delete this topic?')) {
      setTopics(topics.filter((topic) => topic.id !== id))
    }
  }

  const handleEditCourse = () => {
    navigate('/portal/course/new', {
      state: {
        course: course,
        isEditMode: true,
      },
    })
  }

  const handleDeleteCourse = () => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      // Add delete course logic here
      console.log('Delete course clicked')
    }
  }

  const handleAddAssignment = () => {
    navigate('/portal/assignment/new', {
      state: {
        courseId: id,
        course: course,
      },
    })
  }

  const handleEditTopic = (topic) => {
    navigate('/portal/topic/new', {
      state: {
        topic: topic,
        courseId: id,
        isEditMode: true,
      },
    })
  }

  return (
    <div className='course-details-container'>
      <div className='course-details-content'>
        <button onClick={handleBack} className='back-button'>
          <FontAwesomeIcon icon={faArrowLeft} /> Back
        </button>
        <div className='course-details'>
          {/* Header Section */}
          <div className='course-header'>
            <div className='course-title-container'>
              <h1 className='course-title'>{course?.name}</h1>
              <div className='course-actions'>
                <button type='button' className='action-icon' onClick={handleEditCourse} title='Edit Course'>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  type='button'
                  className='action-icon delete-icon'
                  onClick={handleDeleteCourse}
                  title='Delete Course'
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                <button
                  type='button'
                  className='add-live-btn'
                  onClick={() => handleAddLiveClassesClick(course?.liveClasses)}
                >
                  <FontAwesomeIcon icon={faVideo} className='icon' />
                  Schedule Live Class
                </button>
              </div>
            </div>

            <div className='course-info-grid'>
              <div className='info-item'>
                <FontAwesomeIcon icon={faUser} />
                <span>
                  Facilitator: <strong>{course?.facilitator}</strong>
                </span>
              </div>
              <div className='info-item'>
                <FontAwesomeIcon icon={faIdCard} />
                <span>
                  Course ID: <strong>{id}</strong>
                </span>
              </div>
              <div className='info-item'>
                <FontAwesomeIcon icon={faCalendarAlt} />
                <span>
                  Created on: <strong>{course?.dateCreated}</strong>
                </span>
              </div>
              <div className='info-item'>
                <FontAwesomeIcon icon={faBookOpen} />
                <span>
                  Number of Topics: <strong>{topics?.length}</strong>
                </span>
              </div>
              <div className='info-item'>
                <FontAwesomeIcon icon={faClipboardList} />
                <span>
                  Number of Assignments: <strong>{course?.assignments?.length}</strong>
                </span>
              </div>
              <div className='info-item'>
                <FontAwesomeIcon icon={faVideo} />
                <span>
                  Pending Live Classes: <strong>{course?.pendingLiveClasses}</strong>
                </span>
              </div>
            </div>

            <div className='course-description'>
              <h3>Description :</h3>
              <p>{course.description ? course.description : 'No description available for this course.'}</p>
            </div>
          </div>

          <div className='topics-section'>
            <div className='topics-header'>
              <h2>Topics</h2>
              <button className='add-topic' onClick={handleAddTopic}>
                <FontAwesomeIcon icon={faPlus} className='icon' /> Add Topic
              </button>
            </div>
            <div className='topics-list'>
              {topics.length > 0 ? (
                topics.map((topic, index) => (
                  <TopicsAccordion
                    key={topic.id}
                    topic={topic}
                    onDelete={() => handleDeleteTopic(topic.id)}
                    onEdit={() => handleEditTopic(topic)}
                    index={index}
                    courseId={id}
                    course={course}
                  />
                ))
              ) : (
                <div className='no-topics'>No topics have been added to this course yet.</div>
              )}
            </div>
          </div>

          <div className='course-extra-actions'>
            <p>
              <FontAwesomeIcon icon={faAngleDown} style={{ marginRight: '10px' }} /> For this course :
            </p>
            <button type='button' className='action-button purple-btn' onClick={handleAssignmentClick}>
              <FontAwesomeIcon icon={faListCheck} style={{ marginRight: '10px' }} /> See Assignments
            </button>
            <button type='button' className='action-button purple-btn' onClick={() => handleAddAssignment()}>
              <FontAwesomeIcon icon={faPlus} style={{ marginRight: '10px' }} /> Add Assignment
            </button>
            <button
              type='button'
              className='action-button purple-btn'
              onClick={() => handleLiveClassesClick(course?.liveClasses)}
            >
              <FontAwesomeIcon icon={faVideoCamera} style={{ marginRight: '10px' }} /> View Live Classes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetails

