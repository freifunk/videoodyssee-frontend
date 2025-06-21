import { useState, useEffect } from 'react';

const Transactions = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const token = localStorage.getItem('x-token');
        const res = await fetch(`${process.env.REACT_APP_API_URL}/video/list`, {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({})
        });
        const resJson = await res.json();
        setVideos(resJson.data || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem('x-token');
      await fetch(`${process.env.REACT_APP_API_URL}/video/approve`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id })
      });
      // Refresh list
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleReject = async (id) => {
    try {
      const token = localStorage.getItem('x-token');
      await fetch(`${process.env.REACT_APP_API_URL}/video/reject`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id })
      });
      // Refresh list
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Videos</h2>
      <p>Diese Videos wurden eingereicht und warten auf Freigabe.</p>
      
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8f9fa' }}>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Title</th>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Status</th>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Conference</th>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Date</th>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {videos.map((video, index) => (
              <tr key={video.id || index} style={{ borderBottom: '1px solid #f1f3f5' }}>
                <td style={{ padding: '1rem' }}>
                  <div>
                    <div style={{ fontWeight: 'bold' }}>{video.title}</div>
                    <div style={{ fontSize: '0.875rem', color: '#6c757d' }}>{video.subtitle}</div>
                  </div>
                </td>
                <td style={{ padding: '1rem' }}>
                  <span style={{
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    backgroundColor: video.status === 'approved' ? '#d4edda' : video.status === 'rejected' ? '#f8d7da' : '#fff3cd',
                    color: video.status === 'approved' ? '#155724' : video.status === 'rejected' ? '#721c24' : '#856404'
                  }}>
                    {video.status === 'approved' ? 'Approved' : video.status === 'rejected' ? 'Rejected' : 'Pending'}
                  </span>
                </td>
                <td style={{ padding: '1rem' }}>{video.conference}</td>
                <td style={{ padding: '1rem' }}>{video.date}</td>
                <td style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => handleApprove(video.id)}
                      style={{
                        padding: '0.25rem 0.5rem',
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.75rem'
                      }}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(video.id)}
                      style={{
                        padding: '0.25rem 0.5rem',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.75rem'
                      }}
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {videos.length === 0 && (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#6c757d' }}>
          Keine Videos gefunden.
        </div>
      )}
    </div>
  );
};

export default Transactions;
