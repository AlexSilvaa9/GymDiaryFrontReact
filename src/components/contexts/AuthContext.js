import React, { createContext, useState, useEffect } from 'react';

// Crear el contexto de autenticación
const AuthContext = createContext();

const API_URL = 'http://127.0.0.1:5000'; // Cambia esta URL según tu configuración

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    const verifyToken = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          const response = await fetch(`${API_URL}/verify-token`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${storedToken}`
            }
          });
          

          if (response.ok) {
            const data = await response.json();
            setUser({ token: storedToken, user: data });
          } else {
            localStorage.removeItem('token');
          }
        } catch (error) {
          console.error('Error verifying token:', error);
          localStorage.removeItem('token');
        }
      }
      setLoading(false); // Cambiar el estado de carga a false cuando se complete la verificación
    };

    verifyToken();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        setUser({ token: data.token, user: data.user });
      } else {
        const data = await response.json();
        throw new Error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
