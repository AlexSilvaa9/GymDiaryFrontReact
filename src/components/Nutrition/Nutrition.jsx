import React, { useState } from 'react';
import styled from 'styled-components';
import colors from '../../styles/colors'; // Importa las variables de color

const Container = styled.div`
  padding: 2rem;
  background-color: ${colors.background};
  color: ${colors.text};
  height: 100%;
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: ${colors.primary};
`;

const Input = styled.input`
  background-color: ${colors.inputBackground};
  color: ${colors.text};
  border: 1px solid ${colors.border};
  border-radius: 5px;
  padding: 0.5rem;
  margin-right: 0.5rem;
  width: calc(50% - 1rem);
  
  &::placeholder {
    color: ${colors.placeholder};
  }
`;

const Button = styled.button`
  background-color: ${colors.primary};
  color: ${colors.text};
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 1rem;

  &:hover {
    background-color: ${colors.secondary};
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
