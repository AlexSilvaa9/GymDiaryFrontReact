import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import Routine from './Routine';
import styled from 'styled-components';
import Loading from '../Loading'; // Asegúrate de importar el componente de carga

// Styled Components
const HistoryWrapper = styled.div`
  align-items: center;
 
  color: ${({ theme }) => theme.text}; /* Texto general */
`;

const CalendarWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem 0;

  .react-calendar {
    border: none;
    background: ${({ theme }) => theme.calendarBackground}; /* Fondo del calendario */
    color: ${({ theme }) => theme.calendarText}; /* Texto del calendario */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
  }

  .react-calendar__tile {
    border-radius: 4px;
    padding: 0.5rem;
    font-size: 0.9rem;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  .react-calendar__tile--active {
    background: ${({ theme }) => theme.primary}; /* Fondo para la fecha activa */
    color: ${({ theme }) => theme.text}; /* Texto para la fecha activa */
  }

  .react-calendar__tile--active:hover {
    background: ${({ theme }) => theme.primary}; /* Fondo para la fecha activa al hacer hover */
    color: ${({ theme }) => theme.text}; /* Texto para la fecha activa al hacer hover */
  }

  .react-calendar__tile--hasActive {
    background: ${({ theme }) => theme.secondary}; /* Fondo para las fechas con eventos */
  }

  .react-calendar__tile--hasActive:hover {
    background: ${({ theme }) => theme.secondary}; /* Fondo para las fechas con eventos al hacer hover */
    color: ${({ theme }) => theme.text}; /* Texto para las fechas con eventos al hacer hover */
  }

  .react-calendar__tile:hover {
    background: ${({ theme }) => theme.hoverBackground}; /* Fondo para los días al hacer hover */
    color: ${({ theme }) => theme.hoverText}; /* Texto para los días al hacer hover */
  }

  .react-calendar__month-view__days__day {
    color: ${({ theme }) => theme.calendarText}; /* Texto de los días del mes */
  }

  .react-calendar__navigation__label {
    color: ${({ theme }) => theme.calendarText}; /* Texto de los encabezados de mes/año */
  }

  .react-calendar__navigation__arrow {
    fill: ${({ theme }) => theme.calendarText}; /* Flechas de navegación */
  }
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