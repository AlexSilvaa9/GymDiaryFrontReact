// src/components/Card.js
import React from 'react';
import styled from 'styled-components';

// Estilos para la tarjeta
const CardContainer = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin: 0 auto; /* Centra la tarjeta en su contenedor */
  max-width: 300px;
  width: 100%;
  transition: box-shadow 0.3s ease, background 0.3s ease;
  text-align: center;
  overflow: hidden;

  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    background: ${({ theme }) => theme.cardHoverBackground};
  }
`;

const CardContent = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.cardText};
  margin-bottom: 0.5rem;
`;

const CardDate = styled.div`
  font-size: 1.3rem;
  color: ${({ theme }) => theme.cardTitle};
  margin-bottom: 0.5rem;
`;

const Card = ({ weight, bodyFat, muscleMass, bodyWater, date }) => (
  <CardContainer>
    <CardDate>{date}</CardDate>
    <CardContent>Weight: {weight} kg</CardContent>
    <CardContent>Body Fat: {bodyFat} %</CardContent>
    <CardContent>Muscle Mass: {muscleMass} %</CardContent>
    <CardContent>Body Water: {bodyWater} %</CardContent>
  </CardContainer>
);

export default Card;
