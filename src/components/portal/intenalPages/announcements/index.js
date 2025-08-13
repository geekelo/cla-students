import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faBullhorn, faUser, faPlus } from '@fortawesome/free-solid-svg-icons';
import AnnouncementsItem from './announcementsItem';
import { toast } from 'react-toastify';
import { createAxiosInstance } from '../../../../config';
import '../../../../stylesheets/assignments.css';

const api = createAxiosInstance();

function Announcements() {
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cohorts, setCohorts] = useState([]);
  const [selectedCohort, setSelectedCohort] = useState('');
  const [activeTab, setActiveTab] = useState('general');

  useEffect(() => {
    fetchCohorts();
  }, []);

  const fetchCohorts = async () => {
    try {
      const token = sessionStorage.getItem('authToken');
      if (!token) {
        toast.error('Session expired. Please login again.');
        navigate('/login');
        return;
      }

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await api.get('/api/v1/cla_cohorts');
      
      if (response.data && response.data.cohorts) {
        setCohorts(response.data.cohorts);
      }
    } catch (error) {
      console.error('Error fetching cohorts:', error);
      toast.error('Failed to fetch cohorts');
    }
  };

  const fetchAnnouncements = async (cohortId) => {
    try {
      setLoading(true);
      setError(null);
      
      const token = sessionStorage.getItem('authToken');
      if (!token) {
        toast.error('Session expired. Please login again.');
        navigate('/login');
        return;
      }

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      const response = await api.get('/api/v1/cla_announcements', {
        params: { 
          cla_cohort_id: cohortId 
        }
      });

      if (response.data) {
        setAnnouncements(response.data);
      }
    } catch (error) {
      console.error('Error fetching announcements:', error);
      setError('Failed to fetch announcements. Please try again.');
      setAnnouncements([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCohortChange = (e) => {
    const newCohortId = e.target.value;
    setSelectedCohort(newCohortId);
    
    if (newCohortId) {
      fetchAnnouncements(newCohortId);
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleCreateAnnouncement = () => {
    if (selectedCohort) {
      navigate('/portal/announcement/new', { 
        state: { 
          cohortId: selectedCohort,
          cohortName: cohorts.find(c => c.id === selectedCohort)?.name 
        } 
      });
    }
  };

  const handleEditAnnouncement = (announcement) => {
    navigate('/portal/announcement/new', {
      state: {
        announcement,
        cohortId: selectedCohort,
        cohortName: cohorts.find(c => c.id === selectedCohort)?.name,
        isEditMode: true
      }
    });
  };

  const handleDeleteAnnouncement = async (announcementId) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      try {
        const token = sessionStorage.getItem('authToken');
        if (!token) {
          toast.error('Session expired. Please login again.');
          navigate('/login');
          return;
        }

        await api.delete(`/api/v1/cla_announcements/${announcementId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        toast.success('Announcement deleted successfully!');
        
        // Refresh the announcements list
        if (selectedCohort) {
          fetchAnnouncements(selectedCohort);
        }
      } catch (error) {
        console.error('Error deleting announcement:', error);
        toast.error('Failed to delete announcement. Please try again.');
      }
    }
  };

  // Filter announcements based on active tab
  const filteredAnnouncements = announcements.filter((announcement) => {
    if (activeTab === 'general') {
      return announcement.cla_user_id === null;
    } else {
      return announcement.cla_user_id !== null;
    }
  });

  return (
    <div className="assignments-section">
      {/* Title Section */}
      <div className="assignments-title-container">
        <h2 className="assignments-title">Announcements</h2>
      </div>

      {/* Filter Section - Only for facilitators */}
      <div className="cohort-filter-section">
        <div className="cohort-filter">
          <div className="filter-label">
            <FontAwesomeIcon icon={faFilter} className="filter-icon" />
            Filter by Cohort:
          </div>
          <select
            className="cohort-select"
            value={selectedCohort}
            onChange={handleCohortChange}
          >
            <option value="">Select a cohort</option>
            {cohorts.map((cohort) => (
              <option key={cohort.id} value={cohort.id}>
                {cohort.name}
              </option>
            ))}
          </select>
        </div>
        
        {/* Create Announcement Button - Only visible when cohort is selected */}
        {selectedCohort && (
          <div className="create-announcement-section">
            <button
              type="button"
              className="create-announcement-btn"
              onClick={handleCreateAnnouncement}
            >
              <FontAwesomeIcon icon={faPlus} className="me-2" />
              Create Announcement
            </button>
          </div>
        )}
      </div>

      {/* Announcement Tabs */}
      <div className="assignments-tabs">
        <button
          type="button"
          className={`tab-button ${activeTab === 'general' ? 'active' : ''}`}
          onClick={() => handleTabClick('general')}
        >
          <FontAwesomeIcon icon={faBullhorn} className="me-2" /> General
        </button>
        <button
          type="button"
          className={`tab-button ${activeTab === 'user-specific' ? 'active' : ''}`}
          onClick={() => handleTabClick('user-specific')}
        >
          <FontAwesomeIcon icon={faUser} className="me-2" /> User Specific
        </button>
      </div>

      {/* Announcements List */}
      {loading || error ? (<div className="loading">{error ? error : 'Loading announcements...'}</div>)  : (
      <div className="assignments-list">
        {filteredAnnouncements?.length > 0 ? (
          filteredAnnouncements.map((announcement) => (
            <AnnouncementsItem 
              key={announcement.id} 
              announcement={announcement} 
              handleEditAnnouncement={handleEditAnnouncement}
              handleDeleteAnnouncement={handleDeleteAnnouncement}
            />
          ))
        ) : (
          <p className="no-assignments">
            No {activeTab} announcements available.
          </p>
        )}
      </div>)}
    </div>
  );
}

export default Announcements;
