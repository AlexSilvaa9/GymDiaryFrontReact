import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const scale = 6;

const ExerciseCard = styled.div`
  background-color: ${({ theme }) => theme.background};
  padding: ${0.225 * scale}rem;
  border-radius: ${0.15 * scale}rem;
  box-shadow: 0 ${0.8 * scale}rem ${1.6 * scale}rem rgba(0, 0, 0, 0.15);
  margin: ${0.15 * scale}rem 0;
  display: flex;
  flex-direction: column;
  gap: ${0.15 * scale}rem;
  width: 100%;
  box-sizing: border-box;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-${0.5 * scale}rem);
    box-shadow: 0 ${1 * scale}rem ${2 * scale}rem rgba(0, 0, 0, 0.2);
  }
`;


const ExerciseTitle = styled.h3`
  margin: 0;
  font-size: ${0.1875 * scale}rem;
  color: ${({ theme }) => theme.primary};
`;

const TextInput = styled.input`
  padding: ${0.075 * scale}rem;
  border-radius: ${0.05 * scale}rem;
  font-size: ${0.125 * scale}rem;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.3s ease;

`;

const CheckboxInput = styled.input`
  width: ${0.25 * scale}rem;
  height: ${0.25 * scale}rem;
  cursor: pointer;
  margin-right: ${0.15 * scale}rem;
`;

const FieldLabel = styled.label`
  font-size: ${0.13125 * scale}rem;
  color: ${({ theme }) => theme.text};
  margin-bottom: ${0.0375 * scale}rem;
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${0.1125 * scale}rem;
`;

const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  font-size: ${0.125 * scale}rem;
  color: ${({ theme }) => theme.text};
`;

const Exercise = ({ exercise, onChange }) => {
  const [exerciseInfo, setExerciseInfo] = useState({
    name: '',
    sets: '',
    reps: '',
    weight: '',
    done: false,
  });

  const [temporalExercise, setTemporalExercise] = useState(exerciseInfo);

  useEffect(() => {
    setTemporalExercise(exercise);
  }, [exercise]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTemporalExercise((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    onChange({ ...temporalExercise, [name]: type === 'checkbox' ? checked : value });
  };

  return (
    <ExerciseCard>
      <ExerciseTitle>{temporalExercise.name || 'Exercise'}</ExerciseTitle>
      <FieldContainer>
        <div>
          <FieldLabel htmlFor="name">Exercise Name:</FieldLabel>
          <TextInput
            id="name"
            type="text"
            name="name"
            placeholder="Exercise Name"
            value={temporalExercise.name}
            onChange={handleChange}
            className={temporalExercise.name ? 'filled' : 'empty'}
          />
        </div>
        <div>
          <FieldLabel htmlFor="sets">Sets:</FieldLabel>
          <TextInput
            id="sets"
            type="text"
            name="sets"
            placeholder="Sets"
            value={temporalExercise.sets}
            onChange={handleChange}
            className={temporalExercise.sets ? 'filled' : 'empty'}
          />
        </div>
        <div>
          <FieldLabel htmlFor="reps">Repetitions:</FieldLabel>
          <TextInput
            id="reps"
            type="text"
            name="reps"
            placeholder="Repetitions"
            value={temporalExercise.reps}
            onChange={handleChange}
            className={temporalExercise.reps ? 'filled' : 'empty'}
          />
        </div>
        <div>
          <FieldLabel htmlFor="weight">Kilos:</FieldLabel>
          <TextInput
            id="weight"
            type="text"
            name="weight"
            placeholder="Kilos"
            value={temporalExercise.weight}
            onChange={handleChange}
            className={temporalExercise.weight ? 'filled' : 'empty'}
          />
        </div>
      </FieldContainer>
      <CheckboxContainer>
        <CheckboxInput
          type="checkbox"
          name="done"
          checked={temporalExercise.done}
          onChange={handleChange}
        />
        Completed
      </CheckboxContainer>
    </ExerciseCard>
  );
};

export default Exercise;
