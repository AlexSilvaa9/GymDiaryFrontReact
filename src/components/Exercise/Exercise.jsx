import React, { useState } from 'react';
import styled from 'styled-components';
import colors from '../../styles/colors'; // Importa las variables de color

const Container = styled.div`
  padding: 2rem;
  background-color: ${colors.background};
  color: ${colors.text};
  height: 100%;
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: ${colors.primary};
`;

const Input = styled.input`
  background-color: ${colors.inputBackground};
  color: ${colors.text};
  border: 1px solid ${colors.border};
  border-radius: 5px;
  padding: 0.5rem;
  margin-right: 0.5rem;
  width: calc(50% - 1rem);
  
  &::placeholder {
    color: ${colors.placeholder};
  }
`;

const Button = styled.button`
  background-color: ${colors.primary};
  color: ${colors.text};
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 1rem;

  &:hover {
    background-color: ${colors.secondary};
  }
`;

const ListItem = styled.li`
  margin: 0.5rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RemoveButton = styled.button`
  background-color: ${colors.danger};
  color: ${colors.text};
  border: none;
  padding: 0.3rem 0.6rem;
  font-size: 0.8rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${colors.dangerHover};
  }
`;

const Exercise = () => {
  const [exercises, setExercises] = useState([]);
  const [exerciseName, setExerciseName] = useState('');
  const [duration, setDuration] = useState('');

  const handleAddExercise = () => {
    if (exerciseName && duration) {
      setExercises([...exercises, { exerciseName, duration }]);
      setExerciseName('');
      setDuration('');
    }
  };

  const handleRemoveExercise = (index) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  return (
    <Container>
      <Section>
        <Title>Mis Entrenamientos</Title>
        <div>
          <Input
            type="text"
            placeholder="Ejercicio"
            value={exerciseName}
            onChange={(e) => setExerciseName(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Duración"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>
        <Button onClick={handleAddExercise}>Añadir Ejercicio</Button>
        <ul>
          {exercises.map((exercise, index) => (
            <ListItem key={index}>
              {`${exercise.exerciseName}: ${exercise.duration}`}
              <RemoveButton onClick={() => handleRemoveExercise(index)}>Eliminar</RemoveButton>
            </ListItem>
          ))}
        </ul>
      </Section>
    </Container>
  );
};

export default Exercise;
