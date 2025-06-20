import React from 'react';

const ComingSoon = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      textAlign: 'center',
      padding: '2rem',
      backgroundColor: '#f8f9fa'
    }}>
      <h1 style={{
        fontSize: '4rem',
        fontWeight: 'bold',
        color: '#007bff',
        margin: '0 0 1rem 0'
      }}>
        Coming Soon
      </h1>
      <p style={{
        fontSize: '1.5rem',
        color: '#666',
        maxWidth: '600px',
        margin: '0 0 2rem 0'
      }}>
        We're working hard to bring you something amazing. Stay tuned!
      </p>
      <button
        style={{
          padding: '0.75rem 2rem',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontSize: '1rem',
          cursor: 'pointer'
        }}
        onClick={() => window.location.href = '/'}
      >
        Go back to homepage
      </button>
    </div>
  );
};

export default ComingSoon;
