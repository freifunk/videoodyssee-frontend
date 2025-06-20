import React from 'react';

const UserProfile = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ 
          fontSize: '2rem', 
          fontWeight: 'bold', 
          margin: '0 0 1rem 0',
          color: '#333'
        }}>
          User Profile
        </h1>
        <p style={{ 
          margin: '0 0 2rem 0', 
          color: '#666',
          fontSize: '1rem'
        }}>
          Manage your personal information and preferences
        </p>
        
        <div style={{ display: 'grid', gap: '1rem', maxWidth: '400px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Name
            </label>
            <input 
              type="text" 
              defaultValue="Andi Braeu"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Email
            </label>
            <input 
              type="email" 
              defaultValue="andi@example.com"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
          </div>
          
          <button style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '1rem'
          }}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
