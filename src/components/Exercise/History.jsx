import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

const History = () => {
  const [date, setDate] = useState(new Date());
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    // Formatear la fecha seleccionada para que sea compatible con el formato de la API (YYYY-MM-DD)
    const formattedDate = date.toISOString().split('T')[0];

    axios.get(`/users/me/history?date=${formattedDate}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(response => {
      setRoutines(response.data);
    })
    .catch(error => {
      console.error("Error al cargar el historial:", error);
      setRoutines([]); // Reinicia la lista si hay un error
    });
  }, [date]);

  return (
    <div>
      <h2>History</h2>
      <Calendar onChange={setDate} value={date} />
      <div>
        <h3>Routines on {date.toDateString()}</h3>
        {routines.length > 0 ? (
          routines.map(routine => (
            <div key={routine._id}>
              <h4>{routine.name}</h4>
              <p>Exercises: {routine.exercises.join(', ')}</p>
            </div>
          ))
        ) : (
          <p>No routines found on this date.</p>
        )}
      </div>
    </div>
  );
};

export default History;
