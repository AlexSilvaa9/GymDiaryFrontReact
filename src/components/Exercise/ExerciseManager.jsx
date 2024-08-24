import React, { useState } from 'react';
import History from './History';
import RoutineManager from './RoutineManager';
import Today from './Today';
import styled from 'styled-components';

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column; /* Asegura que el contenedor principal use columna */
  min-height: 100vh;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

const Container = styled.div`
  flex: 1; /* Ocupa el espacio restante del AppWrapper */
  padding: 2rem;
  display: flex;
  flex-direction: column; /* Permite que el contenido se apile verticalmente */
  align-items: stretch; /* Asegura que el contenido ocupe todo el ancho disponible */
  overflow: auto; /* Permite el desplazamiento si el contenido es mayor */
`;


const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  width: 100%; /* Ocupa el ancho completo disponible */
`;

const TabButton = styled.button`
  background: ${({ active, theme }) => (active ? 'transparent' : theme.primary)};
  color: ${({ active, theme }) => (active ? theme.tertiary : theme.text)};
  border: 3px solid ${({ active, theme }) => (active ? theme.tertiary : theme.primary)};
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 0 0.5rem; /* Agrega un margen general */

  &:hover {
    background: ${({ active, theme }) => (active ? theme.tertiary : theme.secondary)};
    color: ${({ active, theme }) => (active ? theme.text : theme.text)};
    border: 3px solid ${({ active, theme }) => (active ? theme.tertiary : theme.tertiary)};
  }

  @media (max-width: 480px) {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    margin: 0 0.25rem; /* Reduce el margen en pantallas más pequeñas */
  }

`;

const ExerciseManager = () => {
  const [activeTab, setActiveTab] = useState('history');

  return (
    <AppWrapper>
      <Container>
        
        <TabContainer>
          <TabButton
            active={activeTab === 'history'}
            onClick={() => setActiveTab('history')}
          >
            History
          </TabButton>

          <TabButton
            active={activeTab === 'routineManager'}
            onClick={() => setActiveTab('routineManager')}
          >
            Routine Manager
          </TabButton>

          <TabButton
            active={activeTab === 'today'}
            onClick={() => setActiveTab('today')}
          >
            Today
          </TabButton>
        </TabContainer>

        {/* Usamos `flex: 1` para que el contenido de la pestaña ocupe el espacio restante */}
        <div style={{ flex: 1, width: '100%' }}>
          {activeTab === 'history' && <History />}
          {activeTab === 'routineManager' && <RoutineManager />}
          {activeTab === 'today' && <Today />}
        </div>
      </Container>
    </AppWrapper>
  );
};

export default ExerciseManager;
