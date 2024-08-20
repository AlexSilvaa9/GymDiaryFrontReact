import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Routine from './Routine_template'; // Asegúrate de importar el componente Routine

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
  const [selectedRoutine, setSelectedRoutine] = useState(null);
  const [newRoutine, setNewRoutine] = useState({ name: '', exercises: [] });
  const [activeTab, setActiveTab] = useState('list');

  const API_URL = process.env.REACT_APP_SERVER_NAME; // Usa REACT_APP_ como prefijo

  useEffect(() => {
    const fetchRoutines = async () => {
      try {
        const token = localStorage.getItem('token'); // Obtener el token desde localStorage
        const response = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${token}` } // Enviar el token en el encabezado
        });
        setRoutines(response.data);
      } catch (error) {
        console.error('Error fetching routines:', error);
      }
    };

    fetchRoutines();
  }, []);

  const handleAddRoutine = async () => {
    if (!newRoutine.name.trim()) return;

    try {
      const token = localStorage.getItem('token'); // Obtener el token desde localStorage
      const response = await axios.post(API_URL, newRoutine, {
        headers: { Authorization: `Bearer ${token}` } // Enviar el token en el encabezado
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
      const token = localStorage.getItem('token'); // Obtener el token desde localStorage
      await axios.delete(API_URL, {
        headers: { Authorization: `Bearer ${token}` }, // Enviar el token en el encabezado
        data: { name } // Enviar el nombre en el cuerpo de la solicitud
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
      <TabContainer>
        <TabButton
          active={activeTab === 'list'}
          onClick={() => setActiveTab('list')}
        >
          Routine List
        </TabButton>
        <TabButton
          active={activeTab === 'add'}
          onClick={() => setActiveTab('add')}
        >
          Add Routine
        </TabButton>
      </TabContainer>

      {activeTab === 'list' && (
        <div>
          {routines.map(routine => (
            <Routine
              key={routine._id}
              routine={routine}
              token={localStorage.getItem('token')}
              onEdit={() => handleEditRoutine(routine)}
              onDelete={() => handleDeleteRoutine(routine.name)}
            />
          ))}
        </div>
      )}

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
    </div>
  );
};

export default RoutineManager;
