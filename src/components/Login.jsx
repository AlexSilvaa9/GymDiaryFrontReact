import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';
import Loading from './Loading'; // Importa el componente Loading
import Button from './utils/GradientButton'; // Importa el botón personalizado
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  position: relative;
  overflow: hidden;
  padding: 1rem;
  box-sizing: border-box; /* Asegura que el padding no cause desbordamiento */
`;

const LoginForm = styled.div`
  padding: 2rem;
  width: 100%;
  max-width: 450px;
  text-align: center;
  position: relative;
  z-index: 2;
  background: ${({ theme }) => theme.formBackground};
  border-radius: 8px;
  box-sizing: border-box; /* Asegura que el padding no cause desbordamiento */

  @media (max-width: 600px) {
    padding: 1.75rem;
    max-width: 90%;
  }

  @media (max-width: 400px) {
    padding: 1.75rem;
    max-width: 95%;
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
    font-size: 1.6rem;
  }
`;

const Subtitle = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.secondaryText};

  @media (max-width: 600px) {
    font-size: 1.1rem;
    margin-bottom: 1.75rem;
  }

  @media (max-width: 400px) {
    font-size: 1rem;
    margin-bottom: 1.5rem;
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
    padding: 0.6rem;
    font-size: 0.9rem;
  }

  @media (max-width: 400px) {
    padding: 0.6rem;
    font-size: 0.9rem;
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

  @media (max-width: 600px) {
    font-size: 0.9rem;
  }

  @media (max-width: 400px) {
    font-size: 0.9rem;
  }
`;

const GymDecor = styled.div`
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;  /* Asegura que cubra todo el ancho del contenedor */
  height: 100px;
  background-image: url('/gym-decor.png');
  background-size: cover;
  background-position: center;
  z-index: 1;

  @media (max-width: 600px) {
    height: 80px;
  }

  @media (max-width: 400px) {
    height: 60px;
  }
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
  background: ${({ theme }) => theme.text};
  opacity: 0.5;
  z-index: 3;
`;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    try {
      await login(username, password);
      navigate('/home');
    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginForm>
        <Title>Login</Title>
        <Subtitle>Enter your details to access your account</Subtitle>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.general && <p>{errors.general}</p>}
          <Button type="submit" disabled={loading}style={{ width: '100%' }}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        <RegisterLink>
          <Link to="/register" style={{ color: 'inherit' }}>Don't have an account? Register here</Link>
        </RegisterLink>
      </LoginForm>
      <LoadingContainer loading={loading}>
        <Loading />
      </LoadingContainer>
      <GymDecor />
    </LoginContainer>
  );
};

export default Login;
