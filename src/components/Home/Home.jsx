import React from 'react';
import styled from 'styled-components';
import LightHome from '../../Assets/light_home.svg'; // Imagen para el tema claro
import DarkHome from '../../Assets/dark_home.svg';   // Imagen para el tema oscuro
import NutritionImg from '../../Assets/rhino.png'; // Imagen para la sección de nutrición
import ExerciseImg from '../../Assets/koala.png';   // Imagen para la sección de ejercicio
import MetricsImg from '../../Assets/coffee.png';     // Imagen para la sección de métricas

import LightHome2 from '../../Assets/light_home2.svg'; // Imagen para el tema claro
import DarkHome2 from '../../Assets/dark_home2.svg';   // Imagen para el tema oscuro
import Button from '../utils/GradientButton'; // Importa el botón con gradiente

// Contenedor principal para la página de inicio
const HomePage = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: ${({ theme }) => theme.background};
`;

// Estilos para cada sección
const HomeSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh; /* Cambiado para que sea mínimo en lugar de fijo */
  width: 100%;
  color: ${({ theme }) => theme.text};
  text-align: center;
  padding: 1rem;
  box-sizing: border-box;

  &:nth-of-type(1) {
    background-image: url(${({ isDarkMode }) => (isDarkMode ? DarkHome2 : LightHome2)});
    background-size: cover; /* Ajusta el tamaño de la imagen para cubrir todo el fondo */
    background-position: center; /* Centra la imagen en la sección */
    background-repeat: no-repeat; /* Evita la repetición de la imagen */
  }
  &:nth-of-type(2) {
    background-image: url(${({ isDarkMode }) => (isDarkMode ? DarkHome : LightHome)});
    background-size: cover; /* Ajusta el tamaño de la imagen para cubrir todo el fondo */
    background-position: center; /* Centra la imagen en la sección */
    background-repeat: no-repeat; /* Evita la repetición de la imagen */
  }
  &:nth-of-type(3) {
    background: ${({ theme }) => theme.primary}; /* Color primario de fondo */
  }

  @media (max-width: 768px) {
    padding: 2rem 1rem;
    background-size: contain; /* Ajusta el tamaño de la imagen en pantallas pequeñas */
  }
`;

// Estilos para los contenidos de cada sección
const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;

  @media (max-width: 1024px) {
    flex-direction: column;
    text-align: center;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 0 1rem;
  }
`;

const TextContent = styled.div`
  flex: 1;
  margin-right: 2rem;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 2rem; /* Añade espacio entre los bloques de texto e imagen */
  }
`;

const ImageContent = styled.img`
  max-width: 400px;
  height: auto;

  @media (max-width: 768px) {
    max-width: 300px;
  }

  @media (max-width: 480px) {
    max-width: 100%;
  }
`;

// Estilos para los textos
const SectionTitle = styled.h1`
  font-size: 2.5rem;
  margin: 1rem 0;
  font-weight: bold;
  color: ${({ theme }) => theme.text};

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;

const SectionSubtitle = styled.h2`
  font-size: 1.5rem;
  margin: 1rem 0;
  font-weight: 300;
  color: ${({ theme }) => theme.secondaryText};

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const SectionContent = styled.p`
  font-size: 1.25rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.text};
  text-align: justify;

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.875rem;
  }
`;

// Componente Home
const Home = ({ isDarkMode }) => {
  return (
    <HomePage>
      {/* Primera sección dedicada al ejercicio */}
      <HomeSection isDarkMode={isDarkMode}>
        <ContentWrapper>
          <ImageContent src={ExerciseImg} alt="Exercise" />
          <TextContent>
            <SectionTitle>Maximize Your Workout</SectionTitle>
            <SectionSubtitle>Track and optimize your exercise routines</SectionSubtitle>
            <SectionContent>GymDiary helps you track your workouts and optimize your exercise routines. With detailed logging and performance analytics, you can push yourself to achieve better results and reach your fitness goals.</SectionContent>
            <SectionContent>From setting workout plans to tracking progress, GymDiary provides the tools you need to stay motivated and achieve your fitness ambitions. Start tracking today and see the difference in your workouts!</SectionContent>
            <Button onClick={() => window.location.href = '#/exercise'}>Get Started</Button>
          </TextContent>
        </ContentWrapper>
      </HomeSection>

      {/* Segunda sección dedicada a la comida */}
      <HomeSection isDarkMode={isDarkMode}>
        <ContentWrapper>
          <TextContent>
            <SectionTitle>Track Your Nutrition</SectionTitle>
            <SectionContent>Our nutrition tracking tools help you monitor what you eat and how it affects your health. You can make better food choices and stay on top of your dietary goals.</SectionContent>
            <SectionContent>From tracking calories to understanding nutrient intake, our platform provides all the information you need to maintain a balanced diet and achieve your health objectives.</SectionContent>
            <Button onClick={() => window.location.href = '#/nutrition'}>Get Started</Button>            
          </TextContent>
          <ImageContent src={NutritionImg} alt="Nutrition" />
        </ContentWrapper>
      </HomeSection>

      {/* Tercera sección */}
      <HomeSection>
        <ContentWrapper>
          <ImageContent src={MetricsImg} alt="Metrics" />
          <TextContent>
            <SectionTitle>Our Mission</SectionTitle>
            <SectionContent>At GymDiary, our mission is to empower individuals to lead healthier lives through data-driven insights and personalized tracking solutions. We believe that understanding your nutrition, exercise, and body metrics is key to achieving your wellness goals.</SectionContent>
            <SectionContent>Our platform is designed to be intuitive and user-friendly, providing you with the tools and support you need to make informed decisions about your health. Join us in our mission to promote a healthier, more active lifestyle.</SectionContent>
            <SectionContent>This App was designed and developed by Alex Silva, feel free to contact with me if you have any trouble or you want to contribute either developing new features or giving feedback.</SectionContent>
            <Button onClick={() => window.location.href = 'https://alexsilvaa9.github.io'}>Contact</Button>

          </TextContent>
        </ContentWrapper>
      </HomeSection>
    </HomePage>
  );
};

export default Home;
