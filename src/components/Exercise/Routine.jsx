import React, { useState } from 'react';
import styled from 'styled-components';
import Exercise from './Exercise';

const RoutineContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 300px;
  max-width: 80%;
  padding: 1rem;
  margin: 1rem auto;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  background-color: ${({ theme }) => theme.routineBackground};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;

  @media (max-width: 600px) {
    max-width: 100%;
    padding: 0.5rem;
  }
`;

const ExerciseListContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.5rem;
  margin: 1rem auto;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: space-between;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
  box-sizing: border-box;
  width: 100%;
`;

const Button = styled.button`
  background: ${({ theme, variant }) => 
    variant === 'delete' ? theme.danger : theme.primary};
  color: ${({ theme }) => theme.text};
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;

  @media (max-width: 600px) {
    width: 100%;
    padding: 0.75rem;
    font-size: 0.875rem;
  }

  &:hover {
    background: ${({ theme, variant }) => 
      variant === 'delete' ? theme.dangerDark : theme.tertiary};
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const RoutineTitle = styled.h1`
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.cardText};
  margin-top: 1rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);

  @media (max-width: 600px) {
    font-size: 1.8rem;
  }
`;

const API_URL = process.env.REACT_APP_SERVER_NAME;

const Routine = ({ routine, onDelete }) => {
  const [updatedRoutine, setUpdatedRoutine] = useState(routine);

  const handleExerciseChange = (updatedExercise, index) => {
    const newExercises = [...updatedRoutine.exercises];
    newExercises[index] = updatedExercise;
    setUpdatedRoutine({
      ...updatedRoutine,
      exercises: newExercises,
    });
  };

  const handleAddExercise = () => {
    const newExercise = {
      id: Date.now(),
      name: '',
      sets: '',
      reps: '',
      weight: '',
    };
    setUpdatedRoutine(prevState => ({
      ...prevState,
      exercises: [...prevState.exercises, newExercise],
    }));
  };

  const handleDeleteExercise = (index) => {
    const newExercises = updatedRoutine.exercises.filter((_, i) => i !== index);
    setUpdatedRoutine({
      ...updatedRoutine,
      exercises: newExercises,
    });
  };

  const handleUpdateRoutine = async () => {
    try {
      const response = await fetch(`${API_URL}/users/me/routines`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(updatedRoutine),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message || 'Rutina actualizada correctamente');
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Error al actualizar la rutina');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      alert('Error al enviar la solicitud');
    }
  };

  const handleDeleteRoutine = async () => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar esta rutina?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_URL}/users/me/routines`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ name: routine.name, date: routine.date }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message || 'Rutina eliminada correctamente');
        onDelete(routine._id);  // Llama a la función de eliminación pasada como prop
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Error al eliminar la rutina');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      alert('Error al enviar la solicitud');
    }
  };

  return (
    <RoutineContainer>
      <RoutineTitle>{updatedRoutine.name}</RoutineTitle>
      <ExerciseListContainer>
        {updatedRoutine.exercises && updatedRoutine.exercises.length > 0 ? (
          updatedRoutine.exercises.map((exercise, index) => (
            <div key={exercise.id} style={{ position: 'relative' }}>
              <Exercise 
                exercise={exercise} 
                onChange={(updatedExercise) => handleExerciseChange(updatedExercise, index)} 
              />
              <Button variant="delete" onClick={() => handleDeleteExercise(index)}>
                Delete Exercise
              </Button>
            </div>
          ))
        ) : (
          <p>No exercises available</p>
        )}
      </ExerciseListContainer>
      <ButtonContainer>
        <Button onClick={handleAddExercise}>Add Exercise</Button>
        <Button onClick={handleUpdateRoutine}>Save Routine</Button>
        <Button variant="delete" onClick={handleDeleteRoutine}>Delete Routine</Button>
      </ButtonContainer>
    </RoutineContainer>
  );
};

export default Routine;
