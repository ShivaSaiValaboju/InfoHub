import React from 'react';

const LoadingOverlay = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: 'var(--bg-primary)',
      color: 'var(--text-primary)',
      textAlign: 'center',
      padding: '0.5rem',
      zIndex: 1000,
      animation: 'slideDown 0.3s ease-out'
    }}>
      Server is waking up... Please wait a moment.
    </div>
  );
};

export default LoadingOverlay;