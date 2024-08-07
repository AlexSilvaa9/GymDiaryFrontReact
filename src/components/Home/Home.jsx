import React from "react";
import styled from "styled-components";
import colors from "../../styles/colors"; // Importa las variables de color

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
  color: ${colors.primary}; /* Color primario */
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.7); /* Sombra para el texto */
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: ${colors.secondary}; /* Color secundario */
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.7); /* Sombra para el texto */
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  padding: 2rem;
`;

const TextContainer = styled.div`
  width: 50%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

const Card = styled.div`
  background: ${colors.cardBackground}; /* Color de fondo de la tarjeta */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  width: 100%;
  margin-bottom: 1rem;
  text-align: left;
  transition: transform 0.2s;
  opacity: 0.9; /* Semi-transparente */
  
  &:hover {
    transform: scale(1.05);
    opacity: 1; /* Completa opacidad al hacer hover */
  }
`;

const CardTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: ${colors.primary}; /* Color primario */
`;

const CardDescription = styled.p`
  font-size: 1rem;
  color: ${colors.text}; /* Texto claro */
`;

const Home = () => {
  return (
    <HomeContainer>
      <Title>Welcome to FitTrack</Title>
      <Subtitle>Your personal health and fitness tracker</Subtitle>
      <ContentWrapper>
        <TextContainer>
          <CardsContainer>
            <Card>
              <CardTitle>Nutrition</CardTitle>
              <CardDescription>Track your daily meals and calorie intake.</CardDescription>
            </Card>
            <Card>
              <CardTitle>Exercise</CardTitle>
              <CardDescription>Log your workouts and monitor your progress.</CardDescription>
            </Card>
            <Card>
              <CardTitle>Weight</CardTitle>
              <CardDescription>Keep a record of your weight changes over time.</CardDescription>
            </Card>
          </CardsContainer>
        </TextContainer>
      </ContentWrapper>
    </HomeContainer>
  );
};

export default Home;
