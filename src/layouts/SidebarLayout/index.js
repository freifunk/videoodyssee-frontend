import { Outlet } from 'react-router-dom';
import './SidebarLayout.css';

const SidebarLayout = () => {
  return (
    <div className="sidebar-layout">
      <div className="sidebar">
        <div className="sidebar-header">
          <h3>Dashboard</h3>
        </div>
        <nav className="sidebar-nav">
          <a href="/dashboard/videos" className="nav-link">Videos</a>
          <a href="/dashboard/profile" className="nav-link">Profile</a>
        </nav>
      </div>
      <div className="main-content">
        <header className="header">
          <h1>Videoodyssee Dashboard</h1>
          <button onClick={() => {
            localStorage.removeItem('x-token');
            window.location.href = '/dashboard/login';
          }}>
            Logout
          </button>
        </header>
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SidebarLayout;
