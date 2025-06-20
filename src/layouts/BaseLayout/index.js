import { Outlet } from 'react-router-dom';

const BaseLayout = ({ children }) => {
  return (
    <div style={{ flex: 1, height: '100%' }}>
      {children || <Outlet />}
    </div>
  );
};

export default BaseLayout;
