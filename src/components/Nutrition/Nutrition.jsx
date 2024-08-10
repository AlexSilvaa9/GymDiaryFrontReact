import React, { useState } from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Importa el CSS del calendario

const Container = styled.div`
  padding: 2rem;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.text};
  margin-bottom: 1rem;
`;

const CalendarWrapper = styled.div`
  margin: 1rem 0;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  margin-bottom: 2rem;
  background-color: ${({ theme }) => theme.inputBackground};
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
  border: 1px solid ${({ theme }) => theme.text};
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

const MealsList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
`;

const MealCard = styled.div`
  background-color: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.text};
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  & > h3 {
    margin: 0;
  }
`;

const Nutrition = () => {
  const [meals, setMeals] = useState([]);
  const [mealName, setMealName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fats, setFats] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Filtra las comidas para la fecha seleccionada
  const filteredMeals = meals.filter(meal => meal.date.toDateString() === selectedDate.toDateString());

  const handleAddMeal = () => {
    if (mealName && calories && protein && carbs && fats) {
      setMeals([...meals, {
        date: selectedDate,
        name: mealName,
        calories: parseInt(calories),
        macros: {
          protein: parseInt(protein),
          carbs: parseInt(carbs),
          fats: parseInt(fats)
        }
      }]);
      setMealName('');
      setCalories('');
      setProtein('');
      setCarbs('');
      setFats('');
    }
  };

  return (
    <Container>
      <Title>Nutrition Tracker</Title>

      <CalendarWrapper>
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
        />
      </CalendarWrapper>

      <Form>
        <InputGroup>
          <Input
            type="text"
            placeholder="Meal Name"
            value={mealName}
            onChange={(e) => setMealName(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Calories"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Protein (g)"
            value={protein}
            onChange={(e) => setProtein(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Carbs (g)"
            value={carbs}
            onChange={(e) => setCarbs(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Fats (g)"
            value={fats}
            onChange={(e) => setFats(e.target.value)}
          />
        </InputGroup>
        <Button onClick={handleAddMeal}>Add Meal</Button>
      </Form>

      <MealsList>
        <Title>Meals for {selectedDate.toDateString()}</Title>
        {filteredMeals.length > 0 ? (
          filteredMeals.map((meal, index) => (
            <MealCard key={index}>
              <h3>{meal.name}</h3>
              <p>{meal.calories} Calories</p>
              <p>Protein: {meal.macros.protein}g</p>
              <p>Carbs: {meal.macros.carbs}g</p>
              <p>Fats: {meal.macros.fats}g</p>
            </MealCard>
          ))
        ) : (
          <MealCard>No meals recorded for this day.</MealCard>
        )}
      </MealsList>
    </Container>
  );
};

export default Nutrition;
