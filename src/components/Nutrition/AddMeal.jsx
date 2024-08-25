import React from 'react';
import styled from 'styled-components';
import Button from '../utils/GradientButton';
// Styled Components
const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  margin-bottom: 2rem;
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  width: 100%;
`;

const Label = styled.label`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.secondaryText};
  margin-bottom: 0.25rem;
`;

const Input = styled.input`
  background-color: ${({ theme }) => theme.cardInput};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 5px;
  padding: 0.75rem;
  margin-bottom: 1rem;
  width: 100%;
  box-sizing: border-box;

  &::placeholder {
    color: ${({ theme }) => theme.secondaryText};
  }
`;




const MealForm = ({ mealName, setMealName, calories, setCalories, protein, setProtein, carbs, setCarbs, fats, setFats, handleAddMeal }) => (
  <Form>
    <InputGroup>
      <Label htmlFor="mealName">Meal Name</Label>
      <Input
        id="mealName"
        type="text"
        placeholder="Meal Name"
        value={mealName}
        onChange={(e) => setMealName(e.target.value)}
        required
      />
      <Label htmlFor="calories">Calories</Label>
      <Input
        id="calories"
        type="number"
        placeholder="Calories"
        value={calories}
        onChange={(e) => setCalories(e.target.value || '0')}
        required
      />
      <Label htmlFor="protein">Protein (g)</Label>
      <Input
        id="protein"
        type="number"
        placeholder="Protein (g)"
        value={protein}
        onChange={(e) => setProtein(e.target.value || '0')}
        required
      />
      <Label htmlFor="carbs">Carbs (g)</Label>
      <Input
        id="carbs"
        type="number"
        placeholder="Carbs (g)"
        value={carbs}
        onChange={(e) => setCarbs(e.target.value || '0')}
        required
      />
      <Label htmlFor="fats">Fats (g)</Label>
      <Input
        id="fats"
        type="number"
        placeholder="Fats (g)"
        value={fats}
        onChange={(e) => setFats(e.target.value || '0')}
        required
      />
    </InputGroup>
    <Button onClick={handleAddMeal}>Add Meal</Button>
  </Form>
);

export default MealForm;
