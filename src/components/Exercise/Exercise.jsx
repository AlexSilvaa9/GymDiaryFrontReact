// src/components/Exercise.js
import React, { useState } from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Container = styled.div`
  padding: 2rem;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

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

  &:hover {
    background: ${({ theme }) => theme.tertiary};
  }
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  margin: auto;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  & > input {
    margin-bottom: 0.5rem;
  }
`;

const Input = styled.input`
  background-color: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 5px;
  padding: 0.75rem;
  width: 100%;
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

const CalendarWrapper = styled.div`
  margin: 2rem 0;
  display: flex;
  justify-content: center;

  .react-calendar {
    border: none;
    background: ${({ theme }) => theme.cardBackground};
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

const ExerciseList = styled.ul`
  width: 100%;
  max-width: 600px;
  margin-top: 2rem;
  list-style-type: none;
  padding: 0;
  margin: auto;
`;

const ExerciseItem = styled.li`
  background-color: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.text};
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 0.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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

const Exercise = () => {
  const [activeTab, setActiveTab] = useState('viewExercises');
  const [exerciseName, setExerciseName] = useState('');
  const [duration, setDuration] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [exerciseLog, setExerciseLog] = useState({});

  const handleAddExercise = () => {
    if (exerciseName && duration) {
      const dateKey = selectedDate;
      const newLog = {
        ...exerciseLog,
        [dateKey]: [
          ...(exerciseLog[dateKey] || []),
          { name: exerciseName, duration: parseInt(duration) },
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
    setSelectedDate(date.toISOString().split('T')[0]);
  };

  const exercisesForSelectedDate = exerciseLog[selectedDate] || [];

  return (
    <Container>
      <TabContainer>
        <TabButton
          active={activeTab === 'viewExercises'}
          onClick={() => setActiveTab('viewExercises')}
        >
          View Exercises
        </TabButton>
        <TabButton
          active={activeTab === 'addExercise'}
          onClick={() => setActiveTab('addExercise')}
        >
          Add Exercise
        </TabButton>
      </TabContainer>

      {activeTab === 'viewExercises' ? (
        <>
          <CalendarWrapper>
            <Calendar
              onChange={handleDateChange}
              value={new Date(selectedDate)}
            />
          </CalendarWrapper>

          <ExerciseList>
            <h2>Exercises for {new Date(selectedDate).toDateString()}</h2>
            {exercisesForSelectedDate.length === 0 ? (
              <ExerciseItem>No exercises for this day.</ExerciseItem>
            ) : (
              exercisesForSelectedDate.map((exercise, index) => (
                <ExerciseItem key={index}>
                  {`${exercise.name}: ${exercise.duration} min`}
                  <RemoveButton onClick={() => handleRemoveExercise(selectedDate, index)}>Remove</RemoveButton>
                </ExerciseItem>
              ))
            )}
          </ExerciseList>
        </>
      ) : (
        <Form>
          <InputGroup>
            <Input
              type="text"
              placeholder="Exercise Name"
              value={exerciseName}
              onChange={(e) => setExerciseName(e.target.value)}
              required
            />
            <Input
              type="number"
              placeholder="Duration (min)"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />
          </InputGroup>
          <Button onClick={handleAddExercise}>Add Exercise</Button>
        </Form>
      )}
    </Container>
  );
};

export default Exercise;
