import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Exercise from './Exercise'; 
import { FaEdit, FaTrash } from 'react-icons/fa'; 


// Estilos para los componentes
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
  margin-bottom: 1rem; 
`;

const RoutineTitle = styled.input`
  font-size: 2rem; 
  font-weight: normal; 
  color: ${({ theme }) => theme.cardText}; 
  border: none; 
  background: transparent; 
  border-radius: 0; 
  padding: 0 2rem 0 0.5rem; 
  width: 100%; 
  box-sizing: border-box; 
  text-align: center; 
  margin-top: 0.5rem; 
  font-size: 2rem;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);

  &:focus {
    outline: none; 
    border: none; 
    background: transparent; 
  }

  &::placeholder {
    color: transparent; 
  }
`;

const EditIcon = styled(FaEdit)`
  position: absolute;
  right: 0.5rem; 
  color: ${({ theme }) => theme.text}; 
  cursor: pointer; 
  font-size: 1.25rem; 
`;

const DeleteIcon = styled(FaTrash)`
  position: absolute;
  right: 2.5rem; 
  color: ${({ theme }) => theme.danger}; 
  cursor: pointer; 
  font-size: 1.25rem; 
`;

const RoutineTemplate = ({ routine, token, onSelect, onSave, onDelete }) => {
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
        if (onSave) onSave(data); 
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Error saving routine');
      }
    } catch (error) {
      console.error('Error submitting request:', error);
      alert('Error submitting request');
    }
  };

  const handleDeleteRoutine = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_NAME}/users/me/routine-templates`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name: updatedRoutine.name }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message || 'Routine deleted successfully');
        if (onDelete) onDelete(updatedRoutine._id);
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Error deleting routine');
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
        <DeleteIcon onClick={handleDeleteRoutine} />
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
