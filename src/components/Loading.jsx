import React from 'react';
import styled, { keyframes } from 'styled-components';

// Animación de las barras
const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: scaleY(1);
  }
  40% {
    transform: scaleY(1.5);
  }
  60% {
    transform: scaleY(1.2);
  }
`;

// Contenedor para centrar las barras
const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
`;

// Contenedor de las barras
const BarsContainer = styled.div`
  display: flex;
  gap: 10px; /* Espacio entre las barras */
`;

// Estilo para cada barra
const Bar = styled.div`
  width: 7px;
  height: 45px;
  background: ${({ theme }) => theme.secondary}; /* Color del tema */
  animation: ${bounce} 1.5s infinite;
  
  &:nth-child(2) {
    animation-delay: 0.2s;
  }
  
  &:nth-child(3) {
    animation-delay: 0.4s;
  }
`;

const Loading = () => {
  return (
    <LoadingContainer>
      <BarsContainer>
        <Bar />
        <Bar />
        <Bar />
      </BarsContainer>
    </LoadingContainer>
  );
};

export default Loading;
