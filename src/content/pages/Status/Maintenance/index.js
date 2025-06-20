import React from 'react';

const Maintenance = () => {
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
        color: '#ffc107',
        margin: '0 0 1rem 0'
      }}>
        Under Maintenance
      </h1>
      <p style={{
        fontSize: '1.5rem',
        color: '#666',
        maxWidth: '600px',
        margin: '0 0 2rem 0'
      }}>
        We're currently performing scheduled maintenance. Please check back soon!
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
        onClick={() => window.location.reload()}
      >
        Refresh Page
      </button>
    </div>
  );
};

export default Maintenance;
