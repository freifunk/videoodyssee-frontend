import React from 'react';

const UserSettings = () => {
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
          User Settings
        </h1>
        <p style={{ 
          margin: '0 0 2rem 0', 
          color: '#666',
          fontSize: '1rem'
        }}>
          Configure your account settings and preferences
        </p>
        
        <div style={{ display: 'grid', gap: '2rem', maxWidth: '400px' }}>
          <div>
            <h3 style={{ marginBottom: '1rem', color: '#333' }}>Notifications</h3>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="checkbox" defaultChecked />
              Email notifications
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
              <input type="checkbox" />
              Push notifications
            </label>
          </div>
          
          <div>
            <h3 style={{ marginBottom: '1rem', color: '#333' }}>Language</h3>
            <select style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}>
              <option value="en">English</option>
              <option value="de">Deutsch</option>
              <option value="fr">Français</option>
            </select>
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
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
