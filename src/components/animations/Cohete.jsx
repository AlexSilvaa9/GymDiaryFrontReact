import React from 'react';
import Spline from '@splinetool/react-spline';

const Cohete = () => {
  return (
    <main style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <div style={{ width: '100%', height: '100%', pointerEvents: 'none' }}>
        <Spline 
          scene="https://prod.spline.design/2Gw3ave4TpA0dK6x/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </main>
  );
};

export default Cohete;
