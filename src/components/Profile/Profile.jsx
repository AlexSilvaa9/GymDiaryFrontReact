import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useAuth from '../contexts/useAuth'; // Asegúrate de que la ruta sea correcta

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: ${({ theme }) => theme.background};
  padding: 20px;
  box-sizing: border-box;
  position: relative;

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

  @media (max-width: 768px) {
    display: none;
  }

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

  @media (max-width: 768px) {
    display: block;
    width: 100%;
    box-sizing: border-box;
  }

  &:hover {
    background: ${({ theme }) => theme.tertiary};
  }
`;

const Content = styled.div`
  flex: 3;
  padding-left: 20px;
  margin-top: 20px;
  overflow: auto;

  @media (min-width: 768px) {
    margin-left: 20px;
    margin-top: 0;
  }

  @media (max-width: 768px) {
    padding-left: 0;
    margin-top: 0;
  }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;

  @media (min-width: 768px) {
    width: 100%;
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
    max-width: 400px;
    padding: 6px 10px;
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 4px;
    font-size: 0.875em;
    color: ${({ theme }) => theme.text};
    background: ${({ theme }) => theme.backgroundInput};
    box-sizing: border-box;

    @media (max-width: 768px) {
      max-width: 100%;
    }
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

const MobileMenuButton = styled.button`
  display: none;
  background: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.text};
  border: none;
  border-radius: 4px;
  padding: 10px;
  font-size: 1.25em;
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: absolute;
  top: 60px;
  right: 20px;
  background: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  width: 200px;
  max-height: 400px;
  overflow-y: auto;
  padding: 10px;
  box-sizing: border-box;
  z-index: 1000;

  @media (min-width: 768px) {
    display: none;
  }
`;

const MobileMenuItem = styled(SidebarItem)`
  margin-bottom: 10px;
  padding: 10px;
  font-size: 1em;
  text-align: center;
  box-sizing: border-box;
`;

const API_URL = process.env.REACT_APP_SERVER_NAME;

const Profile = () => {
  const { user, logout } = useAuth();
  const [userInfo, setUserInfo] = useState({
    email: '',
    username: '',
    first_name: '',
    last_name: '',
    phone: '',
    date_of_birth: '',
    address: ''
  });
  const [tempUserInfo, setTempUserInfo] = useState({});
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [activeSection, setActiveSection] = useState('profile');
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (user) {
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
            setUserInfo(data);
            setTempUserInfo(data);
          } else {
            console.error('Error fetching user info');
          }
        } catch (error) {
          console.error('Error fetching user info:', error);
        }
      } else {
        navigate('/login');
      }
    };

    fetchUserInfo();
  }, [navigate, user]);

  const handleUserInfoChange = (e) => {
    const { name, value } = e.target;
    setTempUserInfo({ ...tempUserInfo, [name]: value });
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
    // Agregar validaciones adicionales aquí

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      
      try {
        const response = await fetch(`${API_URL}/users/me`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`,
          },
          body: JSON.stringify(tempUserInfo),
        });

        if (response.ok) {
          const updatedUser = await response.json();
          setUserInfo(updatedUser);
          setTempUserInfo(updatedUser);
          console.log('Profile updated successfully');
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to update profile');
        }
      } catch (error) {
        console.error('Update error:', error);
        setErrors({ ...errors, form: error.message });
      } 
    }
  };
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!password) newErrors.currentPassword = 'Current password is required';
    if (!newPassword) newErrors.newPassword = 'New password is required';
    // Agregar validaciones adicionales aquí

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
          setPassword('');
          setNewPassword('');
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to update password');
        }
      } catch (error) {
        console.error('Password update error:', error);
        setErrors({ ...errors, password: error.message });
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
      default:
        return <div>Select a section from the sidebar.</div>;
    }
  };

  return (
    <ProfileContainer>
      <MobileMenuButton onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
        ☰
      </MobileMenuButton>
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
      <MobileMenu isOpen={isMobileMenuOpen}>
        <MobileMenuItem
          active={activeSection === 'profile'}
          onClick={() => {
            setActiveSection('profile');
            setMobileMenuOpen(false);
          }}
        >
          Profile
        </MobileMenuItem>
        <MobileMenuItem
          active={activeSection === 'security'}
          onClick={() => {
            setActiveSection('security');
            setMobileMenuOpen(false);
          }}
        >
          Security
        </MobileMenuItem>
        <MobileMenuItem
          active={activeSection === 'preferences'}
          onClick={() => {
            setActiveSection('preferences');
            setMobileMenuOpen(false);
          }}
        >
          Preferences
        </MobileMenuItem>
        <MobileMenuItem onClick={() => {
          logout();
          setMobileMenuOpen(false);
        }}>
          Logout
        </MobileMenuItem>
      </MobileMenu>
      <Content>{renderContent()}</Content>
    </ProfileContainer>
  );
};

export default Profile;
