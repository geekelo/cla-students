'use client'

import { useState, useEffect } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import TopicsAccordion from '../topics/topicsAccordion'
import '../../../../stylesheets/courseDetails.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { toast } from 'react-toastify'
import {
  faEdit,
  faTrash,
  faUser,
  faBookOpen,
  faClipboardList,
  faVideo,
  faPlus,
  faArrowLeft,
  faCopy
} from '@fortawesome/free-solid-svg-icons'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { createAxiosInstance } from '../../../../config'

const api = createAxiosInstance()

function CourseDetails() {
  const { id } = useParams()
  const location = useLocation()
  const { course } = location.state || {}
  const [topics, setTopics] = useState([])
  const [userRole, setUserRole] = useState(null);
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

        const response = await api.get(`/api/v1/cla_courses/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        console.log('Course Details Loaded:', response.status)

        // Fetch topics for the course
        const topicsResponse = await api.get('/api/v1/cla_topics', {
          params: { cla_course_id: id },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setTopics(topicsResponse.data || [])
      } catch (error) {
        console.error('Error fetching course details:', error)
        if (error.response) {
          console.error('Error response:', error.response.data)
        }
      }
    }

    if (id) {
      fetchCourseDetails();
      setUserRole(sessionStorage.getItem('userRole'))
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

      const response = await api.get('/api/v1/cla_assignments', {
        params: { cla_course_id: id },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      navigate('/portal/assignments/', { state: { assignments: response.data } })
    } catch (error) {
      console.error('Error fetching assignments:', error)
      if (error.response) {
        console.error('Error response:', error.response.data)
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

  const handleDeleteTopic = (topicId) => {
    toast.info(
      <div>
        <p>Are you sure you want to delete this topic?</p>
        <p>This action cannot be undone.</p>
        <button 
          onClick={() => confirmDeleteTopic(topicId)} 
          style={{
            background: '#6b4ca6',
            color: 'white',
            padding: '5px 10px',
            border: 'none',
            borderRadius: '4px',
            marginRight: '10px',
            cursor: 'pointer'
          }}
        >
          Yes, Delete Topic
        </button>
      </div>,
      {
        autoClose: false,
        closeOnClick: false,
        closeButton: true
      }
    );
  };

  const confirmDeleteTopic = async (topicId) => {
    try {
      const token = sessionStorage.getItem('authToken');
      if (!token) {
        toast.error('Session expired. Please login again.');
        navigate('/login');
        return;
      }

      toast.info('Deleting topic...', {
        autoClose: false,
        toastId: 'deletingTopic'
      });

      await api.delete(`/api/v1/cla_topics/${topicId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setTopics(topics.filter((topic) => topic.id !== topicId));
      toast.dismiss('deletingTopic');
      toast.success('Topic deleted successfully!');
    } catch (error) {
      toast.dismiss('deletingTopic');
      console.error('Error deleting topic:', error);
      toast.error('Failed to delete topic. Please try again.');
    }
  };

  const handleEditCourse = () => {
    navigate('/portal/course/new', {
      state: {
        course: course,
        isEditMode: true,
      },
    })
  }

  const handleDeleteCourse = () => {
    toast.info(
      <div>
        <p>Are you sure you want to delete this course?</p>
        <p>This action cannot be undone.</p>
        <button 
          onClick={confirmDeleteCourse} 
          style={{
            background: '#6b4ca6',
            color: 'white',
            padding: '5px 10px',
            border: 'none',
            borderRadius: '4px',
            marginRight: '10px',
            cursor: 'pointer'
          }}
        >
          Yes, Delete Course
        </button>
      </div>,
      {
        autoClose: false,
        closeOnClick: false,
        closeButton: true
      }
    );
  };

  const confirmDeleteCourse = async () => {
    try {
      const token = sessionStorage.getItem('authToken');
      if (!token) {
        toast.error('Session expired. Please login again.');
        navigate('/login');
        return;
      }

      toast.info('Deleting course...', {
        autoClose: false,
        toastId: 'deletingCourse'
      });

      await api.delete(`/api/v1/cla_courses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      toast.dismiss('deletingCourse');
      toast.success('Course deleted successfully!');
      navigate('/portal/courses');
    } catch (error) {
      toast.dismiss('deletingCourse');
      console.error('Error deleting course:', error);
      toast.error('Failed to delete course. Please try again.');
    }
  };

  const handleAddAssignment = () => {
    navigate('/portal/assignment/new', {
      state: {
        courseId: id,
        course: course,
        cohortId: course.cla_cohort_id,
      },
    })
  }

  const handleAddContribution = () => {
    navigate('/portal/contribution/new', {
      state: {
        courseId: id,
        course: course,
        cohortId: course.cla_cohort_id,
      },
    })
  }

  const handleAddCbt = () => {
    navigate('/portal/cbt/new', {
      state: {
        courseId: id,
        course: course,
        cohortId: course.cla_cohort_id,
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

  const handleDuplicateCourse = () => {
    navigate('/portal/course/new', {
      state: {
        course: {
          ...course,
          name: `Copy of ${course.name}`,
        },
        isDuplicateMode: true,
      },
    });
  };

  return (
    <div className='course-details-container'>
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
      <div className='course-details-content'>
        <button onClick={handleBack} className='back-button'>
          <FontAwesomeIcon icon={faArrowLeft} /> Back
        </button>
        <div className='course-details'>
          {/* Header Section */}
          <div className='course-header'>
            <div className='course-title-container'>
              <h1 className='course-title'>{course?.name}</h1>
              {userRole === 'facilitator' && (
                <div className='course-header-actions'>
                  <button 
                    type='button' 
                    className='header-action-icon' 
                    onClick={handleEditCourse} 
                    title='Edit Course'
                    aria-label="Edit course"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button 
                    type='button' 
                    className='header-action-icon' 
                    onClick={handleDuplicateCourse} 
                    title='Duplicate Course'
                    aria-label="Duplicate course"
                  >
                    <FontAwesomeIcon icon={faCopy} />
                  </button>
                  <button
                    type='button'
                    className='header-action-icon delete-icon'
                    onClick={handleDeleteCourse}
                    title='Delete Course'
                    aria-label="Delete course"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              )}
            </div>

            <div className='course-info-grid'>
              <div className='info-item'>
                <FontAwesomeIcon icon={faUser} />
                <span>
                  Facilitator: <strong>{course?.facilitator}</strong>
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
              {userRole === 'facilitator' && (
              <button className='add-topic' onClick={handleAddTopic}>
                <FontAwesomeIcon icon={faPlus} className='icon' /> Add Topic
              </button>)}
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

          <div className="course-actions">
            <button
              type="button"
              className="course-action-btn"
              onClick={handleAssignmentClick}
            >
              <FontAwesomeIcon icon={faClipboardList} className="btn-icon" /> See Assignments
            </button>
            <button
              type="button"
              className="course-action-btn"
              onClick={handleLiveClassesClick}
            >
              <FontAwesomeIcon icon={faVideo} className="btn-icon" /> View Live Classes
            </button>
          </div>

          <div className="course-actions">
            {userRole === 'facilitator' && (
            <button
              type="button"
              className="course-action-btn"
              onClick={handleAddLiveClassesClick}
            >
              <FontAwesomeIcon icon={faPlus} className="btn-icon" /> Schedule Live Class
            </button>
            )}
            {userRole === 'facilitator' && (
            <button
              type="button"
              className="course-action-btn"
              onClick={handleAddAssignment}
            >
              <FontAwesomeIcon icon={faPlus} className="btn-icon" /> Add Assignment
            </button>
          )}
          {userRole === 'facilitator' && (
            <button
              type="button"
              className="course-action-btn"
              onClick={handleAddContribution}
            >
              <FontAwesomeIcon icon={faPlus} className="btn-icon" /> Create Contribution
            </button>
          )}
                    {userRole === 'facilitator' && (
            <button
              type="button"
              className="course-action-btn"
              onClick={handleAddCbt}
            >
              <FontAwesomeIcon icon={faPlus} className="btn-icon" /> Create Test
            </button>
          )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetails

