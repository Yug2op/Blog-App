import React from 'react';

function Logo({ width = '100px' }) {
  return (
    <div className="flex items-center justify-center">
      <div
        className="font-bold text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl 
                   hover:text-blue-400 transition-all duration-200"
        style={{
          width: width,
          height: width,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        LOGO
      </div>
    </div>
  );
}

export default Logo;
