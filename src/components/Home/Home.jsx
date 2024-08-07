// src/components/Home/Home.js
import React from "react";
import styled from "styled-components";
import colors from "../../styles/colors"; // Importa las variables de color

const HomeContainer = styled.div`
  padding: 2rem;
  text-align: center;
  background-color: ${colors.background}; /* Fondo claro pastel */
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: ${colors.primary}; /* Morado pastel */
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: ${colors.secondary}; /* Morado más claro */
`;

const CardsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 2rem;
`;

const Card = styled.div`
  background: ${colors.cardBackground}; /* Rosa pastel */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  width: 30%;
  margin-bottom: 1rem;
  text-align: left;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const CardTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: ${colors.primary}; /* Morado pastel */
`;

const CardDescription = styled.p`
  font-size: 1rem;
  color: ${colors.text}; /* Gris oscuro */
`;

const Home = () => {
  return (
    <HomeContainer>
      <Title>Welcome to FitTrack</Title>
      <Subtitle>Your personal health and fitness tracker</Subtitle>
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
    </HomeContainer>
  );
};

export default Home;
