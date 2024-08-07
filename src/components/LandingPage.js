import React from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';
import Cohete from './animations/Cohete'; // Asegúrate de que la ruta sea correcta

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

const Content = styled.div`
  text-align: center;
  position: relative;
  z-index: 2; /* Asegura que el contenido esté sobre el cohete */
  color: rgba(255, 255, 255, 0.8); /* Texto semi-transparente */
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.9); /* Texto semi-transparente con más opacidad */
  text-shadow: 0 4px 6px rgba(0, 0, 0, 0.7); /* Sombra del texto */
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.75); /* Texto semi-transparente */
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5); /* Sombra del texto */
`;

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

const BackgroundAnimation = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1; /* Asegura que el cohete esté detrás del contenido */
  overflow: hidden; /* Asegura que la animación no se salga del contenedor */
`;

const LandingPage = () => {
  return (
    <LandingContainer>
      <BackgroundAnimation>
        <Cohete />
      </BackgroundAnimation>
      <Content>
        <Title>Ready to boost your experience?</Title>
        <Subtitle>Prepare yourself for the next level</Subtitle>
        <Button onClick={() => console.log('Redirect to Log In page')}>Log In</Button>
      </Content>
    </LandingContainer>
  );
};

export default LandingPage;
