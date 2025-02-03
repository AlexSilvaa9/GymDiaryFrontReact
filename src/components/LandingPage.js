import React from 'react';
import styled from 'styled-components';
import background_dark from '../Assets/gym_dark.jpg';
import background_light from '../Assets/gym_light.jpg';
import { Link } from 'react-router-dom'; // Importa Link para la navegación


// Estilo para el contenedor de la landing page
const LandingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background-image: url(${({ isDarkMode }) => (isDarkMode ? background_dark : background_light)});
  background-size: cover; /* Asegura que la imagen cubra toda la pantalla */
  background-position: center; /* Centra la imagen */
  background-repeat: no-repeat; /* Evita la repetición de la imagen */
  color: ${({ theme }) => theme.text}; /* Texto según el tema */
  position: relative;
  overflow: hidden;
  margin: 0; /* Asegura que no haya márgenes */
`;


// Estilo para el contenido
const Content = styled.div`
  text-align: center;
  position: relative;
  z-index: 2; /* Asegura que el contenido esté sobre el cohete */
  color: rgba(255, 255, 255, 0.8); /* Texto semi-transparente */
`;

// Estilo para el título
const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.9); /* Texto semi-transparente con más opacidad */
  text-shadow: 0 4px 6px rgba(0, 0, 0, 0.7); /* Sombra del texto */
`;

// Estilo para el subtítulo
const Subtitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.75); /* Texto semi-transparente */
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5); /* Sombra del texto */
`;

// Estilo para el enlace que actúa como botón
const Button = styled(Link)`
  background-color: ${({ theme }) => theme.primary}; /* Fondo del botón según el tema */
  color: ${({ theme }) => theme.text}; /* Texto del botón según el tema */
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none; /* Elimina el subrayado del enlace */
  display: inline-block; /* Asegura que el botón se ajuste al tamaño del texto */
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  opacity: 0.9; /* Botón semi-transparente */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3); /* Sombra del botón */

  &:hover {
    background-color: ${({ theme }) => theme.secondary}; /* Fondo del botón en hover según el tema */
    opacity: 1; /* Botón completamente opaco al pasar el ratón */
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.4); /* Sombra más intensa al hacer hover */
  }
`;



const LandingPage = ({ isDarkMode }) => {

  return (
    <LandingContainer  isDarkMode={isDarkMode}>

      <Content>
        <Title>Are You Ready to Challenge Your Limits?</Title>
        <Subtitle>Push Beyond Boundaries and Achieve More</Subtitle>
        <Button to="/login">Log In</Button>
      </Content>
    </LandingContainer>
  );
};

export default LandingPage;
