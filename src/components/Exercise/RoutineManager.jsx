import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RoutineManager = () => {
  const [routines, setRoutines] = useState([]);
  const [newRoutineName, setNewRoutineName] = useState('');
  const [newRoutineExercises, setNewRoutineExercises] = useState('');

  useEffect(() => {
    // Cargar rutinas al montar el componente
    axios.get('/users/me/routines', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(response => setRoutines(response.data))
    .catch(error => console.error("Error al cargar las rutinas:", error));
  }, []);

  const addRoutine = () => {
    const routine = {
      name: newRoutineName,
      exercises: newRoutineExercises.split(',').map(ex => ex.trim()),
      dates_of_execution: []
    };

    axios.post('/users/me/routines', routine, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(response => {
      setRoutines([...routines, routine]);
      setNewRoutineName('');
      setNewRoutineExercises('');
    })
    .catch(error => console.error("Error al añadir la rutina:", error));
  };

  const deleteRoutine = (routineId) => {
    axios.delete(`/users/me/routines/${routineId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(response => {
      setRoutines(routines.filter(routine => routine._id !== routineId));
    })
    .catch(error => console.error("Error al eliminar la rutina:", error));
  };

  return (
    <div>
      <h2>Routine Manager</h2>
      <div>
        <input 
          type="text" 
          value={newRoutineName} 
          onChange={(e) => setNewRoutineName(e.target.value)} 
          placeholder="New Routine Name" 
        />
        <input 
          type="text" 
          value={newRoutineExercises} 
          onChange={(e) => setNewRoutineExercises(e.target.value)} 
          placeholder="Exercises (comma-separated)" 
        />
        <button onClick={addRoutine}>Add Routine</button>
      </div>
      
      {routines.map(routine => (
        <div key={routine._id}>
          <h3>{routine.name}</h3>
          <p>Exercises: {routine.exercises.join(', ')}</p>
          <button onClick={() => deleteRoutine(routine._id)}>Delete Routine</button>
        </div>
      ))}
    </div>
  );
};

export default RoutineManager;
