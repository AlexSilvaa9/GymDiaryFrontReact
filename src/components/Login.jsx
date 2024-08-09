import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  position: relative;
  overflow: hidden;
`;

const LoginForm = styled.div`
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
  background-color: ${({ theme }) => theme.primary};
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
  background-color: ${({ theme }) => theme.primary};
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
    background-color: ${({ theme }) => theme.secondary};
    opacity: 1;
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.4);
  }
`;

const RegisterLink = styled.p`
  margin-top: 1rem;
  color: ${({ theme }) => theme.secondary};
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
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

const Login = () => {
  return (
    <LoginContainer>
      <LoginForm>
        <Title>Login</Title>
        <Subtitle>Enter your details to access your account</Subtitle>
        <Input type="text" placeholder="Username" />
        <Input type="password" placeholder="Password" />
        <Button>Login</Button>
        <RegisterLink>
          <Link to="/register" style={{ color: 'inherit' }}>Don't have an account? Register here</Link>
        </RegisterLink>
      </LoginForm>
      <GymDecor />
    </LoginContainer>
  );
};

export default Login;
