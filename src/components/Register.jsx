import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import Loading from './Loading'; // Import Loading component
import PasswordStrengthBar from 'react-password-strength-bar';
import zxcvbn from 'zxcvbn'; // Library for password strength evaluation
import Button from './utils/GradientButton'; // Import custom button
const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  margin: 0;
  padding: 1rem;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
`;

const RegisterForm = styled.div`
  padding: 2rem;
  width: 100%;
  max-width: 450px;
  text-align: center;
  position: relative;
  z-index: 2;
  background: ${({ theme }) => theme.formBackground};
  border-radius: 8px;
  box-sizing: border-box;

  @media (max-width: 600px) {
    padding: 1.75rem;
  }

  @media (max-width: 400px) {
    padding: 1.5rem;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.text};

  @media (max-width: 600px) {
    font-size: 1.75rem;
  }

  @media (max-width: 400px) {
    font-size: 1.5rem;
  }
`;

const Subtitle = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.secondaryText};

  @media (max-width: 600px) {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 400px) {
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }
`;

const Input = styled.input`
  background: ${({ theme }) => theme.primary};
  border: none;
  border-radius: 5px;
  color: ${({ theme }) => theme.text};
  padding: 0.75rem;
  font-size: 1rem;
  margin-bottom: 1rem;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
  }

  @media (max-width: 600px) {
    padding: 0.5rem;
    font-size: 0.875rem;
  }

  @media (max-width: 400px) {
    padding: 0.45rem;
    font-size: 0.8rem;
  }
`;


const LoginLink = styled.p`
  margin-top: 1rem;
  color: ${({ theme }) => theme.secondary};
  font-size: 0.9rem;

  a {
    color: ${({ theme }) => theme.secondary};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 600px) {
    font-size: 0.85rem;
  }

  @media (max-width: 400px) {
    font-size: 0.8rem;
  }
`;

const GymDecor = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  width: 100%;
  height: 100px;
  background-image: url('/gym-decor.png');
  background-size: cover;
  background-position: center;

  @media (max-width: 600px) {
    height: 80px;
  }

  @media (max-width: 400px) {
    height: 60px;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
`;

const LoadingContainer = styled.div`
  display: ${({ loading }) => (loading ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.8);
  z-index: 3;
`;

const API_URL = process.env.REACT_APP_SERVER_NAME;

// Regular expressions for validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters long';
    }
    if (!passwordRegex.test(password)) {
      newErrors.password = 'Password must be at least 6 characters long, contain an uppercase letter, a lowercase letter, and a number';
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    // Use zxcvbn to evaluate password strength
    const result = zxcvbn(newPassword);
    setPasswordStrength(result.score);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            account: {
              email,
              username,
              password
            }
          }),
        });

        if (response.ok) {
          const data = await response.json();
          alert('Registration successful');
          navigate('/login');
        } else {
          const errorData = await response.json();
          setErrors({ general: errorData.message || 'An error occurred during registration' });
        }
      } catch (error) {
        console.error('Error:', error);
        setErrors({ general: error.message });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <RegisterContainer>
      <RegisterForm>
        <Title>Register</Title>
        <Subtitle>Create a new account</Subtitle>
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && <ErrorMessage>{errors.username}</ErrorMessage>}
          
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          
          <PasswordStrengthBar password={password} style={{ width: '100%', boxSizing: 'border-box' }} />
          
          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage>}
          
          {errors.general && <ErrorMessage>{errors.general}</ErrorMessage>}
          
          <Button type="submit" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Registering...' : 'Register'}
          </Button>
        </form>
        <LoginLink>
          <Link to="/login">Already have an account? Login here</Link>
        </LoginLink>
      </RegisterForm>
      <LoadingContainer loading={loading}>
        <Loading />
      </LoadingContainer>
      <GymDecor />
    </RegisterContainer>
  );
};

export default Register;
