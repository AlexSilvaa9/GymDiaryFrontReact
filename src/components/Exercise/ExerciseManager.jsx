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

const Title = styled.h1`
  color: ${({ theme }) => theme.text};
  margin-bottom: 1rem;
  text-align: center; /* Centra el título */
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  width: 100%; /* Ocupa el ancho completo disponible */
`;

const TabButton = styled.button`
  background: ${({ active, theme }) => (active ? theme.primary : theme.secondary)};
  color: ${({ active, theme }) => (active ? theme.text : theme.secondaryText)};
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
  margin: 0 0.5rem;

  &:hover {
    background: ${({ theme }) => theme.tertiary};
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
