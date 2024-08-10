import React, { useState } from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Container = styled.div`
  padding: 2rem;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  height: 100%;
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  background-color: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 5px;
  padding: 0.5rem;
  margin-right: 0.5rem;
  width: calc(50% - 1rem);

  &::placeholder {
    color: ${({ theme }) => theme.placeholder};
  }
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text};
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 1rem;

  &:hover {
    background-color: ${({ theme }) => theme.secondary};
  }
`;

const ListItem = styled.li`
  margin: 0.5rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RemoveButton = styled.button`
  background-color: ${({ theme }) => theme.danger};
  color: ${({ theme }) => theme.text};
  border: none;
  padding: 0.3rem 0.6rem;
  font-size: 0.8rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.dangerHover};
  }
`;

const CalendarWrapper = styled.div`
  margin: 2rem 0;
`;

const Exercise = () => {
  const [exercises, setExercises] = useState([]);
  const [exerciseName, setExerciseName] = useState('');
  const [duration, setDuration] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [exerciseLog, setExerciseLog] = useState({});

  const handleAddExercise = () => {
    if (exerciseName && duration) {
      const dateKey = selectedDate.toISOString().split('T')[0];
      const newLog = {
        ...exerciseLog,
        [dateKey]: [
          ...(exerciseLog[dateKey] || []),
          { name: exerciseName, duration },
        ],
      };
      setExerciseLog(newLog);
      setExerciseName('');
      setDuration('');
    }
  };

  const handleRemoveExercise = (date, index) => {
    const updatedLog = { ...exerciseLog };
    updatedLog[date] = updatedLog[date].filter((_, i) => i !== index);
    if (updatedLog[date].length === 0) delete updatedLog[date];
    setExerciseLog(updatedLog);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const dateKey = selectedDate.toISOString().split('T')[0];
  const exercisesForSelectedDate = exerciseLog[dateKey] || [];

  return (
    <Container>
      <Section>
        <Title>Mi Registro de Ejercicios</Title>
        <div>
          <Input
            type="text"
            placeholder="Ejercicio"
            value={exerciseName}
            onChange={(e) => setExerciseName(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Duración (min)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>
        <Button onClick={handleAddExercise}>Añadir Ejercicio</Button>
      </Section>
      <CalendarWrapper>
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
        />
      </CalendarWrapper>
      <Section>
        <Title>Ejercicios del {dateKey}</Title>
        <ul>
          {exercisesForSelectedDate.length === 0 ? (
            <ListItem>No hay ejercicios para este día.</ListItem>
          ) : (
            exercisesForSelectedDate.map((exercise, index) => (
              <ListItem key={index}>
                {`${exercise.name}: ${exercise.duration} min`}
                <RemoveButton onClick={() => handleRemoveExercise(dateKey, index)}>Eliminar</RemoveButton>
              </ListItem>
            ))
          )}
        </ul>
      </Section>
    </Container>
  );
};

export default Exercise;
