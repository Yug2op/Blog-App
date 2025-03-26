import React from 'react';

function Logo({ width = '100px' }) {
  return (
    <div className="flex items-center justify-center">
      <div
        className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl"
        style={{
          width: width,
          height: width,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span style={{
          color:'yellow',
        }}>B</span>
        <span style={{
          color:'orange',
        }}>L</span>
        <span style={{
          color:'pink',
        }}>O</span>
        <span style={{
          color:'lightgreen',
        }}>G</span>
        <span style={{
          color:'black',
          fontSize:'2rem',
          margin:'0px 0px 8px 0px'
        }}>.</span>
        
      </div>
    </div>
  );
}

export default Logo;
