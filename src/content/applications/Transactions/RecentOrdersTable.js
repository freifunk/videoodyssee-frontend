import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

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
    rejected: { text: 'Rejected', color: '#dc3545' },
    approved: { text: 'Approved', color: '#28a745' },
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
  const [selectedVideos] = useState([]);
  const selectedBulkActions = selectedVideos.length > 0;
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [filters, setFilters] = useState({
    status: null
  });

  const [err, setErr] = useState({ err: false, message: '' });
  const [success, setSuccess] = useState({ success: false, message: '' });
  const [videos, setVideos] = useState([]);

  const statusOptions = [
    {
      id: 'all',
      name: 'All'
    },
    {
      id: 'approved',
      name: 'Approved'
    },
    {
      id: 'pending',
      name: 'Pending'
    },
    {
      id: 'rejected',
      name: 'Rejected'
    }
  ];

  const handleApprove = async (event) => {
    console.log(event.currentTarget.id);
    event.preventDefault();
    try {
      let res = await fetch(`${process.env.REACT_APP_API_URL}/video/approve`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
          id: event.currentTarget.id
        }),
      });
      let resJson = await res.json();
      console.log(resJson);
      if (res.status === 202) {
        setSuccess({ success: true, message: resJson.data })
      } else {
        setErr({ err: "true", message: resJson.message });
        console.log(err, "got error");
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleReject = async (event) => {
    console.log(event.currentTarget.id);
    event.preventDefault();
    try {
      let res = await fetch(`${process.env.REACT_APP_API_URL}/video/reject`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
          id: event.currentTarget.id
        }),
      });
      let resJson = await res.json();
      console.log(resJson);
      if (res.status === 200) {
        setSuccess({ success: true, message: resJson.data })
        console.log(err, success);
      } else {
        setErr({ err: "true", message: resJson.message });
        console.log(err, "got error");
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleStatusChange = (e) => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  const filteredVideos = applyFilters(videos, filters);
  const paginatedVideos = applyPagination(filteredVideos, page, limit);

  useEffect(() => {
    const getVideos = async () => {
      try {
        let res = await fetch(`${process.env.REACT_APP_API_URL}/video/list`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          method: "POST",
          body: JSON.stringify({}),
        })
        let resJson = await res.json();
        setVideos(resJson.data)
      }
      catch (err) {
        console.log(err);
      }
    }
    getVideos();
  }, [success])

  // Snackbar component
  const Snackbar = ({ open, message, type, onClose }) => {
    if (!open) return null;
    
    const bgColor = type === 'success' ? '#28a745' : '#dc3545';
    
    return (
      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: bgColor,
        color: 'white',
        padding: '1rem',
        borderRadius: '4px',
        zIndex: 1000,
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <span>{message}</span>
        <button 
          onClick={onClose}
          style={{
            marginLeft: '10px',
            background: 'transparent',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          ×
        </button>
      </div>
    );
  };

  const totalPages = Math.ceil(filteredVideos.length / limit);

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <Snackbar
        open={success.success}
        message={success.message}
        type="success"
        onClose={() => setSuccess({ success: false })}
      />

      <Snackbar
        open={err.err}
        message={err.message}
        type="error"
        onClose={() => setErr({ err: false })}
      />

      {/* Header with filter */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem',
        borderBottom: '1px solid #dee2e6'
      }}>
        <h3 style={{ margin: 0 }}>Recent Videos</h3>
        <div style={{ width: '150px' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Status</label>
          <select
            value={filters.status || 'all'}
            onChange={handleStatusChange}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ced4da',
              borderRadius: '4px'
            }}
          >
            {statusOptions.map((statusOption) => (
              <option key={statusOption.id} value={statusOption.id}>
                {statusOption.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ backgroundColor: '#f8f9fa' }}>
          <tr>
            <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>
              Video Name
            </th>
            <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>
              Name
            </th>
            <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>
              Status
            </th>
            <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedVideos.map((video) => (
            <tr 
              key={video.id}
              style={{ 
                borderBottom: '1px solid #dee2e6'
              }}
            >
              <td style={{ padding: '1rem' }}>
                <div>
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#007bff',
                      textDecoration: 'none',
                      fontWeight: '500'
                    }}
                  >
                    {video.title}
                  </a>
                </div>
                <div style={{ fontSize: '0.875rem', color: '#666', marginTop: '0.25rem' }}>
                  {video.date ? format(new Date(video.date), 'MMMM dd yyyy') : ''}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#666' }}>
                  {languages[video.language]}
                </div>
              </td>
              <td style={{ padding: '1rem' }}>
                <div style={{ fontWeight: '500' }}>
                  {video.name}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#666' }}>
                  {video.email}
                </div>
              </td>
              <td style={{ padding: '1rem' }}>
                {getStatusLabel(video.status)}
              </td>
              <td style={{ padding: '1rem' }}>
                {video.status === "pending" ? (
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={handleApprove}
                      id={video.id}
                      style={{
                        padding: '0.25rem 0.5rem',
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.875rem'
                      }}
                      title="Approve Video"
                    >
                      Approve
                    </button>
                    <button
                      onClick={handleReject}
                      id={video.id}
                      style={{
                        padding: '0.25rem 0.5rem',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.875rem'
                      }}
                      title="Reject Video"
                    >
                      Reject
                    </button>
                  </div>
                ) : '---'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem',
        borderTop: '1px solid #dee2e6'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>Rows per page:</span>
          <select
            value={limit}
            onChange={handleLimitChange}
            style={{
              padding: '0.25rem',
              border: '1px solid #ced4da',
              borderRadius: '4px'
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={30}>30</option>
          </select>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>
            {page * limit + 1}-{Math.min((page + 1) * limit, filteredVideos.length)} of {filteredVideos.length}
          </span>
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 0}
            style={{
              padding: '0.25rem 0.5rem',
              backgroundColor: page === 0 ? '#f8f9fa' : '#007bff',
              color: page === 0 ? '#666' : 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: page === 0 ? 'not-allowed' : 'pointer'
            }}
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= totalPages - 1}
            style={{
              padding: '0.25rem 0.5rem',
              backgroundColor: page >= totalPages - 1 ? '#f8f9fa' : '#007bff',
              color: page >= totalPages - 1 ? '#666' : 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: page >= totalPages - 1 ? 'not-allowed' : 'pointer'
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentOrdersTable;
