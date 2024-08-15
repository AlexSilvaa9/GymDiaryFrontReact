// src/components/ExerciseManager.jsx
import React, { useState } from 'react';
import History from './History';
import RoutineManager from './RoutineManager';
import Exercises from './Exercises'; // Cambiado de ExerciseList a Exercises
import styled from 'styled-components';

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

const Container = styled.div`
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

const TabButton = styled.button`
  background: ${({ active, theme }) => (active ? theme.primary : theme.secondary)};
  color: ${({ active, theme }) => (active ? theme.text : theme.secondaryText)};
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.tertiary};
  }
`;

const ExerciseManager = () => {
  const [activeTab, setActiveTab] = useState('history');
  const [exerciseLog, setExerciseLog] = useState({});
  const [selectedRoutine, setSelectedRoutine] = useState('');
  const [routineList, setRoutineList] = useState([]);
  const [exerciseList, setExerciseList] = useState([]);

  const handleSaveRoutine = (routine) => {
    // Guardar rutina en el estado o en el backend
    setRoutineList([...routineList, routine]);
  };

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
            active={activeTab === 'exerciseManager'}
            onClick={() => setActiveTab('exerciseManager')}
          >
            Exercise Manager
          </TabButton>
        </TabContainer>

        {activeTab === 'history' && (
          <History
            exerciseLog={exerciseLog}
          />
        )}

        {activeTab === 'routineManager' && (
          <RoutineManager
            handleSaveRoutine={handleSaveRoutine}
            exerciseList={exerciseList}
          />
        )}

        {activeTab === 'exerciseManager' && (
          <Exercises
            exerciseList={exerciseList}
            setExerciseList={setExerciseList}
          />
        )}
      </Container>
    </AppWrapper>
  );
};

export default ExerciseManager;
