import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Exercise from './Exercise';

const RoutineContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 300px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  background-color: ${({ theme }) => theme.backgroundLight};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
  background: ${({ theme, variant }) => 
    variant === 'delete' ? theme.danger : theme.primary};
  color: ${({ theme }) => theme.text};
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

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

  &:not(:last-child) {
    margin-right: 1rem;
  }
`;

const RoutineTitle = styled.input`
  font-size: 1.25rem;
  font-weight: bold;
  color: ${({ theme }) => theme.primary};
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.backgroundLight};
  border-radius: 8px;
  margin-bottom: 1rem;
  padding: 0.5rem;
  width: 100%;
  box-sizing: border-box;
  text-align: center;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;
const API_URL = process.env.REACT_APP_SERVER_NAME; // Usa REACT_APP_ como prefijo

const Routine_Template = ({ routine, token, onSave }) => {
    const [updatedRoutine, setUpdatedRoutine] = useState(routine);

    useEffect(() => {
        setUpdatedRoutine(routine);
    }, [routine]);

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

    const handleSaveRoutine = async () => {
        try {
            const response = await fetch(`${API_URL}/users/me/routine-templates`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(updatedRoutine),
            });

            if (response.ok) {
                const data = await response.json();
                alert(data.message || 'Rutina guardada correctamente');
                if (onSave) onSave();
            } else {
                const errorData = await response.json();
                alert(errorData.message || 'Error al guardar la rutina');
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
            const response = await fetch(`${API_URL}/users/me/routine-templates`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ name: updatedRoutine.name, date: updatedRoutine.date }),
            });

            if (response.ok) {
                const data = await response.json();
                alert(data.message || 'Rutina eliminada correctamente');
                if (onSave) onSave();
            } else {
                const errorData = await response.json();
                alert(errorData.message || 'Error al eliminar la rutina');
            }
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
            alert('Error al enviar la solicitud');
        }
    };

    const handleNameChange = (event) => {
        setUpdatedRoutine({
            ...updatedRoutine,
            name: event.target.value,
        });
    };

    return (
      <RoutineContainer>
        <RoutineTitle
          value={updatedRoutine.name}
          onChange={handleNameChange}
        />
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
          <Button onClick={handleSaveRoutine}>Save Routine</Button>
          <Button variant="delete" onClick={handleDeleteRoutine}>Delete Routine</Button>
        </div>
      </RoutineContainer>
    );
};

export default Routine_Template;