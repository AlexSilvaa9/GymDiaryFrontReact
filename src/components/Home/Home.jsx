import React, { useState } from "react";
import styled from "styled-components";
import Panda from "../../Assets/panda.png"; // Imagen de ejemplo
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Importa el CSS del calendario

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background-color: ${({ theme }) => theme.background}; /* Fondo según el tema */
  color: ${({ theme }) => theme.text}; /* Texto según el tema */
  overflow: hidden;
  padding: 2rem; /* Añadir espacio alrededor */
`;

const Title = styled.h1`
  font-size: 3rem;
  margin: 1rem 0; /* Espaciado ajustado */
  color: ${({ theme }) => theme.text}; /* Color primario */
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.7); /* Sombra para el texto */
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  margin: 1rem 0; /* Espaciado ajustado */
  color: ${({ theme }) => theme.secondaryText}; /* Color secundario */
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.7); /* Sombra para el texto */
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row; /* Alinea los bloques en una fila */
  width: 100%;
  height: 100%;
  max-width: 1200px; /* Establece un ancho máximo */
  margin-top: 2rem; /* Espaciado superior para separar del título */

  @media (max-width: 768px) {
    flex-direction: column; /* Cambia a columna en pantallas pequeñas */
  }
`;

const Block = styled.div`
  border-radius: 15px;
  text-align: center;
  flex: 1; /* Ocupa igual espacio en la fila */
  min-width: 0; /* Asegura que los bloques no se desborden */
  height: 100%; /* Ocupa la altura completa del contenedor */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PandaImage = styled.img`
  max-width: 100%; /* Asegura que la imagen no se desborde del bloque */
  height: auto; /* Mantiene la relación de aspecto */
`;

const CalendarWrapper = styled.div`
  /* Agrega estilos específicos para el contenedor del calendario si es necesario */
`;

const Home = () => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <HomeContainer>
      <Title>Welcome to our App</Title>
      <Subtitle>Select a date to get started</Subtitle>
      <ContentWrapper>
        <Block>
          <PandaImage src={Panda} alt="Cute panda illustration" />
        </Block>
        <Block>
          <CalendarWrapper>
            <Calendar onChange={handleDateChange} value={date} />
          </CalendarWrapper>
        </Block>
      </ContentWrapper>
    </HomeContainer>
  );
};

export default Home;
