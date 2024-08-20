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
  background: ${({ active, theme }) => (active ? theme.secondary : 'transparent')};
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
    width: 75%;
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
  margin-bottom: 15px;

  & > label {
    margin-bottom: 5px;
    font-weight: bold;
    color: ${({ theme }) => theme.text};
  }

  & > input {
    width: 100%;
    padding: 6px 10px;
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 4px;
    font-size: 0.875em;
    color: ${({ theme }) => theme.text};
    background: ${({ theme }) => theme.backgroundInput};
    box-sizing: border-box;
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
  margin-top: 5px;
`;
const API_URL = process.env.REACT_APP_SERVER_NAME; // Usa REACT_APP_ como prefijo

const Profile = () => {
  const { user, logout } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: '',
    username: '',
    first_name: '',
    last_name: '',
    phone: '',
    date_of_birth: '',
    address: ''
  });
  const [tempUserInfo, setTempUserInfo] = useState({}); // Estado temporal para los campos del formulario
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [activeSection, setActiveSection] = useState('profile');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (user) {
        setIsAuthenticated(true);
        try {
          const response = await fetch(`${API_URL}/users/me`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setUserInfo({
              email: data.email || '',
              username: data.username || '',
              first_name: data.first_name || '',
              last_name: data.last_name || '',
              phone: data.phone || '',
              date_of_birth: data.date_of_birth || '',
              address: data.address || ''
            });

            // Inicializar tempUserInfo con los valores actuales del usuario
            setTempUserInfo({
              email: data.email || '',
              username: data.username || '',
              first_name: data.first_name || '',
              last_name: data.last_name || '',
              phone: data.phone || '',
              date_of_birth: data.date_of_birth || '',
              address: data.address || ''
            });
          } else {
            console.error('Error fetching user info');
          }
        } catch (error) {
          console.error('Error fetching user info:', error);
        }
      } else {
        setIsAuthenticated(false);
        navigate('/login');
      }
    };

    fetchUserInfo();
  }, [navigate, user]);

  const handleUserInfoChange = (e) => {
    const { name, value } = e.target;
    setTempUserInfo({ ...tempUserInfo, [name]: value }); // Actualiza tempUserInfo en lugar de userInfo
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleUserInfoSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!tempUserInfo.email) newErrors.email = 'Email is required';
    if (!tempUserInfo.username) newErrors.username = 'Username is required';
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch(`${API_URL}/users/me`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`,
          },
          body: JSON.stringify(tempUserInfo), // Envía tempUserInfo para actualizar
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

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!password) newErrors.currentPassword = 'Current password is required';
    if (!newPassword) newErrors.newPassword = 'New password is required';
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch(`${API_URL}/users/password`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`,
          },
          body: JSON.stringify({ currentPassword: password, newPassword }),
        });

        if (response.ok) {
          console.log('Password updated successfully');
          setPassword(''); // Clear the current password field
          setNewPassword(''); // Clear the new password field
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to update password');
        }
      } catch (error) {
        console.error('Password update error:', error);
      }
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <FormContainer>
            <SectionHeader>Profile</SectionHeader>
            <form onSubmit={handleUserInfoSubmit}>
              <InputContainer>
                <label>Username:</label>
                <input
                  type="text"
                  name="username"
                  value={tempUserInfo.username || ''}
                  onChange={handleUserInfoChange}
                  placeholder="Enter your username"
                />
                {errors.username && <ErrorMessage>{errors.username}</ErrorMessage>}
              </InputContainer>
              <InputContainer>
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={tempUserInfo.email || ''}
                  onChange={handleUserInfoChange}
                  placeholder="Enter your email"
                />
                {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
              </InputContainer>
              <InputContainer>
                <label>First Name:</label>
         
                <input
                  type="text"
                  name="first_name"
                  value={tempUserInfo.first_name || ''}
                  onChange={handleUserInfoChange}
                  placeholder="Enter your first name"
                />
                {errors.first_name && <ErrorMessage>{errors.first_name}</ErrorMessage>}
              </InputContainer>
              <InputContainer>
                <label>Last Name:</label>
            
                <input
                  type="text"
                  name="last_name"
                  value={tempUserInfo.last_name || ''}
                  onChange={handleUserInfoChange}
                  placeholder="Enter your last name"
                />
                {errors.last_name && <ErrorMessage>{errors.last_name}</ErrorMessage>}
              </InputContainer>
              <InputContainer>
                <label>Phone Number:</label>
      
                <input
                  type="text"
                  name="phone"
                  value={tempUserInfo.phone || ''}
                  onChange={handleUserInfoChange}
                  placeholder="Enter your phone number"
                />
                {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
              </InputContainer>
              <InputContainer>
                <label>Date of Birth:</label>
          
                <input
                  type="date"
                  name="date_of_birth"
                  value={tempUserInfo.date_of_birth || ''}
                  onChange={handleUserInfoChange}
                />
                {errors.date_of_birth && <ErrorMessage>{errors.date_of_birth}</ErrorMessage>}
              </InputContainer>
              <InputContainer>
                <label>Address:</label>
            
                <input
                  type="text"
                  name="address"
                  value={tempUserInfo.address || ''}
                  onChange={handleUserInfoChange}
                  placeholder="Enter your address"
                />
                {errors.address && <ErrorMessage>{errors.address}</ErrorMessage>}
              </InputContainer>
              <Button type="submit">Update Profile</Button>
            </form>
          </FormContainer>
        );
      case 'security':
        return (
          <FormContainer>
            <SectionHeader>Security</SectionHeader>
            <form onSubmit={handlePasswordSubmit}>
              <InputContainer>
                <label>Current Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter your current password"
                />
                {errors.currentPassword && <ErrorMessage>{errors.currentPassword}</ErrorMessage>}
              </InputContainer>
              <InputContainer>
                <label>New Password:</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                  placeholder="Enter a new password"
                />
                {errors.newPassword && <ErrorMessage>{errors.newPassword}</ErrorMessage>}
              </InputContainer>
              <Button type="submit">Update Password</Button>
            </form>
          </FormContainer>
        );
      // Otros casos como 'preferences', 'account', etc.
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
        <SidebarItem onClick={logout}>Logout</SidebarItem>
      </Sidebar>
      <Content>{renderContent()}</Content>
    </ProfileContainer>
  );
};

export default Profile;
