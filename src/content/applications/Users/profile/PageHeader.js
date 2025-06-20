import React from 'react';

const PageHeader = () => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '2rem'
    }}>
      <div>
        <h1 style={{ 
          fontSize: '2rem', 
          fontWeight: 'bold', 
          margin: '0 0 0.5rem 0',
          color: '#333'
        }}>
          User Profile
        </h1>
        <p style={{ 
          margin: 0, 
          color: '#666',
          fontSize: '1rem'
        }}>
          Manage your personal information and preferences
        </p>
      </div>
    </div>
  );
};

export default PageHeader;