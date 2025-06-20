import React from 'react';

const HeaderButtons = ({ children }) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    }}>
      {children}
    </div>
  );
};

export default HeaderButtons;
