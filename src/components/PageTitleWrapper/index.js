import React from 'react';
import PropTypes from 'prop-types';

const PageTitleWrapper = ({ children }) => {
  return (
    <div style={{
      backgroundColor: 'white',
      padding: '1.5rem',
      marginBottom: '1rem',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      {children}
    </div>
  );
};

PageTitleWrapper.propTypes = {
  children: PropTypes.node.isRequired
};

export default PageTitleWrapper;
