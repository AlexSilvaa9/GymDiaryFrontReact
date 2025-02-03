import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../utils/GradientButton'; // Importa el botón con gradiente

// Imágenes de la llama en formato GIF
import FlameGif from '../../Assets/streak.gif'; // Imagen GIF de la llama cuando estás en racha

const PreferencesPage = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: ${({ theme }) => theme.background};
  padding: 20px;
`;

const SectionTitle = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  color: ${({ theme }) => theme.text};
  margin-bottom: 1rem;
`;

const PreferencesSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 2rem 0;
  color: ${({ theme }) => theme.text};
`;

const PreferencesLabel = styled.label`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.text};
`;

const PreferencesInput = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
`;

const RachaWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 2rem;
`;

const RachaText = styled.p`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.text};
`;

const RachaImage = styled.img`
  max-width: 100px;
  margin-top: 1rem;
`;

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const PreferencesForm = () => {
  const [gymRacha, setGymRacha] = useState(0);
  const [comidaRacha, setComidaRacha] = useState(0);
  const [gymDays, setGymDays] = useState(0);
  const [calories, setCalories] = useState(0);

  const handleGymChange = (e) => {
    setGymDays(e.target.value);
  };

  const handleCaloriesChange = (e) => {
    setCalories(e.target.value);
  };

  const checkGymRacha = () => {
    // Lógica para verificar racha de gym
    if (gymDays >= 3) {
      setGymRacha(gymRacha + 1);
    }
  };

  const checkComidaRacha = () => {
    // Lógica para verificar racha de comida
    if (calories >= 2000) {
      setComidaRacha(comidaRacha + 1);
    }
  };

  return (
    <PreferencesPage>
      <SectionTitle>Your Preferences</SectionTitle>

      <PreferencesSection>
        <PreferencesLabel>Gym Days per Week:</PreferencesLabel>
        <PreferencesInput
          type="number"
          value={gymDays}
          onChange={handleGymChange}
          min="0"
          max="7"
        />
        <Button onClick={checkGymRacha}>Check Gym Racha</Button>
      </PreferencesSection>

      <PreferencesSection>
        <PreferencesLabel>Calories per Day:</PreferencesLabel>
        <PreferencesInput
          type="number"
          value={calories}
          onChange={handleCaloriesChange}
          min="0"
        />
        <Button onClick={checkComidaRacha}>Check Food Racha</Button>
      </PreferencesSection>

      <FormWrapper>
        <RachaWrapper>
          <RachaText>
            Gym Racha: {gymRacha} {gymRacha > 0 && '🔥'}
          </RachaText>
          {gymRacha > 0 && <RachaImage src={FlameGif} alt="Flame" />}
        </RachaWrapper>

        <RachaWrapper>
          <RachaText>
            Food Racha: {comidaRacha} {comidaRacha > 0 && '🔥'}
          </RachaText>
          {comidaRacha > 0 && <RachaImage src={FlameGif} alt="Flame" />}
        </RachaWrapper>
      </FormWrapper>
    </PreferencesPage>
  );
};

export default PreferencesForm;
