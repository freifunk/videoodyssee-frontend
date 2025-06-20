import React from 'react';

const HeaderMenu = () => {
  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    }}>
      <a 
        href="/dashboard" 
        style={{
          textDecoration: 'none',
          color: '#333',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          transition: 'background-color 0.2s'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#f8f9fa'}
        onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
      >
        Dashboard
      </a>
      <a 
        href="/applications" 
        style={{
          textDecoration: 'none',
          color: '#333',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          transition: 'background-color 0.2s'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#f8f9fa'}
        onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
      >
        Applications
      </a>
    </nav>
  );
};

export default HeaderMenu;
