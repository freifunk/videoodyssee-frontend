import React from 'react';
import SidebarMenu from './SidebarMenu';
import Scrollbar from 'src/components/Scrollbar';

const Sidebar = () => {
  return (
    <aside style={{
      width: '280px',
      backgroundColor: '#f8f9fa',
      borderRight: '1px solid #dee2e6',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 999
    }}>
      <div style={{
        padding: '1rem',
        borderBottom: '1px solid #dee2e6',
        backgroundColor: 'white'
      }}>
        <h2 style={{
          margin: 0,
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#007bff'
        }}>
          Videoodyssee
        </h2>
      </div>
      
      <Scrollbar style={{ height: 'calc(100vh - 80px)' }}>
        <div style={{ padding: '1rem' }}>
          <SidebarMenu />
        </div>
      </Scrollbar>
    </aside>
  );
};

export default Sidebar;
