import React from 'react';

const Text = ({ color = 'primary', children, ...rest }) => {
  const colorMap = {
    primary: '#007bff',
    secondary: '#6c757d',
    success: '#28a745',
    warning: '#ffc107',
    error: '#dc3545',
    info: '#17a2b8',
    black: '#000',
    white: '#fff'
  };

  return (
    <span
      {...rest}
      style={{
        color: colorMap[color] || colorMap.primary,
        ...rest.style
      }}
    >
      {children}
    </span>
  );
};

export default Text;
