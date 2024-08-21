import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import RoutineTemplate from './RoutineTemplate';

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

const RoutineManager = () => {
  const [routines, setRoutines] = useState([]);
  const [selectedRoutine, setSelectedRoutine] = useState(null);
  const [newRoutine, setNewRoutine] = useState({ name: '', exercises: [] });
  const [activeTab, setActiveTab] = useState('list');

  const API_URL = `${process.env.REACT_APP_SERVER_NAME}/users/me/routine-templates`;

  useEffect(() => {
    const fetchRoutines = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRoutines(response.data);
      } catch (error) {
        console.error('Error fetching routines:', error);
      }
    };

    fetchRoutines();
  }, []);

  const handleRoutineChange = (updatedRoutine) => {
    setNewRoutine(updatedRoutine);
  };

  const handleAddRoutine = async (routine) => {
    if (!routine?.name?.trim()) {
      alert("Routine name cannot be empty");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(API_URL, routine, {
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

  const handleDeleteRoutine = async (routineId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/${routineId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Eliminar la rutina del estado local
      setRoutines(prevRoutines => prevRoutines.filter(routine => routine._id !== routineId));
      setSelectedRoutine(null);
      setActiveTab('list'); // Vuelve a la lista después de eliminar
    } catch (error) {
      console.error('Error deleting routine:', error);
    }
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
            <RoutineTemplate
              key={routine._id}
              routine={routine}
              token={localStorage.getItem('token')}
              onSave={(updatedRoutine) => {
                setRoutines(prevRoutines =>
                  prevRoutines.map(r =>
                    r._id === updatedRoutine._id ? updatedRoutine : r
                  )
                );
                setActiveTab('list');
              }}
              onChange={handleRoutineChange}
              onDelete={handleDeleteRoutine}
            />
          ))}
        </div>
      )}

      {activeTab === 'add' && (
        <div>
          <RoutineTemplate
            routine={newRoutine}
            token={localStorage.getItem('token')}
            onSave={(newRoutine) => {
              setRoutines(prevRoutines => [...prevRoutines, newRoutine]);
              setNewRoutine({ name: '', exercises: [] });
              setActiveTab('list');
            }}
            onChange={handleRoutineChange}
          />
        </div>
      )}
    </div>
  );
};

export default RoutineManager;
