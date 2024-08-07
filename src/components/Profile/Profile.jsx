import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../../styles/colors';

// Estilo para el contenedor principal del perfil
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background-color: ${colors.background};
  color: ${colors.text};
  padding: 2rem;
`;

// Estilo para el formulario del perfil
const ProfileForm = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 500px;
  text-align: center;
`;

// Estilo para los títulos
const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: ${colors.text};
`;

// Estilo para los campos del formulario
const Input = styled.input`
  background-color: ${colors.primary};
  border: none;
  border-radius: 5px;
  color: ${colors.text};
  padding: 0.75rem;
  font-size: 1rem;
  margin-bottom: 1rem;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease;
  
  &:focus {
    outline: none;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
  }
`;

// Estilo para el botón
const Button = styled.button`
  background-color: ${colors.primary};
  color: ${colors.text};
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  opacity: 0.9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);

  &:hover {
    background-color: ${colors.secondary};
    opacity: 1;
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.4);
  }
`;

// Estilo para los mensajes de error
const ErrorMessage = styled.p`
  color: red;
`;

const Profile = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Simular autenticación
  const [user, setUser] = useState({ email: '', username: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Simular la comprobación de autenticación
    const checkAuthentication = () => {
      // Reemplaza esto con la lógica real de autenticación
      const userData = { email: 'user@example.com', username: 'john_doe' }; // Simulación de datos del usuario
      if (userData) {
        setIsAuthenticated(true);
        setUser(userData);
      } else {
        setIsAuthenticated(false);
        navigate('/login'); // Redirigir a login si no está autenticado
      }
    };

    checkAuthentication();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar y guardar cambios
    const newErrors = {};
    if (user.email === '') {
      newErrors.email = 'Email is required';
    }
    if (user.username === '') {
      newErrors.username = 'Username is required';
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('Profile updated:', user);
      // Aquí puedes agregar lógica para actualizar los datos del usuario
    }
  };

  if (!isAuthenticated) return null; // No renderizar si no está autenticado

  return (
    <ProfileContainer>
      <ProfileForm>
        <Title>User Profile</Title>
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
          />
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          
          <Input
            type="text"
            name="username"
            placeholder="Username"
            value={user.username}
            onChange={handleChange}
          />
          {errors.username && <ErrorMessage>{errors.username}</ErrorMessage>}
          
          <Button type="submit">Update Profile</Button>
        </form>
      </ProfileForm>
    </ProfileContainer>
  );
};

export default Profile;
