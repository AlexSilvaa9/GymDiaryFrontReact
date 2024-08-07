import React, { useState } from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';
import { Link } from 'react-router-dom';

// Estilo para el contenedor principal del Registro
const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background-color: ${colors.background}; /* Fondo oscuro */
  color: ${colors.text}; /* Texto claro */
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
`;

// Estilo para el formulario de registro
const RegisterForm = styled.div`
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

// Estilo para el enlace de inicio de sesión
const LoginLink = styled.p`
  margin-top: 1rem;
  color: ${colors.secondary};
  font-size: 0.9rem;

  a {
    color: ${colors.secondary};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
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

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Handle successful registration logic here
      console.log('Registration successful');
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
          {errors.email && <p>{errors.email}</p>}
          
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && <p>{errors.username}</p>}
          
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p>{errors.password}</p>}
          
          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
          
          <Button type="submit">Register</Button>
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
