import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from './contexts/useAuth';

const ProtectedRoute = ({ element }) => {
  const { user, loading } = useAuth();

  // Muestra un loader o nada mientras la autenticación está siendo verificada
  if (loading) {
    return <div>Loading...</div>; // O un spinner, mensaje de espera, etc.
  }

  // Si el usuario está autenticado, renderiza el componente, si no, redirige a login
  return user ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
