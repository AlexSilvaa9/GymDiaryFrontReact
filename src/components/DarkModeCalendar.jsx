// src/components/DarkModeCalendar.jsx
import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import styled from 'styled-components';

const CalendarContainer = styled.div`
  background-color: #1a202c; /* Fondo oscuro */
  color: #a0aec0; /* Texto claro */
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  max-width: 400px;
  margin: 0 auto;
`;

const CalendarWrapper = styled.div`
  .rdp {
    --rdp-cell-size: 40px;
    --rdp-background-color: #2d3748;
    --rdp-accent-color: #4a5568;
    --rdp-accent-color-dark: #2c5282;
    --rdp-background-color-hover: #4a5568;
    --rdp-background-color-hover-dark: #2d3748;
    --rdp-background-color-selected: #2c5282;
    --rdp-background-color-selected-hover: #2b6cb0;
    --rdp-color: #a0aec0;
  }
`;

const DarkModeCalendar = () => {
  const [selectedDay, setSelectedDay] = useState(null);

  return (
    <CalendarContainer>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Select a Date</h1>
      <CalendarWrapper>
        <DayPicker
          mode="single"
          selected={selectedDay}
          onSelect={setSelectedDay}
        />
      </CalendarWrapper>
      {selectedDay && (
        <p style={{ marginTop: '1rem' }}>
          You selected {selectedDay.toLocaleDateString()}
        </p>
      )}
    </CalendarContainer>
  );
};

export default DarkModeCalendar;
