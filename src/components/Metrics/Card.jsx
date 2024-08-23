import React from 'react';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa'; // Asegúrate de tener react-icons instalado

// Estilos para la tarjeta
const CardContainer = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin: 0 auto; /* Centra la tarjeta en su contenedor */
  max-width: 220px;
  width: 100%;
  transition: box-shadow 0.3s ease, background 0.3s ease;
  text-align: center;
  overflow: hidden;
  position: relative; /* Necesario para posicionar el botón de eliminar */
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

const DeleteButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.secondary};
  }
`;

const Card = ({ weight, bodyFat, muscleMass, bodyWater, date, onDelete }) => (
  <CardContainer>
    <DeleteButton onClick={() => onDelete(date)}>
      x
    </DeleteButton>
    <CardDate>{date}</CardDate>
    <CardContent>Weight: {weight} kg</CardContent>
    <CardContent>Body Fat: {bodyFat} %</CardContent>
    <CardContent>Muscle Mass: {muscleMass} %</CardContent>
    <CardContent>Body Water: {bodyWater} %</CardContent>
  </CardContainer>
);

export default Card;
