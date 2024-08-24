
import React, { useState } from 'react';
import Spline from '@splinetool/react-spline';
import Grafico from '../../Assets/tiesos.splinecode'; // Asegúrate de que la ruta sea correcta

const CoheteLight = () => {
  const [loading, setLoading] = useState(true);

  const handleLoad = () => {
    console.log("Spline scene loaded successfully");
    setLoading(false);
  };

  const handleError = () => {
    console.error("Failed to load Spline scene");
    setLoading(false);
  };

  return (
    <main style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {loading && <div style={{ textAlign: 'center', marginTop: '20%' }}>Loading...</div>}
      
        <Spline 
          scene={Grafico}
          style={{ width: '100%', height: '100%' }}
          onLoad={handleLoad}
          onError={handleError}
        />
     
    </main>
  );
};

export default CoheteLight;
