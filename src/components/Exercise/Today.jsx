import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Routine from './Routine'; // Asegúrate de que el nombre del archivo y la importación coincidan
import RoutineTemplate from './RoutineTemplate'; // Asegúrate de que el nombre del archivo y la importación coincidan

// Componente principal
const Today = () => {
  const [routines, setRoutines] = useState([]);
  const [routineTemplates, setRoutineTemplates] = useState([]);
  const [hayRutinaAsignada, setHayRutinaAsignada] = useState(false);
  const [date, setDate] = useState(new Date()); // Agregada variable de estado para la fecha

  const API_URL = `${process.env.REACT_APP_SERVER_NAME}/users/me/routines`; // Usa REACT_APP_ como prefijo
  const TEMPLATES_API_URL = `${process.env.REACT_APP_SERVER_NAME}/users/me/routine-templates`; // URL para plantillas

  // Función para formatear la fecha en formato 'YYYY-MM-DD'
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Añade un 0 al mes si es menor a 10
    const day = String(date.getDate()).padStart(2, '0'); // Añade un 0 al día si es menor a 10
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchRoutinesForDate = async () => {
      const formattedDate = formatDate(date);
      console.log(`Requesting routines for date: ${formattedDate}`); // Debug: Verifica la fecha de la solicitud

      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        const response = await axios.get(`${API_URL}?date=${formattedDate}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = response.data || [];
        setRoutines(data);
        setHayRutinaAsignada(data.length > 0); // Actualiza el estado según la respuesta
      } catch (error) {
        console.error("Error al cargar el historial:", error);
        setRoutines([]); // Establece como array vacío en caso de error
        setHayRutinaAsignada(false); // Asegúrate de que hayRutinaAsignada se actualiza en caso de error
      }
    };

    const fetchRoutineTemplates = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        const response = await axios.get(TEMPLATES_API_URL, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Fetched routine templates:', response.data); // Debug: Verifica la respuesta
        setRoutineTemplates(response.data || []);
      } catch (error) {
        console.error('Error fetching routine templates:', error);
        setRoutineTemplates([]);
      }
    };

    fetchRoutinesForDate();
    if (!hayRutinaAsignada) {
      fetchRoutineTemplates();
    }
  }, [date, hayRutinaAsignada]);

  const handleAddRoutine = (routine) => {
    setRoutines(prevRoutines => [...prevRoutines, routine]);
    setHayRutinaAsignada(true);
  };

  return (
    <div>
      {hayRutinaAsignada ? (
        <div>
          {routines.map(routine => (
            <Routine
              key={routine._id} // Asegúrate de que el ID sea único
              routine={routine}
            />
          ))}
        </div>
      ) : (
        <>
          <h2 style={{ textAlign: 'center' }}>No hay rutinas asignadas para hoy.</h2>
          <h4 style={{ textAlign: 'center' }}>Elige entre tus rutinas:</h4>
          <div>
            {routineTemplates.length === 0 ? (
              <p>No hay plantillas de rutina disponibles.</p>
            ) : (
              routineTemplates.map(template => (
                <RoutineTemplate
                  key={template._id}
                  routine={template}
                  token={localStorage.getItem('token')}
                  onSave={handleAddRoutine}
                />
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Today;
