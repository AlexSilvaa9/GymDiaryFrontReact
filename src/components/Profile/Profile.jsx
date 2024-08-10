import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Estilo para el contenedor principal
const ProfileContainer = styled.div`
  display: flex;
  margin: 0 auto;
  padding: 20px;
  background-color: ${({ theme }) => theme.background};
`;

// Estilo para el panel de navegación
const Sidebar = styled.div`
  flex: 1;
  max-width: 250px;
  border-right: 1px solid #e1e4e8;
  padding-right: 20px;
`;

// Estilo para los ítems del panel de navegación
const SidebarItem = styled.div`
  padding: 10px;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  &:hover {
    background-color: ${({ theme }) => theme.terciary};
  }
  background-color: ${({ active }) => (active ? ({ theme }) => theme.secondary : 'transparent')};
`;

// Estilo para el área de contenido
const Content = styled.div`
  flex: 3;
  padding-left: 20px;
`;

// Estilo para los encabezados de las secciones
const SectionHeader = styled.h2`
  margin-top: 0;
  font-size: 1.5em;
  border-bottom: 1px solid #e1e4e8;
  padding-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

// Estilo para los inputs y botones
const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #e1e4e8;
  border-radius: 6px;
  font-size: 1em;
  color: ${({ theme }) => theme.secondaryText};
`;

const Button = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.text};
  font-size: 1em;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.terciary};
  }
`;

// Estilo para los mensajes de error
const ErrorMessage = styled.p`
  color: red;
  font-size: 0.875em;
`;
// Estilo para los mensajes de error
const TextContent = styled.p`
  color: ${({ theme }) => theme.secondaryText};

`;

const Profile = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Simular autenticación
  const [user, setUser] = useState({ email: '', username: '' });
  const [errors, setErrors] = useState({});
  const [activeSection, setActiveSection] = useState('profile');
  const navigate = useNavigate();

  useEffect(() => {
    // Simular la comprobación de autenticación
    const checkAuthentication = () => {
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

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div>
            <SectionHeader>Perfil</SectionHeader>
            <form onSubmit={handleSubmit}>
              <Input
                type="text"
                name="username"
                value={user.username}
                onChange={handleChange}
                placeholder="Nombre de usuario"
              />
              {errors.username && <ErrorMessage>{errors.username}</ErrorMessage>}
              <Input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Correo electrónico"
              />
              {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
              <Button type="submit">Actualizar perfil</Button>
            </form>
          </div>
        );
      case 'security':
        return (
          <div>
            <SectionHeader>Seguridad</SectionHeader>
            <TextContent>Aquí puedes cambiar tu contraseña y ajustar configuraciones de seguridad.</TextContent>
            {/* Implementa aquí la sección de seguridad */}
          </div>
        );
      case 'preferences':
        return (
          <div>
            <SectionHeader>Preferencias</SectionHeader>
            <TextContent>Ajusta tus preferencias de notificaciones y otros ajustes personales.</TextContent>
            {/* Implementa aquí la sección de preferencias */}
          </div>
        );
      case 'account':
        return (
          <div>
            <SectionHeader>Cuenta</SectionHeader>
            <TextContent>Configura detalles adicionales sobre tu cuenta.</TextContent>
            {/* Implementa aquí la sección de detalles de la cuenta */}
          </div>
        );
      default:
        return <div>Select a section from the left.</div>;
    }
  };

  return (
    <ProfileContainer>
      <Sidebar>
        <SidebarItem
          active={activeSection === 'profile'}
          onClick={() => setActiveSection('profile')}
        >
          Perfil
        </SidebarItem>
        <SidebarItem
          active={activeSection === 'security'}
          onClick={() => setActiveSection('security')}
        >
          Seguridad
        </SidebarItem>
        <SidebarItem
          active={activeSection === 'preferences'}
          onClick={() => setActiveSection('preferences')}
        >
          Preferencias
        </SidebarItem>
        <SidebarItem
          active={activeSection === 'account'}
          onClick={() => setActiveSection('account')}
        >
          Cuenta
        </SidebarItem>
      </Sidebar>
      <Content>
        {renderContent()}
      </Content>
    </ProfileContainer>
  );
};

export default Profile;
