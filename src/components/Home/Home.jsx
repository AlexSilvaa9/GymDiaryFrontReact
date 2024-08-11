import React from 'react';
import styled from 'styled-components';
import Panda from '../../Assets/panda.png'; // Imagen del panda

// Estilos para la página de inicio
const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background: ${({ theme }) => theme.background}; /* Fondo según el tema */
  color: ${({ theme }) => theme.text}; /* Color del texto principal */
  overflow: hidden; /* Previene el desbordamiento */
  text-align: center;
  padding: 2rem;
  box-sizing: border-box; /* Incluye el padding y border en el tamaño total */
`;

const Title = styled.h1`
  font-size: 4rem;
  margin: 1rem 0;
  font-weight: bold;
  color: ${({ theme }) => theme.text}; /* Color primario */
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
`;

const Subtitle = styled.h2`
  font-size: 1.75rem;
  margin: 1rem 0;
  font-weight: 300;
  color: ${({ theme }) => theme.secondaryText}; /* Color secundario del texto */
  text-shadow: 1px 1px 8px rgba(0, 0, 0, 0.5);
`;

const BenefitsSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 2rem 0;
  max-width: 1200px;
  width: 100%;
  gap: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Benefit = styled.div`
  background: ${({ theme }) => theme.terciary}; /* Fondo terciario para los bloques de beneficios */
  border-radius: 15px;
  padding: 1rem;
  flex: 1;
  max-width: 300px;
  text-align: center;
  color: ${({ theme }) => theme.text}; /* Color del texto */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

  h3 {
    margin: 0.5rem 0;
    font-size: 1.25rem;
    color: ${({ theme }) => theme.text}; /* Color primario para los encabezados */
  }

  p {
    font-size: 1rem;
    line-height: 1.5;
  }
`;

const PandaImage = styled.img`
  max-width: 200px;
  height: auto;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* Corrige el valor de rgba */
`;

const StartButton = styled.a`
  display: inline-block;
  padding: 1rem 2rem;
  font-size: 1.25rem;
  font-weight: bold;
  color: ${({ theme }) => theme.text}; /* Color del texto del botón */
  background-color: ${({ theme }) => theme.secondary}; /* Color del botón */
  border-radius: 25px;
  text-decoration: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.primary}; /* Color de hover del botón */
  }
`;

const Home = () => {
  return (
    <HomeContainer>
      <Title>Welcome Back to FitTrack!</Title>
      <Subtitle>Track your nutrition and exercise to achieve your health goals</Subtitle>
      <PandaImage src={Panda} alt="Cute panda illustration" />
      <BenefitsSection>
        <Benefit>
          <h3>Track Your Nutrition</h3>
          <p>Monitor your daily food intake and make healthier choices with ease.</p>
        </Benefit>
        <Benefit>
          <h3>Log Your Workouts</h3>
          <p>Keep track of your exercise routines and progress over time.</p>
        </Benefit>
        <Benefit>
          <h3>Set and Achieve Goals</h3>
          <p>Set personal fitness goals and stay motivated to achieve them.</p>
        </Benefit>
      </BenefitsSection>
      <StartButton href="/dashboard">Go to Dashboard</StartButton>
    </HomeContainer>
  );
};

export default Home;
