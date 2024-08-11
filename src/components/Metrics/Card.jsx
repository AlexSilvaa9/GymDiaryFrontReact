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
  margin: 1rem;
  max-width: 300px;
  width: 100%;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  text-align: center;

  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    transform: translateY(-5px);
  }
`;

// Estilos para el contenido de la tarjeta
const CardContent = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
  margin-bottom: 1rem;
`;

const CardDate = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.secondaryText};
  margin-bottom: 1rem;
`;

const Card = ({ weight, bodyFat, muscle, date }) => {
  return (
    <CardContainer>
      <CardDate>{date}</CardDate>
      <CardContent>Weight: {weight}</CardContent>
      <CardContent>Body Fat: {bodyFat}</CardContent>
      <CardContent>Muscle: {muscle}</CardContent>
    </CardContainer>
  );
};

export default Card;
