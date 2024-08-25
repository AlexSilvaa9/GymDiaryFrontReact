import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import Routine from './Routine';
import styled from 'styled-components';
import Loading from '../Loading'; // Asegúrate de importar el componente de carga
import CalendarWrapper from '../utils/CalendarWrapper';
// Styled Components
const HistoryWrapper = styled.div`
  align-items: center;
 
  color: ${({ theme }) => theme.text}; /* Texto general */
`;


const NoRoutinesMessage = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.text}; /* Texto del mensaje de ausencia de rutinas */
  font-size: 1.2rem;
  margin-top: 2rem;
  background-color: ${({ theme }) => theme.secondaryBackground}; /* Fondo del mensaje */
  padding: 1rem;
  border-radius: 8px;
`;

const API_URL = process.env.REACT_APP_SERVER_NAME;

const History = () => {
  const [date, setDate] = useState(new Date());
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const formattedDate = formatDate(date);

    const fetchRoutines = async () => {
      try {
        setLoading(true); // Mostrar el loading al comenzar la carga
        const response = await axios.get(`${API_URL}/users/me/routines?date=${formattedDate}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        const data = response.data || [];
        setRoutines(data);
      } catch (error) {
        console.error("Error al cargar el historial:", error);
        setRoutines([]);
      } finally {
        setLoading(false); // Ocultar el loading después de la carga
      }
    };

    fetchRoutines();
  }, [date]);

  const handleDeleteRoutine = (routineId) => {
    console.log(`Eliminar rutina con ID: ${routineId}`);
  };

  return (
    <HistoryWrapper>
      <CalendarWrapper>
        <Calendar onChange={setDate} value={date} />
      </CalendarWrapper>
      <div>
        <h2 style={{ textAlign: 'center' }}>
          Routines on {date.toDateString()}
        </h2>
        {loading ? (
          <Loading /> // Mostrar el loading mientras se cargan las rutinas
        ) : (
          routines.length > 0 ? (
            routines.map(routine => (
              <Routine 
                key={routine._id} 
                routine={routine} 
                onDelete={handleDeleteRoutine} 
              />
            ))
          ) : (
            <NoRoutinesMessage>No routines found on this date.</NoRoutinesMessage>
          )
        )}
      </div>
    </HistoryWrapper>
  );
};

export default History;
