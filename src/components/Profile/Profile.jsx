// src/components/Profile/Profile.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useAuth from '../contexts/useAuth'; // Asegúrate de que la ruta sea correcta

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

const Content = styled.div`
  flex: 3;
  padding-left: 20px;
  margin-top: 20px;
  
  @media (min-width: 768px) {
    margin-left: 20px;
    margin-top: 0;
  }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  
  @media (min-width: 768px) {
    width: 75%; /* Ajusta el ancho del formulario en pantallas más grandes */
  }
`;

const SectionHeader = styled.h2`
  margin-top: 0;
  font-size: 1.5em;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  padding-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

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

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.875em;
`;

const TextContent = styled.p`
  color: ${({ theme }) => theme.secondaryText};
`;

const Profile = () => {
  const { user, logout } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState({ email: '', username: '' });
  const [errors, setErrors] = useState({});
  const [activeSection, setActiveSection] = useState('profile');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (user) {
        setIsAuthenticated(true);
        try {
          const response = await fetch('http://127.0.0.1:5000/users/me', { // Cambia esta URL según tu configuración
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${user.token}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            setUserInfo({ email: data.email, username: data.username });
          } else {
            console.error('Error fetching user info');
          }
        } catch (error) {
          console.error('Error fetching user info:', error);
        }
      } else {
        setIsAuthenticated(false);
        navigate('/login'); // Redirige a login si no está autenticado
      }
    };

    fetchUserInfo();
  }, [navigate, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!userInfo.email) newErrors.email = 'Email is required';
    if (!userInfo.username) newErrors.username = 'Username is required';
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch('http://127.0.0.1:5000/users/me', { // Cambia esta URL según tu configuración
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`,
          },
          body: JSON.stringify(userInfo),
        });
        if (response.ok) {
          console.log('Profile updated successfully');
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to update profile');
        }
      } catch (error) {
        console.error('Update error:', error);
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirige al usuario a la página de inicio de sesión
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
                  value={userInfo.username}
                  onChange={handleChange}
                  placeholder="Username"
                />
                {errors.username && <ErrorMessage>{errors.username}</ErrorMessage>}
              </InputContainer>
              <InputContainer>
                <input
                  type="email"
                  name="email"
                  value={userInfo.email}
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
        <SidebarItem onClick={handleLogout}>
          Logout
        </SidebarItem>
      </Sidebar>
      <Content>
        {renderContent()}
      </Content>
    </ProfileContainer>
  );
};

export default Profile;
