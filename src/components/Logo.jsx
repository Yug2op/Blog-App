import React from 'react';

function Logo({ width = '100px' }) {
  return (
    <div className="flex items-center justify-center">
      <div
        className="text-2xl font-bold text-white text-2xl font-bold text-white hover:text-blue-400"
        style={{ width: width, height: width, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        LOGO
      </div>
    </div>
  );
}

export default Logo;
