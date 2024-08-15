import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Exercises = () => {
  const [exercises, setExercises] = useState([]);
  const [newExerciseName, setNewExerciseName] = useState('');
  const [newVersion, setNewVersion] = useState({ sets: '', reps: '', weight: '' });

  useEffect(() => {
    // Cargar ejercicios al montar el componente
    axios.get('/users/me/exercises', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(response => setExercises(response.data))
    .catch(error => console.error("Error al cargar los ejercicios:", error));
  }, []);

  const addExercise = (name) => {
    const exercise = { name, versions: [] };
    axios.post('/users/me/exercises', exercise, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(response => {
      setExercises([...exercises, exercise]);
      setNewExerciseName('');
    })
    .catch(error => console.error("Error al añadir el ejercicio:", error));
  };

  const addVersion = (exerciseId) => {
    const exercise = exercises.find(ex => ex.id === exerciseId);
    const nextVersion = exercise.versions.length + 1;
    const versionToAdd = { ...newVersion, version: nextVersion };

    const updatedExercise = {
      ...exercise,
      versions: [...exercise.versions, versionToAdd]
    };

    axios.put(`/users/me/exercises/${exerciseId}`, updatedExercise, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(response => {
      setExercises(exercises.map(ex => ex.id === exerciseId ? updatedExercise : ex));
      setNewVersion({ sets: '', reps: '', weight: '' });
    })
    .catch(error => console.error("Error al actualizar el ejercicio:", error));
  };

  const deleteExercise = (exerciseId) => {
    axios.delete(`/users/me/exercises/${exerciseId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(response => {
      setExercises(exercises.filter(ex => ex.id !== exerciseId));
    })
    .catch(error => console.error("Error al eliminar el ejercicio:", error));
  };

  return (
    <div>
      <h2>Exercises</h2>
      <div>
        <input 
          type="text" 
          value={newExerciseName} 
          onChange={(e) => setNewExerciseName(e.target.value)} 
          placeholder="New Exercise Name" 
        />
        <button onClick={() => addExercise(newExerciseName)}>Add Exercise</button>
      </div>
      
      {exercises.map(ex => (
        <div key={ex.id}>
          <h3>{ex.name}</h3>
          {ex.versions.map(v => (
            <div key={v.version}>
              <p>Version: {v.version}, Sets: {v.sets}, Reps: {v.reps}, Weight: {v.weight}</p>
            </div>
          ))}
          <button onClick={() => deleteExercise(ex.id)}>Delete Exercise</button>
        </div>
      ))}
    </div>
  );
};

export default Exercises;
