import React, { useState } from 'react';
import styled from 'styled-components';

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
  color: ${({ theme }) => theme.primary};
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
`;

const Nutrition = () => {
  const [meals, setMeals] = useState([]);
  const [recipe, setRecipe] = useState('');
  const [calories, setCalories] = useState('');

  const handleAddMeal = () => {
    if (recipe && calories) {
      setMeals([...meals, { recipe, calories }]);
      setRecipe('');
      setCalories('');
    }
  };

  return (
    <Container>
      <Section>
        <Title>Comida de Hoy</Title>
        <div>
          <Input
            type="text"
            placeholder="Receta"
            value={recipe}
            onChange={(e) => setRecipe(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Calorías"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
          />
        </div>
        <Button onClick={handleAddMeal}>Añadir Comida</Button>
        <ul>
          {meals.map((meal, index) => (
            <ListItem key={index}>{`${meal.recipe}: ${meal.calories} Calorías`}</ListItem>
          ))}
        </ul>
      </Section>
    </Container>
  );
};

export default Nutrition;
