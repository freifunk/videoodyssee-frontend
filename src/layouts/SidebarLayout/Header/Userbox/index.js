import React, { useState } from 'react';

const UserBoxButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      <button
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          backgroundColor: '#007bff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold'
        }}>
          A
        </div>
        <span style={{ color: '#333' }}>Andi Braeu</span>
      </button>
      
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          backgroundColor: 'white',
          border: '1px solid #ddd',
          borderRadius: '4px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          zIndex: 1000,
          minWidth: '200px'
        }}>
          <div style={{ padding: '1rem', borderBottom: '1px solid #eee' }}>
            <div style={{ fontWeight: 'bold' }}>Andi Braeu</div>
            <div style={{ color: '#666', fontSize: '0.875rem' }}>Administrator</div>
          </div>
          <div>
            <button style={{
              display: 'block',
              width: '100%',
              padding: '0.75rem 1rem',
              border: 'none',
              backgroundColor: 'transparent',
              textAlign: 'left',
              cursor: 'pointer'
            }}>
              My Profile
            </button>
            <button style={{
              display: 'block',
              width: '100%',
              padding: '0.75rem 1rem',
              border: 'none',
              backgroundColor: 'transparent',
              textAlign: 'left',
              cursor: 'pointer'
            }}>
              Account Settings
            </button>
            <hr style={{ margin: '0.5rem 0', border: 'none', borderTop: '1px solid #eee' }} />
            <button style={{
              display: 'block',
              width: '100%',
              padding: '0.75rem 1rem',
              border: 'none',
              backgroundColor: 'transparent',
              textAlign: 'left',
              cursor: 'pointer',
              color: '#dc3545'
            }}>
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserBoxButton;
