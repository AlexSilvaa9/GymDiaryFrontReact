import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Exercise from './Exercise'; // Asegúrate de que el nombre del archivo y la importación coincidan
import { FaEdit } from 'react-icons/fa'; // Icono de edición

const RoutineContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 300px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  background: ${({ theme }) => theme.routineBackground};
  max-width: 80%;
  padding: 1rem;
  margin: 1rem auto;
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

const Button = styled.button`
  background: ${({ theme, variant }) => variant === 'delete' ? theme.danger : theme.primary};
  color: ${({ theme }) => theme.text};
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background: ${({ theme, variant }) => variant === 'delete' ? theme.dangerDark : theme.tertiary};
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:not(:last-child) {
    margin-right: 1rem;
  }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 1rem; /* Espacio debajo del campo de entrada */
`;

const RoutineTitle = styled.input`
  font-size: 1.8rem; /* Tamaño de fuente visible */
  font-weight: normal; /* Fuente normal */
  color: ${({ theme }) => theme.text}; /* Color del texto */
  border: none; /* Sin borde */
  background: transparent; /* Fondo transparente */
  border-radius: 0; /* Sin bordes redondeados */
  padding: 0 2rem 0 0.5rem; /* Espacio para el icono */
  width: 100%; /* Ancho completo del contenedor */
  box-sizing: border-box; /* Incluye padding en el ancho total */
  text-align: center; /* Alineación del texto al centro */

  &:focus {
    outline: none; /* Sin resaltado visible al enfocarse */
    border: none; /* Sin borde al enfocarse */
    background: transparent; /* Fondo sigue siendo transparente */
  }

  &::placeholder {
    color: transparent; /* Placeholder invisible */
  }
`;

const EditIcon = styled(FaEdit)`
  position: absolute;
  right: 0.5rem; /* Posición del icono */
  color: ${({ theme }) => theme.text}; /* Color del icono */
  cursor: pointer; /* Indicador de interactividad */
  font-size: 1.25rem; /* Tamaño del icono */
`;

const RoutineTemplate = ({ routine, token, onSelect, onSave }) => {
  const [updatedRoutine, setUpdatedRoutine] = useState(routine);

  useEffect(() => {
    setUpdatedRoutine(routine);
  }, [routine]);

  const handleExerciseChange = (updatedExercise, index) => {
    const newExercises = [...updatedRoutine.exercises];
    newExercises[index] = updatedExercise;
    setUpdatedRoutine(prevState => ({
      ...prevState,
      exercises: newExercises,
    }));
  };

  const handleAddExercise = () => {
    const newExercise = {
      id: Date.now(),
      name: '',
      sets: '',
      reps: '',
      weight: '',
    };
    const newExercises = [...updatedRoutine.exercises, newExercise];
    setUpdatedRoutine(prevState => ({
      ...prevState,
      exercises: newExercises,
    }));
  };

  const handleDeleteExercise = (index) => {
    const newExercises = updatedRoutine.exercises.filter((_, i) => i !== index);
    setUpdatedRoutine(prevState => ({
      ...prevState,
      exercises: newExercises,
    }));
  };

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setUpdatedRoutine(prevState => ({
      ...prevState,
      name: newName,
    }));
  };

  const handleSelect = () => {
    if (onSelect) onSelect(updatedRoutine);
  };

  const handleSaveRoutine = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_NAME}/users/me/routine-templates`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedRoutine),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message || 'Routine saved successfully');
        if (onSave) onSave(data); // Pasa la rutina guardada al componente padre
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Error saving routine');
      }
    } catch (error) {
      console.error('Error submitting request:', error);
      alert('Error submitting request');
    }
  };

  return (
    <RoutineContainer>
      <InputContainer>
        <RoutineTitle
          value={updatedRoutine.name}
          onChange={handleNameChange}
          placeholder="Título de la rutina"
        />
        <EditIcon />
      </InputContainer>
      <ExerciseListContainer>
        {updatedRoutine.exercises && updatedRoutine.exercises.length > 0 ? (
          updatedRoutine.exercises.map((exercise, index) => (
            <div key={exercise.id} style={{ position: 'relative' }}>
              <Exercise 
                exercise={exercise} 
                onChange={(updatedExercise) => handleExerciseChange(updatedExercise, index)} 
              />
              <Button variant="delete" onClick={() => handleDeleteExercise(index)}>
                Delete
              </Button>
            </div>
          ))
        ) : (
          <p>No exercises available</p>
        )}
      </ExerciseListContainer>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
        <Button onClick={handleAddExercise}>Add Exercise</Button>
        <Button onClick={handleSelect}>Let's do this routine today!</Button>
        <Button onClick={handleSaveRoutine}>Save Routine</Button>
      </div>
    </RoutineContainer>
  );
};

export default RoutineTemplate;