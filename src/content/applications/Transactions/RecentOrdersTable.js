import React, { useState } from 'react';

const languages = {
  'eng': 'English',
  'deu': 'German',
  'rus': 'Russian',
  'fra': 'French',
  'spa': 'Spanish',
  'jpn': 'Japanese',
  'hin': 'Hindi',
}

const getStatusLabel = (videoStatus) => {
  const map = {
    failed: { text: 'Failed', color: '#dc3545' },
    completed: { text: 'Completed', color: '#28a745' },
    pending: { text: 'Pending', color: '#ffc107' }
  };

  const { text, color } = map[videoStatus];

  return (
    <span style={{
      backgroundColor: color,
      color: 'white',
      padding: '0.25rem 0.5rem',
      borderRadius: '4px',
      fontSize: '0.875rem',
      fontWeight: '500'
    }}>
      {text}
    </span>
  );
};

const applyFilters = (videos, filters) => {
  return videos.filter((video) => {
    let matches = true;

    if (filters.status && video.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (videos, page, limit) => {
  return videos.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable = () => {
  const [videos] = useState([
    {
      id: '1',
      title: 'Introduction to React',
      conference: 'React Conf 2023',
      status: 'completed',
      createdAt: new Date().getTime() - 86400000
    },
    {
      id: '2', 
      title: 'Advanced JavaScript Patterns',
      conference: 'JS Summit 2023',
      status: 'pending',
      createdAt: new Date().getTime() - 172800000
    },
    {
      id: '3',
      title: 'Building Scalable APIs',
      conference: 'API World 2023', 
      status: 'failed',
      createdAt: new Date().getTime() - 259200000
    }
  ]);

  const [selectedVideos, setSelectedVideos] = useState([]);

  const handleSelectAllVideos = (event) => {
    setSelectedVideos(event.target.checked ? videos.map(video => video.id) : []);
  };

  const handleSelectOneVideo = (event, videoId) => {
    if (!selectedVideos.includes(videoId)) {
      setSelectedVideos([...selectedVideos, videoId]);
    } else {
      setSelectedVideos(selectedVideos.filter(id => id !== videoId));
    }
  };

  const selectedSomeVideos = selectedVideos.length > 0 && selectedVideos.length < videos.length;
  const selectedAllVideos = selectedVideos.length === videos.length;

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ backgroundColor: '#f8f9fa' }}>
          <tr>
            <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>
              <input
                type="checkbox"
                checked={selectedAllVideos}
                onChange={handleSelectAllVideos}
                ref={input => {
                  if (input) input.indeterminate = selectedSomeVideos;
                }}
              />
            </th>
            <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>
              Title
            </th>
            <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>
              Conference
            </th>
            <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>
              Status
            </th>
            <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>
              Date
            </th>
            <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {videos.map((video) => {
            const isVideoSelected = selectedVideos.includes(video.id);
            return (
              <tr 
                key={video.id}
                style={{ 
                  backgroundColor: isVideoSelected ? '#f0f8ff' : 'transparent',
                  borderBottom: '1px solid #dee2e6'
                }}
              >
                <td style={{ padding: '1rem' }}>
                  <input
                    type="checkbox"
                    checked={isVideoSelected}
                    onChange={(event) => handleSelectOneVideo(event, video.id)}
                  />
                </td>
                <td style={{ padding: '1rem', fontWeight: '500' }}>
                  {video.title}
                </td>
                <td style={{ padding: '1rem', color: '#666' }}>
                  {video.conference}
                </td>
                <td style={{ padding: '1rem' }}>
                  {getStatusLabel(video.status)}
                </td>
                <td style={{ padding: '1rem', color: '#666' }}>
                  {new Date(video.createdAt).toLocaleDateString()}
                </td>
                <td style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button style={{
                      padding: '0.25rem 0.5rem',
                      backgroundColor: '#007bff',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.875rem'
                    }}>
                      Edit
                    </button>
                    <button style={{
                      padding: '0.25rem 0.5rem',
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.875rem'
                    }}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RecentOrdersTable;
