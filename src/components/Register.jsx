import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
  padding: 0;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
`;

const RegisterForm = styled.div`
  padding: 2rem;
  width: 90%;
  max-width: 400px;
  text-align: center;
  position: relative;
  z-index: 2;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.text};
`;

const Subtitle = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.secondaryText};
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease;
  
  &:focus {
    outline: none;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
  }
`;

const Button = styled.button`
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text};
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  opacity: 0.9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);

  &:hover {
    background: ${({ theme }) => theme.secondary};
    opacity: 1;
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.4);
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
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
`;

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!email.includes('@')) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters long';
    }
    if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/users', {
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
        } else {
          const errorData = await response.json();
          setErrors(errorData.errors || { general: 'An error occurred during registration' });
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
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          
          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage>}
          
          {errors.general && <ErrorMessage>{errors.general}</ErrorMessage>}
          
          <Button type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </Button>
        </form>
        <LoginLink>
          <Link to="/login">Already have an account? Login here</Link>
        </LoginLink>
      </RegisterForm>
      <GymDecor />
    </RegisterContainer>
  );
};

export default Register;
