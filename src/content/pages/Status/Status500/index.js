import React from 'react';

const Status500 = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <h1 style={{
        fontSize: '6rem',
        fontWeight: 'bold',
        color: '#dc3545',
        margin: '0 0 1rem 0'
      }}>
        500
      </h1>
      <h2 style={{
        fontSize: '2rem',
        margin: '0 0 1rem 0',
        color: '#333'
      }}>
        Internal Server Error
      </h2>
      <p style={{
        fontSize: '1.2rem',
        color: '#666',
        maxWidth: '600px',
        margin: '0 0 2rem 0'
      }}>
        The server encountered an internal error and was unable to complete your request.
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

export default Status500;
