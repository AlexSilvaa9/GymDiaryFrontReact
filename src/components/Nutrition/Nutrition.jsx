import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Loading from '../Loading'; // Importa el componente Loading

// Styled Components
const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

const Container = styled.div`
  flex: 1;
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

const StatsSection = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 2rem;
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: ${({ theme }) => theme.text};
`;

const API_URL = process.env.REACT_APP_SERVER_NAME;

const Nutrition = () => {
  const [meals, setMeals] = useState([]);
  const [mealName, setMealName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fats, setFats] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState('viewMeals');
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(false); // Estado de carga

  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true); // Mostrar el loading al iniciar la carga
      try {
        const adjustedDate = new Date(selectedDate);
        adjustedDate.setDate(adjustedDate.getDate() + 1);

        const response = await fetch(`${API_URL}/users/me/meals?date=${adjustedDate.toISOString().split('T')[0]}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setMeals(data);
        } else {
          console.error('Failed to fetch meals');
        }
      } catch (error) {
        console.error('Error fetching meals:', error);
      } finally {
        setLoading(false); // Ocultar el loading después de la carga
      }
    };

    if (token) {
      fetchMeals();
    }
  }, [selectedDate, token]);

  const handleAddMeal = async () => {
    if (mealName && calories && protein && carbs && fats) {
      const adjustedDate = new Date(selectedDate);
      adjustedDate.setDate(adjustedDate.getDate() + 1);

      const newMeal = {
        date: adjustedDate.toISOString().split('T')[0],
        name: mealName,
        calories: parseInt(calories),
        macros: {
          protein: parseInt(protein),
          carbs: parseInt(carbs),
          fats: parseInt(fats),
        },
      };

      try {
        const response = await fetch(`${API_URL}/users/me/meals`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newMeal),
        });

        if (response.ok) {
          // Reset form fields
          setMealName('');
          setCalories('');
          setProtein('');
          setCarbs('');
          setFats('');

          // Update meals list to include the newly added meal
          setMeals((prevMeals) => [...prevMeals, newMeal]);
        } else {
          console.error('Failed to add meal');
        }
      } catch (error) {
        console.error('Error adding meal:', error);
      }
    }
  };

  // Calculate statistics
  const calculateStats = () => {
    return meals.reduce(
      (acc, meal) => {
        acc.totalCalories += meal.calories;
        acc.totalProtein += meal.macros.protein;
        acc.totalCarbs += meal.macros.carbs;
        acc.totalFats += meal.macros.fats;
        return acc;
      },
      { totalCalories: 0, totalProtein: 0, totalCarbs: 0, totalFats: 0 }
    );
  };

  const stats = calculateStats();

  return (
    <AppWrapper>
      <Container>
        <Title>Meal Tracker</Title>

        <CalendarWrapper>
          <Calendar
            onChange={(date) => setSelectedDate(date)}
            value={selectedDate}
            tileClassName={({ date }) =>
              meals.some((meal) => meal.date === new Date(date.getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0])
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

        {loading ? ( // Mostrar loading mientras se cargan los datos
          <Loading />
        ) : (
          <>
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
              <>
                <StatsSection>
                  <h2>Statistics for {new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]}</h2>
                  <p>Total Calories: {stats.totalCalories} kcal</p>
                  <p>Total Protein: {stats.totalProtein} g</p>
                  <p>Total Carbs: {stats.totalCarbs} g</p>
                  <p>Total Fats: {stats.totalFats} g</p>
                </StatsSection>

                <MealsList>
                  {meals.length > 0 ? (
                    meals.map((meal, index) => (
                      <MealCard key={index}>
                        <h3>{meal.name}</h3>
                        <p>Calories: {meal.calories}</p>
                        <p>Protein: {meal.macros.protein}g</p>
                        <p>Carbs: {meal.macros.carbs}g</p>
                        <p>Fats: {meal.macros.fats}g</p>
                      </MealCard>
                    ))
                  ) : (
                    <MealCard>No meals recorded for this day.</MealCard>
                  )}
                </MealsList>
              </>
            )}
          </>
        )}
      </Container>
    </AppWrapper>
  );
};

export default Nutrition;
