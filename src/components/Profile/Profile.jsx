import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Contenedor principal para el perfil
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: ${({ theme }) => theme.background};
  padding: 20px;
  
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

// Estilo para la barra lateral
const Sidebar = styled.nav`
  flex: 1;
  max-width: 200px;
  border-right: 1px solid ${({ theme }) => theme.border};
  padding-right: 20px;
  margin-bottom: 20px;
  
  @media (min-width: 768px) {
    position: sticky;
    top: 0;
    margin-bottom: 0;
  }
`;

// Estilo para los elementos de la barra lateral
const SidebarItem = styled.div`
  padding: 10px;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  background: ${({ active, theme }) => active ? theme.secondary : 'transparent'};
  border-radius: 4px;
  transition: background 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.tertiary};
  }
`;

// Contenido principal
const Content = styled.div`
  flex: 3;
  padding-left: 20px;
  margin-top: 20px;
  
  @media (min-width: 768px) {
    margin-left: 20px;
    margin-top: 0;
  }
`;

// Contenedor de formulario
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  
  @media (min-width: 768px) {
    width: 75%; /* Ajusta el ancho del formulario en pantallas más grandes */
  }
`;

// Encabezado de sección
const SectionHeader = styled.h2`
  margin-top: 0;
  font-size: 1.5em;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  padding-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

// Campos de entrada
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px; /* Incrementar el espacio entre campos */
  
  & > input {
    width: 100%;
    max-width: 300px; /* Limita el ancho máximo del campo de entrada */
    padding: 6px 10px;
    margin-top: 10px;
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 4px;
    font-size: 0.875em;
    color: ${({ theme }) => theme.text};
    background: ${({ theme }) => theme.backgroundInput};
    box-sizing: border-box; /* Asegura que padding y border se incluyan en el width */
  }
`;

// Botones
const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.text};
  font-size: 0.875em;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.tertiary};
  }
`;

// Mensajes de error
const ErrorMessage = styled.p`
  color: red;
  font-size: 0.875em;
`;

// Contenidos de texto
const TextContent = styled.p`
  color: ${({ theme }) => theme.secondaryText};
`;

const Profile = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({ email: '', username: '' });
  const [errors, setErrors] = useState({});
  const [activeSection, setActiveSection] = useState('profile');
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = () => {
      const userData = { email: 'user@example.com', username: 'john_doe' };
      if (userData) {
        setIsAuthenticated(true);
        setUser(userData);
      } else {
        setIsAuthenticated(false);
        navigate('/login');
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
    if (!user.email) newErrors.email = 'Email is required';
    if (!user.username) newErrors.username = 'Username is required';
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('Profile updated:', user);
    }
  };

  if (!isAuthenticated) return null;

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <FormContainer>
            <SectionHeader>Profile</SectionHeader>
            <form onSubmit={handleSubmit}>
              <InputContainer>
                <input
                  type="text"
                  name="username"
                  value={user.username}
                  onChange={handleChange}
                  placeholder="Username"
                />
                {errors.username && <ErrorMessage>{errors.username}</ErrorMessage>}
              </InputContainer>
              <InputContainer>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
                {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
              </InputContainer>
              <Button type="submit">Update Profile</Button>
            </form>
          </FormContainer>
        );
      case 'security':
        return (
          <div>
            <SectionHeader>Security</SectionHeader>
            <TextContent>Change your password and adjust security settings here.</TextContent>
          </div>
        );
      case 'preferences':
        return (
          <div>
            <SectionHeader>Preferences</SectionHeader>
            <TextContent>Adjust your notification preferences and other settings here.</TextContent>
          </div>
        );
      case 'account':
        return (
          <div>
            <SectionHeader>Account</SectionHeader>
            <TextContent>Configure additional details about your account here.</TextContent>
          </div>
        );
      default:
        return <div>Select a section from the sidebar.</div>;
    }
  };

  return (
    <ProfileContainer>
      <Sidebar>
        <SidebarItem
          active={activeSection === 'profile'}
          onClick={() => setActiveSection('profile')}
        >
          Profile
        </SidebarItem>
        <SidebarItem
          active={activeSection === 'security'}
          onClick={() => setActiveSection('security')}
        >
          Security
        </SidebarItem>
        <SidebarItem
          active={activeSection === 'preferences'}
          onClick={() => setActiveSection('preferences')}
        >
          Preferences
        </SidebarItem>
        <SidebarItem
          active={activeSection === 'account'}
          onClick={() => setActiveSection('account')}
        >
          Account
        </SidebarItem>
      </Sidebar>
      <Content>
        {renderContent()}
      </Content>
    </ProfileContainer>
  );
};

export default Profile;
