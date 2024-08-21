import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Routine from './Routine'; // Ensure the filename and import match
import RoutineTemplate from './RoutineTemplate'; // Ensure the filename and import match
import Loading from '../Loading';
// Main component
const Today = () => {
  const [routines, setRoutines] = useState([]);
  const [routineTemplates, setRoutineTemplates] = useState([]);
  const [hasRoutineAssigned, setHasRoutineAssigned] = useState(false);
  const [date, setDate] = useState(new Date()); // State variable for the date
  const [loading, setLoading] = useState(true);
  const API_URL = `${process.env.REACT_APP_SERVER_NAME}/users/me/routines`; // URL for daily routines
  const TEMPLATES_API_URL = `${process.env.REACT_APP_SERVER_NAME}/users/me/routine-templates`; // URL for templates

  // Function to format the date as 'YYYY-MM-DD'
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Add a 0 to the month if less than 10
    const day = String(date.getDate()).padStart(2, '0'); // Add a 0 to the day if less than 10
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchRoutinesForDate = async () => {
      const formattedDate = formatDate(date);

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
        setHasRoutineAssigned(data.length > 0); // Update the state based on the response
      } catch (error) {
        console.error("Error loading history:", error);
        setRoutines([]); // Set to an empty array in case of error
        setHasRoutineAssigned(false); // Ensure that hasRoutineAssigned is updated in case of error
      } finally {
        setLoading(false); // Ocultar símbolo de carga al finalizar la solicitud
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
        setRoutineTemplates(response.data || []);
      } catch (error) {
        console.error('Error fetching routine templates:', error);
        setRoutineTemplates([]);
      }
    };

    fetchRoutinesForDate();
    if (!hasRoutineAssigned) {
      fetchRoutineTemplates();
    }
  }, [date, hasRoutineAssigned]);

  const handleAddRoutineFromTemplate = async (template) => {
    const formattedDate = formatDate(date);
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await axios.post(API_URL, { ...template, date: formattedDate }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const newRoutine = response.data;
      setRoutines(prevRoutines => [...prevRoutines, newRoutine]);
      setHasRoutineAssigned(true);
    } catch (error) {
      console.error('Error adding routine:', error);
    }
  };

  return (
    <div>
      {loading ? (
        <Loading /> // Mostrar el componente Loading mientras se cargan los datos
      ) : hasRoutineAssigned ? (
        <div>
          {routines.map(routine => (
            <Routine
              key={routine._id} // Ensure the routine _id is unique
              routine={routine}
            />
          ))}
        </div>
      ) : (
        <>
          <h2 style={{ textAlign: 'center' }}>No routines assigned for today.</h2>
          <h4 style={{ textAlign: 'center' }}>Select a template to assign:</h4>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {routineTemplates.map(template => (
              <RoutineTemplate
                key={template._id}
                routine={template}
                onSelect={() => handleAddRoutineFromTemplate(template)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Today;
