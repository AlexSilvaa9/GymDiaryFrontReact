import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import Routine from './Routine'; // Importa el componente Routine
import styled from 'styled-components'; // Asegúrate de importar styled-components

const HistoryWrapper = styled.div`  
  
  align-items: center;

`;
const CalendarWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem 0;

  .react-calendar {
    border: none;
    background: transparent;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
  }

  .react-calendar__tile {
    border-radius: 4px;
    padding: 0.5rem;
    font-size: 0.9rem;
    transition: background-color 0.3s ease;
  }

  .react-calendar__tile--active {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text};
  }

  .react-calendar__tile--hasActive {
    background: ${({ theme }) => theme.secondary};
  }

  .react-calendar__month-view__days__day {
    color: ${({ theme }) => theme.text};
  }
`;
const API_URL = process.env.REACT_APP_SERVER_NAME; // Usa REACT_APP_ como prefijo

const History = () => {
  const [date, setDate] = useState(new Date());
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    // Función para formatear la fecha en formato 'YYYY-MM-DD'
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Añade un 0 al mes si es menor a 10
      const day = String(date.getDate()).padStart(2, '0'); // Añade un 0 al día si es menor a 10
      return `${year}-${month}-${day}`;
    };

    const formattedDate = formatDate(date);

    console.log(`Requesting routines for date: ${formattedDate}`); // Debug: Verifica la fecha de la solicitud

    axios.get(`${API_URL}/users/me/routines?date=${formattedDate}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(response => {
      const data = response.data || [];
      console.log('Routines fetched:', data); // Debug: Verifica los datos recibidos
      setRoutines(data);
    })
    .catch(error => {
      console.error("Error al cargar el historial:", error);
      setRoutines([]); // Establece como array vacío en caso de error
    });
  }, [date]);

  const handleDeleteRoutine = (routineId) => {
    console.log(`Eliminar rutina con ID: ${routineId}`); // Debug: Verifica el ID de la rutina a eliminar
  };

  return (
    <HistoryWrapper>
     
      <CalendarWrapper>
        <Calendar onChange={setDate} value={date} />
      </CalendarWrapper>
      <div>
        <h2 style={{textAlign: 'center'}}>Routines on {date.toDateString()}</h2>
    
        {routines.length > 0 ? (
          routines.map(routine => {
          
            return (
              <Routine 
                key={routine._id} 
                routine={routine.routines} 
                onDelete={handleDeleteRoutine} 
              />
            );
          })
        ) : (
          <p>No routines found on this date.</p>
        )}
      </div>
    </HistoryWrapper>
  );
};

export default History;
