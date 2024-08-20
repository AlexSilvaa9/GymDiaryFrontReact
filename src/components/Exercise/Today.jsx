import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import RoutineTemplate from './Routine_template'; // Asegúrate de importar el componente RoutineTemplate
import Routine from './Routine';

// Estilos para las pestañas
const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

const TabButton = styled.button`
  background: ${({ active, theme }) => (active ? theme.primary : theme.secondary)};
  color: ${({ active, theme }) => (active ? theme.text : theme.secondaryText)};
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
  margin: 0 0.5rem;

  &:hover {
    background: ${({ theme }) => theme.tertiary};
  }
`;

// Estilos para los botones
const Button = styled.button`
  background: ${({ theme, variant }) => 
    variant === 'delete' ? theme.danger : theme.primary};
  color: ${({ theme }) => theme.text};
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
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

// Componente principal
const RoutineManager = () => {
  const [routines, setRoutines] = useState([]);
  const [hayRutinaAsignada, setHayRutinaAsignada] = useState(false);
  const [routinesTemplate, setRoutinesTemplate] = useState([]);
  const [selectedRoutine, setSelectedRoutine] = useState(null);
  const [newRoutine, setNewRoutine] = useState({ name: '', exercises: [] });
  const [activeTab, setActiveTab] = useState('list');
  const [date, setDate] = useState(new Date()); // Agregada variable de estado para la fecha

  const API_URL = process.env.REACT_APP_SERVER_NAME; // Usa REACT_APP_ como prefijo

  // Función para formatear la fecha en formato 'YYYY-MM-DD'
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Añade un 0 al mes si es menor a 10
    const day = String(date.getDate()).padStart(2, '0'); // Añade un 0 al día si es menor a 10
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchRoutinesForDate = () => {
      const formattedDate = formatDate(date);
      console.log(`Requesting routines for date: ${formattedDate}`); // Debug: Verifica la fecha de la solicitud

      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      axios.get(`${API_URL}/users/me/routines?date=${formattedDate}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        const data = response.data || [];
        setRoutines(data);
        setHayRutinaAsignada(data.length > 0); // Actualiza el estado según la respuesta
      })
      .catch(error => {
        console.error("Error al cargar el historial:", error);
        setRoutines([]); // Establece como array vacío en caso de error
        setHayRutinaAsignada(false); // Asegúrate de que hayRutinaAsignada se actualiza en caso de error
      });
    };

    fetchRoutinesForDate();
  }, [date]);

  useEffect(() => {
    const fetchRoutines = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }

        const response = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRoutinesTemplate(response.data || []);
      } catch (error) {
        console.error('Error fetching routine templates:', error);
      }
    };

    fetchRoutines();
  }, []);

  const handleAddRoutine = async () => {
    if (!newRoutine.name.trim()) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      const response = await axios.post(API_URL, newRoutine, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRoutines(prevRoutines => [...prevRoutines, response.data]);
      setNewRoutine({ name: '', exercises: [] });
      setActiveTab('list');
    } catch (error) {
      console.error('Error adding routine:', error);
    }
  };

  const handleEditRoutine = (routine) => {
    setSelectedRoutine(routine);
    setActiveTab('edit');
  };

  const handleDeleteRoutine = async (name) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      await axios.delete(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
        data: { name }
      });
      setRoutines(prevRoutines => prevRoutines.filter(routine => routine.name !== name));
      setSelectedRoutine(null);
    } catch (error) {
      console.error('Error deleting routine:', error);
    }
  };

  const handleRoutineChange = (updatedRoutine) => {
    setNewRoutine(updatedRoutine);
  };

  return (
    <div>
      {hayRutinaAsignada ? (
        <div>
          {routines.map(routine => (
            <Routine
              key={routine.name} // Agregar key para la lista
              routine={routine}
              token={localStorage.getItem('token')}
              onEdit={() => handleEditRoutine(routine)}
              onDelete={() => handleDeleteRoutine(routine.name)}
            />
          ))}
        </div>
      ) : (
        <div>
          <h2 style={{ textAlign: 'center' }}>No hay rutina asignada para hoy, elige una de las plantillas</h2>
          {activeTab === 'add' && (
            <div>
              <Routine 
                routine={newRoutine} 
                token={localStorage.getItem('token')} 
                onSave={handleAddRoutine} 
                onChange={handleRoutineChange} 
              />
            </div>
          )}
          {/* Mostrar plantilla de rutinas si es necesario */}
          {activeTab === 'list' && (
            <div>
              <RoutineTemplate
                routinesTemplate={routinesTemplate}
                onSelect={(routine) => {
                  setNewRoutine(routine);
                  setActiveTab('add');
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RoutineManager;
