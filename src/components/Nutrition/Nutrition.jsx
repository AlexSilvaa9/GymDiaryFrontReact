import React, { useState } from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

// Styled Components
const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Asegura que el contenedor ocupe toda la altura de la ventana */
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

const Container = styled.div`
  flex: 1; /* Permite que el contenedor crezca para ocupar todo el espacio disponible */
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.text};
  margin-bottom: 1.5rem;
`;

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
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  background-color: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 5px;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
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
  margin: 1rem 0;

  .react-calendar {
    border: none;
    background: transparent;
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

const MealsList = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 2rem;
`;

const MealCard = styled.div`
  background-color: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.text};
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 0.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  & > h3 {
    margin: 0;
  }

  & > p {
    margin: 0.25rem 0;
  }
`;

const Tabs = styled.div`
  display: flex;
  width: 100%;
  max-width: 600px;
  margin-bottom: 2rem;
  justify-content: space-between;
`;

const TabButton = styled.button`
  background: ${({ active, theme }) => (active ? theme.primary : 'transparent')};
  color: ${({ active, theme }) => (active ? theme.text : theme.primary)};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.text};
  }
`;

const Nutrition = () => {
  const [meals, setMeals] = useState([
    { date: '2024-01-20', name: 'Breakfast', calories: 350, macros: { protein: 20, carbs: 50, fats: 10 } },
    { date: '2024-01-20', name: 'Lunch', calories: 600, macros: { protein: 30, carbs: 80, fats: 20 } },
    { date: '2024-01-21', name: 'Dinner', calories: 500, macros: { protein: 25, carbs: 60, fats: 15 } }
  ]);
  const [mealName, setMealName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fats, setFats] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [view, setView] = useState('viewMeals');

  // Filter meals by date
  const mealsByDate = meals.reduce((acc, meal) => {
    const { date } = meal;
    if (!acc[date]) acc[date] = [];
    acc[date].push(meal);
    return acc;
  }, {});

  const handleAddMeal = () => {
    if (mealName && calories && protein && carbs && fats) {
      setMeals((prevMeals) => [
        ...prevMeals,
        { date: selectedDate, name: mealName, calories: parseInt(calories), macros: { protein: parseInt(protein), carbs: parseInt(carbs), fats: parseInt(fats) } },
      ]);
      setMealName('');
      setCalories('');
      setProtein('');
      setCarbs('');
      setFats('');
    }
  };

  return (
    <AppWrapper>
      <Container>
        <Title>Nutrition Tracker</Title>

        <CalendarWrapper>
          <Calendar
            onChange={(date) => setSelectedDate(date.toISOString().split('T')[0])}
            value={new Date(selectedDate)}
            tileClassName={({ date }) =>
              meals.some((meal) => meal.date === date.toISOString().split('T')[0])
                ? 'has-meal'
                : null
            }
          />
        </CalendarWrapper>

        <Tabs>
          <TabButton active={view === 'viewMeals'} onClick={() => setView('viewMeals')}>
            View Meals
          </TabButton>
          <TabButton active={view === 'addMeal'} onClick={() => setView('addMeal')}>
            Add Meal
          </TabButton>
        </Tabs>

        {view === 'addMeal' && (
          <Form>
            <InputGroup>
              <Input
                type="text"
                placeholder="Meal Name"
                value={mealName}
                onChange={(e) => setMealName(e.target.value)}
                required
              />
              <Input
                type="number"
                placeholder="Calories"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                required
              />
              <Input
                type="number"
                placeholder="Protein (g)"
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
                required
              />
              <Input
                type="number"
                placeholder="Carbs (g)"
                value={carbs}
                onChange={(e) => setCarbs(e.target.value)}
                required
              />
              <Input
                type="number"
                placeholder="Fats (g)"
                value={fats}
                onChange={(e) => setFats(e.target.value)}
                required
              />
            </InputGroup>
            <Button onClick={handleAddMeal}>Add Meal</Button>
          </Form>
        )}

        {view === 'viewMeals' && (
          <MealsList>
            <Title>Meals for {new Date(selectedDate).toDateString()}</Title>
            {mealsByDate[selectedDate] && mealsByDate[selectedDate].length > 0 ? (
              mealsByDate[selectedDate].map((meal, index) => (
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
        )}
      </Container>
    </AppWrapper>
  );
};

export default Nutrition;
