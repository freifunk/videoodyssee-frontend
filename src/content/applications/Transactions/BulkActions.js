import React, { useState } from 'react';

const BulkActions = () => {
  const [onMenuOpen, setOnMenuOpen] = useState(false);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      padding: '1rem',
      backgroundColor: '#f8f9fa',
      borderRadius: '4px',
      marginBottom: '1rem'
    }}>
      <span style={{ color: '#666' }}>
        Bulk actions:
      </span>
      <div style={{ position: 'relative' }}>
        <button
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
          onClick={() => setOnMenuOpen(!onMenuOpen)}
        >
          Actions
        </button>
        {onMenuOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            backgroundColor: 'white',
            border: '1px solid #ddd',
            borderRadius: '4px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            zIndex: 1000,
            minWidth: '150px'
          }}>
            <button style={{
              display: 'block',
              width: '100%',
              padding: '0.5rem 1rem',
              border: 'none',
              backgroundColor: 'transparent',
              textAlign: 'left',
              cursor: 'pointer'
            }}>
              Delete
            </button>
            <button style={{
              display: 'block',
              width: '100%',
              padding: '0.5rem 1rem',
              border: 'none',
              backgroundColor: 'transparent',
              textAlign: 'left',
              cursor: 'pointer'
            }}>
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BulkActions;
