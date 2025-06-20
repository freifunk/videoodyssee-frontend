import React from 'react';

const Label = ({ color = 'primary', children, ...rest }) => {
  const colorMap = {
    primary: '#007bff',
    secondary: '#6c757d',
    success: '#28a745',
    warning: '#ffc107',
    error: '#dc3545',
    info: '#17a2b8'
  };

  return (
    <span
      {...rest}
      style={{
        backgroundColor: colorMap[color] || colorMap.primary,
        color: 'white',
        padding: '0.25rem 0.5rem',
        borderRadius: '4px',
        fontSize: '0.875rem',
        fontWeight: '500',
        display: 'inline-block',
        ...rest.style
      }}
    >
      {children}
    </span>
  );
};

export default Label;
