import React from 'react';

const PageTitle = ({ heading, subHeading, ...rest }) => {
  return (
    <div {...rest} style={{ marginBottom: '2rem', ...rest.style }}>
      <h1 style={{
        fontSize: '2rem',
        fontWeight: 'bold',
        margin: '0 0 0.5rem 0',
        color: '#333'
      }}>
        {heading}
      </h1>
      {subHeading && (
        <p style={{
          margin: 0,
          color: '#666',
          fontSize: '1rem'
        }}>
          {subHeading}
        </p>
      )}
    </div>
  );
};

export default PageTitle;
