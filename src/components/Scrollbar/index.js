import PropTypes from 'prop-types';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { useTheme } from '@mui/material';

// Import OverlayScrollbars CSS
import 'overlayscrollbars/overlayscrollbars.css';

const Scrollbar = ({ className, children, ...rest }) => {
  const theme = useTheme();

  // OverlayScrollbars configuration
  const osOptions = {
    scrollbars: {
      theme: 'os-theme-dark',
      autoHide: 'move',
      autoHideDelay: 1300,
    },
    overflow: {
      x: 'scroll',
      y: 'scroll'
    }
  };

  // Custom styling to match the previous design
  const osStyles = {
    '--os-size': '5px',
    '--os-padding-perpendicular': '2px',
    '--os-padding-axis': '2px',
    '--os-track-border-radius': theme.general?.borderRadiusLg || '8px',
    '--os-track-bg': 'transparent',
    '--os-track-bg-hover': 'transparent',
    '--os-track-bg-active': 'transparent',
    '--os-track-border': 'none',
    '--os-handle-border-radius': theme.general?.borderRadiusLg || '8px',
    '--os-handle-bg': theme.colors?.alpha?.black?.[10] || 'rgba(0, 0, 0, 0.1)',
    '--os-handle-bg-hover': theme.colors?.alpha?.black?.[30] || 'rgba(0, 0, 0, 0.3)',
    '--os-handle-bg-active': theme.colors?.alpha?.black?.[30] || 'rgba(0, 0, 0, 0.3)',
    '--os-handle-border': 'none',
    '--os-handle-min-size': '30px',
    '--os-handle-max-size': 'none'
  };

  return (
    <OverlayScrollbarsComponent
      className={className}
      options={osOptions}
      style={osStyles}
      {...rest}
    >
      {children}
    </OverlayScrollbarsComponent>
  );
};

Scrollbar.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default Scrollbar;
