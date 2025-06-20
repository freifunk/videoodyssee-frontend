import React from 'react';

const Scrollbar = ({ children, ...rest }) => {
  return (
    <div
      {...rest}
      style={{
        overflow: 'auto',
        ...rest.style
      }}
    >
      {children}
    </div>
  );
};

export default Scrollbar;
