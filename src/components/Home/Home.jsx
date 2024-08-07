import React from "react";
import styled from "styled-components";
import colors from "../../styles/colors"; // Importa las variables de color
import { FaApple, FaDumbbell, FaWeight } from "react-icons/fa"; // Iconos de ejemplo

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background-color: ${colors.background}; /* Fondo oscuro */
  color: ${colors.text}; /* Texto claro */
  overflow: hidden;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: ${colors.text}; /* Color primario */
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.7); /* Sombra para el texto */
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: ${colors.secondaryText}; /* Color secundario */
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.7); /* Sombra para el texto */
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  padding: 2rem;
  flex-wrap: wrap;
`;

const Block = styled.div`
  background: ${colors.primary};
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  padding: 2rem;
  margin: 1rem;
  width: 300px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  opacity: 0.9; /* Semi-transparente */
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.7);
    opacity: 1; /* Completa opacidad al hacer hover */
  }
`;

const BlockIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: ${colors.secondary}; /* Color de acento */
`;

const BlockTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: ${colors.text}; /* Color primario */
`;

const BlockDescription = styled.p`
  font-size: 1rem;
  color: ${colors.secondaryText}; /* Texto claro */
`;

const Home = () => {
  return (
    <HomeContainer>
      <Title>Welcome to FitTrack</Title>
      <Subtitle>Your personal health and fitness tracker</Subtitle>
      <ContentWrapper>
        <Block>
          <BlockIcon><FaApple /></BlockIcon>
          <BlockTitle>Nutrition</BlockTitle>
          <BlockDescription>Track your daily meals and calorie intake.</BlockDescription>
        </Block>
        <Block>
          <BlockIcon><FaDumbbell /></BlockIcon>
          <BlockTitle>Exercise</BlockTitle>
          <BlockDescription>Log your workouts and monitor your progress.</BlockDescription>
        </Block>
        <Block>
          <BlockIcon><FaWeight /></BlockIcon>
          <BlockTitle>Weight</BlockTitle>
          <BlockDescription>Keep a record of your weight changes over time.</BlockDescription>
        </Block>
      </ContentWrapper>
    </HomeContainer>
  );
};

export default Home;
