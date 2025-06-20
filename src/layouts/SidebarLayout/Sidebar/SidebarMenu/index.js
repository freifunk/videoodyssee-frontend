import React from 'react';
import { NavLink } from 'react-router-dom';

const SidebarMenu = () => {
  const menuItems = [
    { path: '/', label: 'Form', icon: '📝' },
    { path: '/management/transactions', label: 'Videos', icon: '🎥' },
    { path: '/management/profile', label: 'Profile', icon: '👤' },
    { path: '/status', label: 'Status Pages', icon: '📊' }
  ];

  return (
    <nav style={{ padding: '1rem 0' }}>
      {menuItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 1rem',
            textDecoration: 'none',
            color: isActive ? '#007bff' : '#333',
            backgroundColor: isActive ? '#e3f2fd' : 'transparent',
            borderRadius: '4px',
            margin: '0.25rem 0',
            transition: 'all 0.2s'
          })}
        >
          <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default SidebarMenu;
