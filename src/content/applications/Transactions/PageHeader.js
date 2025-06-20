import React from 'react';

const PageHeader = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem'
    }}>
      <div>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          margin: '0 0 0.5rem 0',
          color: '#333'
        }}>
          Recent Transactions
        </h1>
        <p style={{
          margin: 0,
          color: '#666',
          fontSize: '1rem'
        }}>
          All aspects related to the app transactions can be managed from this page
        </p>
      </div>
    </div>
  );
};

export default PageHeader;
