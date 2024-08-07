import React from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';
import { Link } from 'react-router-dom'; // Importa Link para la navegación

// Estilo para el contenedor principal del Login
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background-color: ${colors.background}; /* Fondo oscuro */
  color: ${colors.text}; /* Texto claro */
  position: relative;
  overflow: hidden;
`;

// Estilo para el formulario de inicio de sesión
const LoginForm = styled.div`
  background-color: rgba(255, 255, 255, 0.1); /* Fondo semi-transparente */
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* Sombra del formulario */
  width: 90%;
  max-width: 400px;
  text-align: center;
  position: relative;
  z-index: 2; /* Asegura que el formulario esté sobre los elementos decorativos */
`;

// Estilo para los títulos
const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: ${colors.text};
`;

// Estilo para los subtítulos
const Subtitle = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: ${colors.secondaryText};
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Sombra de los campos */
  transition: box-shadow 0.3s ease;
  
  &:focus {
    outline: none;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4); /* Sombra más intensa al enfocar */
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
  opacity: 0.9; /* Botón semi-transparente */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3); /* Sombra del botón */

  &:hover {
    background-color: ${colors.secondary};
    opacity: 1; /* Botón completamente opaco al pasar el ratón */
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.4); /* Sombra más intensa al hacer hover */
  }
`;

// Estilo para el enlace de registro
const RegisterLink = styled.p`
  margin-top: 1rem;
  color: ${colors.secondary};
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

// Estilo para los elementos decorativos
const GymDecor = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1; /* Asegura que los elementos decorativos estén detrás del formulario */
  width: 100%;
  height: 100px; /* Ajusta la altura según sea necesario */
  background-image: url('/gym-decor.png'); /* Ruta de la imagen decorativa relacionada con el gimnasio */
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
          <Link to="/register" style={{ color: colors.secondary }}>Don't have an account? Register here</Link>
        </RegisterLink>
      </LoginForm>
      <GymDecor />
    </LoginContainer>
  );
};

export default Login;
