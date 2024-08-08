import React from 'react';
import styled, { keyframes } from 'styled-components';
import colors from '../styles/colors';
import Cohete from './animations/Cohete'; // Asegúrate de que la ruta sea correcta
import { Link } from 'react-router-dom'; // Importa Link para la navegación


// Animación para que el cohete suba desde abajo
const rocketAnimation = keyframes`
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

// Estilo para el contenedor de la landing page
const LandingContainer = styled.div`
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
  background-color: ${colors.primary};
  color: ${colors.text};
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
    background-color: ${colors.secondary};
    opacity: 1; /* Botón completamente opaco al pasar el ratón */
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.4); /* Sombra más intensa al hacer hover */
  }
`;

// Estilo para la animación de fondo
const BackgroundAnimation = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1; /* Asegura que el cohete esté detrás del contenido */
  overflow: hidden; /* Asegura que la animación no se salga del contenedor */
  display: flex;
  align-items: flex-end; /* Alinea el cohete al fondo del contenedor */
`;

// Estilo para el componente de cohete
const AnimatedCohete = styled(Cohete)`
  animation: ${rocketAnimation} 2s ease-out; /* Aplica la animación */
  width: 100%;
  height: auto; /* Mantiene la proporción del cohete */
`;
const Highlight = styled.span`
  color: ${colors.secondary}; /* Color del texto resaltado */
  text-shadow: 0 0 10px ${colors.secondary}, 0 0 15px ${colors.secondary}; /* Sombra más sutil para el brillo */
  filter: brightness(1.2); /* Brillo general sutil del texto */
`;
const LandingPage = () => {
  return (
    <LandingContainer>
      <BackgroundAnimation>
        <AnimatedCohete />
      </BackgroundAnimation>
      <Content>
        <Title>Are You Ready to <Highlight>Challenge</Highlight> Your <Highlight>Limits</Highlight>?</Title>
        <Subtitle>Push Beyond Boundaries and Achieve More</Subtitle>


        <Button to="/login">Log In</Button>
      </Content>
    </LandingContainer>
  );
};

export default LandingPage;
