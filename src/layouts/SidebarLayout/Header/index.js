import React from 'react';
import HeaderButtons from './Buttons';
import HeaderUserbox from './Userbox';
import HeaderMenu from './Menu';

const Header = () => {
  return (
    <header style={{
      backgroundColor: 'white',
      borderBottom: '1px solid #dee2e6',
      padding: '0 1rem',
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <div style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#007bff'
        }}>
          Videoodyssee
        </div>
        <HeaderMenu />
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <HeaderButtons />
        <HeaderUserbox />
      </div>
    </header>
  );
};

export default Header;
